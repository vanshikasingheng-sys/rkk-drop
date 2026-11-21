#!/usr/bin/env python3
"""Build one RKK reel from a spec: voice (Gemini TTS) -> captions timeline -> render -> music/SFX -> outro.
Usage: python3 pipeline/build_reel.py <spec.json> [--skip-tts]
Spec: {"id","series":"flat7|ai|comedy|dil|kahani","ep","title","description","caption",
       "lines":[{"who","text","set","cast","pose","ex","burst","card","fx"}]}
Env: GEMINI_KEY (never printed).  Output: work/<id>/final.mp4
"""
import json, os, re, sys, time, wave, base64, shutil, subprocess, urllib.request, urllib.error
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PIPE = os.path.join(ROOT, 'pipeline')
CAST = json.load(open(os.path.join(PIPE, 'voices.json')))
RATE = 24000
TTS_MODELS = ["gemini-2.5-flash-preview-tts", "gemini-3.1-flash-tts-preview", "gemini-2.5-pro-preview-tts"]

class DailyLimit(Exception): pass

# ---------------------------------------------------------------- TTS
def _tts_request(body, key, mi):
    for attempt in range(8):
        url = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s" % (TTS_MODELS[mi[0]], key)
        try:
            req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST")
            c = json.load(urllib.request.urlopen(req, timeout=240)).get("candidates", [{}])[0]
            if "content" not in c:
                time.sleep(4); continue
            return base64.b64decode(c["content"]["parts"][0]["inlineData"]["data"])
        except urllib.error.HTTPError as e:
            msg = e.read()[:3000].decode("utf-8", "ignore")
            daily = "PerDay" in msg or "per day" in msg.lower()
            if (e.code == 429 and daily) or e.code in (400, 404):
                if mi[0] < len(TTS_MODELS) - 1:
                    mi[0] += 1; print("   switching TTS model ->", TTS_MODELS[mi[0]]); continue
                if daily: raise DailyLimit("all TTS models hit their daily limit")
            if e.code == 429:
                print("   per-minute limit, waiting 40s"); time.sleep(40); continue
            raise RuntimeError("TTS HTTP %s: %s" % (e.code, msg[:200]))
    raise RuntimeError("TTS failed after retries")

def chunk_lines(lines):
    chunks, cur, spk = [], [], []
    for i, l in enumerate(lines):
        if l["who"] not in spk and len(spk) == 2:
            chunks.append(cur); cur, spk = [], []
        cur.append(i)
        if l["who"] not in spk: spk.append(l["who"])
    if cur: chunks.append(cur)
    return chunks

def make_voice(spec, wd, key):
    lines = spec["lines"]; mi = [0]; pcm = b""; meta = []; t = 0.0
    for n, idx in enumerate(chunk_lines(lines)):
        cp = os.path.join(wd, "chunk%02d.pcm" % n)
        whos = []
        for i in idx:
            if lines[i]["who"] not in whos: whos.append(lines[i]["who"])
        if not (os.path.exists(cp) and os.path.getsize(cp) > 1000):
            names = [CAST[w]["name"] for w in whos]
            direction = "Hindi cartoon comedy/suspense reel. Natural lively pacing, clear Hindi. " + " ".join(
                "%s is %s." % (CAST[w]["name"], CAST[w]["style"]) for w in whos)
            script = "\n".join("%s: %s" % (CAST[lines[i]["who"]]["name"], lines[i]["text"]) for i in idx)
            if len(whos) == 1:
                text = direction + "\nSay this as " + names[0] + ":\n" + "\n".join(lines[i]["text"] for i in idx)
                cfg = {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": CAST[whos[0]]["voice"]}}}
            else:
                text = direction + "\nTTS the following conversation between " + " and ".join(names) + ":\n" + script
                cfg = {"multiSpeakerVoiceConfig": {"speakerVoiceConfigs": [
                    {"speaker": CAST[w]["name"], "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": CAST[w]["voice"]}}} for w in whos]}}
            body = {"contents": [{"parts": [{"text": text}]}],
                    "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": cfg}}
            print("  TTS chunk %d: %s | lines %d-%d" % (n + 1, "+".join(whos), idx[0] + 1, idx[-1] + 1))
            raw = _tts_request(body, key, mi)
            open(cp, "wb").write(raw)
            time.sleep(22)  # stay under per-minute limit
        raw = open(cp, "rb").read()
        d = len(raw) / 2 / RATE
        meta.append({"lines": idx, "start": round(t, 3), "end": round(t + d, 3)})
        pcm += raw + b"\x00\x00" * int(.30 * RATE); t += d + .30
    with wave.open(os.path.join(wd, "vo_raw.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(pcm)
    json.dump(meta, open(os.path.join(wd, "chunks.json"), "w"))

# ---------------------------------------------------------------- captions timeline
def align(spec, wd):
    lines = [[{"show": w, "sp": w} for w in l["text"].split()] for l in spec["lines"]]
    CH = json.load(open(os.path.join(wd, "chunks.json")))
    w = wave.open(os.path.join(wd, "vo_raw.wav")); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768; sr = w.getframerate()
    h = int(sr * .01); n = len(x) // h; env = np.sqrt((x[:n * h].reshape(n, h) ** 2).mean(1)); sp = env > env.max() * .04
    def runs_in(a, b, merge):
        ia, ib = int(a * 100), min(n, int(b * 100)); rr = []; j = ia
        while j < ib:
            if sp[j]:
                k = j
                while k < ib and sp[k]: k += 1
                rr.append([j * .01, k * .01]); j = k
            else: j += 1
        if not rr: return [[a, b]]
        m = [rr[0]]
        for s0, s1 in rr[1:]:
            if s0 - m[-1][1] < merge: m[-1][1] = s1
            else: m.append([s0, s1])
        return m
    wt = lambda t: max(2, len(re.sub(r'[^ऀ-ॿa-zA-Z0-9]', '', t['sp'])))
    pw = lambda t: 2.5 if t['sp'][-1:] in ('.', '!', '?', '।') else 1.5 if t['sp'][-1:] in (',', ':', ';') else 0
    spans = [None] * len(lines)
    for c in CH:
        idx = c['lines']; m = runs_in(c['start'], c['end'], .06)
        gaps = [(m[i][1], m[i + 1][0]) for i in range(len(m) - 1)]
        tot = sum(b - a for a, b in m)
        def at(cv):
            for a, b in m:
                if cv <= b - a + 1e-9: return a + cv
                cv -= b - a
            return m[-1][1]
        W = [max(1, sum(wt(t) + pw(t) for t in lines[i])) for i in idx]; cum = np.cumsum([0] + W) / sum(W) * tot
        starts = [m[0][0]]
        for q in range(1, len(idx)):
            est = at(cum[q]); cand = [g for g in gaps if abs(g[1] - est) < 1.3 and g[1] > starts[-1] + .5]
            starts.append(min(cand, key=lambda g: abs(g[1] - est) - (g[1] - g[0]) * 2)[1] if cand else est)
        ends = [starts[q + 1] - .02 for q in range(len(idx) - 1)] + [m[-1][1]]
        for q, i in enumerate(idx): spans[i] = [starts[q], ends[q]]
    out = []
    for i, l in enumerate(lines):
        a, b = spans[i]; mm = runs_in(a, b + .01, .16) if b - a > .1 else [[a, b]]
        tot = sum(e - s for s, e in mm); cw = [0.]
        for t in l: cw.append(cw[-1] + wt(t) + pw(t))
        cw = np.array(cw) / max(cw[-1], 1e-6) * tot
        def at2(c):
            for s0, s1 in mm:
                if c <= s1 - s0 + 1e-9: return s0 + c
                c -= s1 - s0
            return mm[-1][1]
        for q, t in enumerate(l): t['s'] = round(at2(cw[q]), 3); t['e'] = round(at2(cw[q + 1]), 3)
        nxt = spans[i + 1][0] if i + 1 < len(spans) else b + .4
        out.append({'start': round(0 if i == 0 else a, 3), 'end': round(nxt - .05, 3), 'tokens': l})
    TL = {'lines': out, 'dur': round(n * .01 + .5, 2)}
    json.dump(TL, open(os.path.join(wd, 'timeline.json'), 'w'), ensure_ascii=False)
    open(os.path.join(wd, 'timeline.js'), 'w').write('window.TLDATA=' + json.dumps(TL, ensure_ascii=False) + ';')
    return TL

# ---------------------------------------------------------------- audio bed
MUSIC = {"flat7": [["dark", 0], ["tense", "LAST"]], "ai": [["techno", 0], ["warm", "LAST"]], "comedy": [["groove", 0], ["warm", "LAST"]],
         "dil": [["lofi", 0], ["warm", "LAST"]],
         "kahani": [["groove", 0], ["tense", "LAST"]]}
def audio(spec, wd, TL):
    LS = [l['start'] for l in TL['lines']]; last = len(LS) - 1
    mus = [[name, ("L%d" % last) if at == "LAST" else at] for name, at in MUSIC.get(spec.get("series"), MUSIC["comedy"])]
    json.dump({"music": mus}, open(os.path.join(wd, "meta.json"), "w"))
    sfx = [[0.4, "sting" if spec.get("series") == "flat7" else "whoosh", .6]]
    prev_set = None
    for i, l in enumerate(spec["lines"]):
        t = LS[i]
        if l.get("set") and l["set"] != prev_set and i: sfx.append([max(0, t - .3), "whoosh", .5])
        prev_set = l.get("set") or prev_set
        if l.get("burst"): sfx.append([t + .3, "pop", .6])
        if l.get("card"): sfx.append([t, "ping", .7])
        fx = l.get("fx") or []; fx = fx if isinstance(fx, list) else [fx]
        if "phone" in fx: sfx.append([t + .1, "ring", .5])
        if "flash" in fx: sfx.append([t, "thud", .8])
        if "shadow" in fx: sfx.append([t + .2, "heart", .7])
        if "shake" in fx: sfx.append([t, "thud", .6])
        if l.get("show"): sfx.append([t + .15, "pop2", .6])
        if (l.get("ex") or {}).get("R") == "shock": sfx.append([t, "sting", .7])
    if spec.get("series") == "flat7": sfx.append([LS[last] - .2, "heart", .8])
    json.dump(sfx, open(os.path.join(wd, "sfx.json"), "w"))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", os.path.join(wd, "vo_raw.wav"), "-b:a", "192k", os.path.join(wd, "voice.mp3")], check=True)
    subprocess.run([sys.executable, os.path.join(PIPE, "audio3.py"), wd], check=True)

# ---------------------------------------------------------------- render
def render(spec, wd, TL, fps=30):
    from playwright.sync_api import sync_playwright
    shutil.copy(os.path.join(PIPE, "template_index.html"), os.path.join(wd, "index.html"))
    open(os.path.join(wd, "spec.js"), "w").write("window.SPEC=" + json.dumps(spec, ensure_ascii=False) + ";")
    dur = TL['dur']; N = int(dur * fps); sil = os.path.join(wd, "silent.mp4")
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(fps), '-c:v', 'mjpeg', '-i', '-',
                           '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', sil], stdin=subprocess.PIPE)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--no-sandbox"]); pg = b.new_page(viewport={"width": 1080, "height": 1920})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto("file://" + os.path.join(wd, "index.html")); pg.wait_for_timeout(1200)
        pg.evaluate("async()=>{ if(window.READY) await window.READY; await document.fonts.ready; }")
        pg.evaluate("""async()=>{const fs=['800 40px "Baloo 2"','700 40px "Baloo 2"','500 40px "Baloo 2"','400 40px Bangers','400 40px Kalam','700 40px Kalam'];
          await Promise.all(fs.map(f=>document.fonts.load(f,'अआ AB'))); drawReel(0); await document.fonts.ready;}""")
        pg.wait_for_timeout(500)
        if errs: raise RuntimeError("page error: " + errs[0])
        for f in range(N):
            d = pg.evaluate("(T)=>{drawReel(T);return document.getElementById('reel').toDataURL('image/jpeg',0.9)}", f / fps)
            ff.stdin.write(base64.b64decode(d.split(',')[1]))
        b.close()
    ff.stdin.close(); ff.wait()
    outro = os.path.join(ROOT, "outro", "rkk_outro.mp4"); final = os.path.join(wd, "final.mp4")
    flt = ("[0:v]fps=30,format=yuv420p,setsar=1[v0];[1:a]aresample=44100,aformat=channel_layouts=stereo,apad,atrim=0:%s[a0];"
           "[2:v]scale=1080:1920,fps=30,format=yuv420p,setsar=1[v1];[2:a]aresample=44100,aformat=channel_layouts=stereo[a1];"
           "[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]") % dur
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", sil, "-i", os.path.join(wd, "mix.wav"), "-i", outro,
                    "-filter_complex", flt, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", final], check=True)
    return final

def validate(spec):
    assert spec.get("id") and spec.get("lines"), "spec needs id + lines"
    for i, l in enumerate(spec["lines"]):
        assert l.get("who") in CAST, "line %d: unknown speaker %r" % (i + 1, l.get("who"))
        assert l.get("text", "").strip(), "line %d: empty text" % (i + 1)

def build(spec, skip_tts=False):
    validate(spec)
    wd = os.path.join(ROOT, "work", spec["id"]); os.makedirs(wd, exist_ok=True)
    if not skip_tts:
        key = os.environ.get("GEMINI_KEY", "").strip()
        if not key: raise SystemExit("GEMINI_KEY not set")
        make_voice(spec, wd, key)
    TL = align(spec, wd)
    audio(spec, wd, TL)
    final = render(spec, wd, TL)
    print("BUILT", spec["id"], final)
    return final

if __name__ == "__main__":
    spec = json.load(open(sys.argv[1]))
    build(spec, skip_tts="--skip-tts" in sys.argv)
