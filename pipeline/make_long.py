#!/usr/bin/env python3
"""Weekly long video: stitch the Flat No. 7 parts posted since the last long video into one 16:9 YouTube episode.
Parts come from the "flat7-parts" GitHub release (saved by the daily workflow) or the restored work/ cache.
build -> work/long_ready.json ; post -> Make webhook (YouTube only: Make skips FB/IG when the file name starts with long_).
Env: GH_TOKEN (gh CLI), MAKE_WEBHOOK, GITHUB_REPOSITORY.
"""
import json, os, sys, subprocess, datetime, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_reel, run_next

ROOT = build_reel.ROOT
WORK = os.path.join(ROOT, "work", "long")
READY = os.path.join(ROOT, "work", "long_ready.json")
OUTRO = os.path.join(ROOT, "outro", "rkk_outro.mp4")
MIN_PARTS = 3
RELEASE = "flat7-parts"

def sh(*a, **k): return subprocess.run(list(a), check=True, **k)

def dur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True, check=True).stdout.strip())

def part_num(i):
    m = re.match(r"flat7-(\d+)", i); return int(m.group(1)) if m else 0

def todo(st):
    done = set(st.get("long_done", []))
    ids = [x for x in st["posted"] if x.startswith("flat7-") and x not in done]
    return sorted(ids, key=part_num)

def fetch(pid):
    """Get the posted mp4 of a part: release asset first, then the cached work dir."""
    os.makedirs(WORK, exist_ok=True)
    out = os.path.join(WORK, "rkk_%s.mp4" % pid)
    if os.path.exists(out): return out
    try:
        sh("gh", "release", "download", RELEASE, "-p", "rkk_%s.mp4" % pid, "-D", WORK, "--clobber",
           capture_output=True)
        if os.path.exists(out): return out
    except Exception: pass
    cached = os.path.join(ROOT, "work", pid, "final.mp4")
    if os.path.exists(cached): return cached
    return None

def to_wide(src, dst, cut_outro=True):
    """1080x1920 reel -> 1280x720 with blurred background, outro trimmed."""
    d = dur(src) - (dur(OUTRO) if cut_outro else 0)
    vf = ("[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,boxblur=20:5,eq=brightness=-0.18[bg];"
          "[0:v]scale=-2:720[fg];[bg][fg]overlay=(W-w)/2:0,fps=30,format=yuv420p[v]")
    sh("ffmpeg", "-y", "-loglevel", "error", "-i", src, "-t", "%.3f" % d, "-filter_complex", vf, "-map", "[v]", "-map", "0:a",
       "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-ac", "2", dst)

def build():
    st = run_next.load_state()
    ids = todo(st)
    print("Flat No. 7 parts waiting for a long video:", ids)
    have = [(i, fetch(i)) for i in ids]
    have = [(i, f) for i, f in have if f]
    missing = [i for i in ids if i not in dict(have)]
    if missing: print("No file for:", missing, "(skipped)")
    if len(have) < MIN_PARTS:
        print("Need at least %d parts, have %d - next week." % (MIN_PARTS, len(have))); return
    wides = []
    for n, (i, f) in enumerate(have):
        w = os.path.join(WORK, "w%02d.mp4" % n); to_wide(f, w); wides.append(w)
    wo = os.path.join(WORK, "w_outro.mp4"); to_wide(OUTRO, wo, cut_outro=False); wides.append(wo)
    lst = os.path.join(WORK, "list.txt")
    open(lst, "w").write("".join("file '%s'\n" % w for w in wides))
    a, b = part_num(have[0][0]), part_num(have[-1][0])
    name = "long_flat7-%d-%d.mp4" % (a, b)
    final = os.path.join(WORK, name)
    # re-encode at a modest bitrate so the file stays small for Make's download step
    sh("ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c:v", "libx264", "-preset", "slow",
       "-crf", "30", "-maxrate", "700k", "-bufsize", "1400k", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", final)
    specs = {s["id"]: s for s in run_next.queue()}
    chapters, t = [], 0.0
    for (i, f), w in zip(have, wides):
        title = re.sub(r"\s*#\w+", "", specs.get(i, {}).get("title", i)).strip()
        chapters.append("%d:%02d Part %d - %s" % (int(t // 60), int(t % 60), part_num(i), title)); t += dur(w)
    title = "Flat No. 7 | Part %d-%d | पूरी कहानी एक साथ 😱 | Ramesh Ki Kahaniya" % (a, b)
    desc = ("Flat No. 7 की रहस्यमयी कहानी - Part %d से %d तक एक ही वीडियो में!\n\n%s\n\n"
            "आगे क्या होगा? रोज़ नए पार्ट के लिए Subscribe करो! 🔔\n#RameshKiKahaniya #Flat7 #HindiCartoon #HindiStory") % (
        a, b, "\n".join(chapters))
    json.dump({"ids": [i for i, _ in have], "final": final, "name": name, "title": title[:100], "description": desc},
              open(READY, "w"), ensure_ascii=False)
    print("LONG READY", name, "%.1f MB" % (os.path.getsize(final) / 1e6), "%.0fs" % dur(final))

def post():
    r = json.load(open(READY))
    url = "https://raw.githubusercontent.com/%s/media/%s" % (os.environ.get("GITHUB_REPOSITORY", "vanshikasingheng-sys/rkk-drop"), r["name"])
    run_next.post({"title": r["title"], "description": r["description"], "caption": r["description"]}, url, os.environ["MAKE_WEBHOOK"])
    st = run_next.load_state()
    st.setdefault("long_done", []).extend(r["ids"])
    st["log"].append({"id": r["name"], "at": datetime.datetime.now(run_next.IST).isoformat(timespec="minutes"), "url": url})
    run_next.save_state(st); print("POSTED LONG", r["name"])

if __name__ == "__main__":
    {"build": build, "post": post}[sys.argv[1] if len(sys.argv) > 1 else "build"]()
