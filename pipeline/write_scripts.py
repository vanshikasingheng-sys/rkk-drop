#!/usr/bin/env python3
"""Auto-writer: when the queue is running low, write the next batch of reel scripts with Gemini.
- Uses the brief in WEEKLY_PROMPT.md (same rules ChatGPT got).
- Uses ideas from ideas.md first (lines like "- comedy: ...", "- ai: ...", "- flat7: ..."), then marks them used.
- Without ideas it picks fresh topics itself; Flat No. 7 continues part by part.
Env: GEMINI_KEY.  Writes weeks/auto-<date>/{flat7,ai,comedy}.json
"""
import json, os, re, sys, glob, time, datetime, urllib.request, urllib.error
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_reel, run_next

ROOT = build_reel.ROOT
sys.stdout.reconfigure(line_buffering=True)
LOW_WATER = 9          # write a new batch when fewer than this many reels are waiting
PER_SERIES = 7
MODELS = ["gemini-3.1-pro-preview", "gemini-3.1-pro", "gemini-pro-latest", "gemini-flash-latest", "gemini-flash-lite-latest"]
IDEAS = os.path.join(ROOT, "ideas.md")

def brief():
    s = open(os.path.join(ROOT, "WEEKLY_PROMPT.md"), encoding="utf-8").read()
    b = re.findall(r"```\n(.*?)```", s, re.S)[0]
    return b.replace('Samajh gaye to sirf "OK" likho.', "").strip()

def read_ideas():
    if not os.path.exists(IDEAS): return {}, []
    lines = open(IDEAS, encoding="utf-8").read().split("\n")
    out, raw = {"flat7": [], "ai": [], "comedy": [], "dil": []}, []
    in_new = True
    for ln in lines:
        if ln.strip().lower().startswith("## used"): in_new = False
        m = re.match(r"\s*[-*]\s+(.*\S)", ln)
        if in_new and m:
            t = m.group(1); k = "comedy"
            mm = re.match(r"(flat7|ai|comedy|dil|emotional|sad)\s*:\s*(.*)", t, re.I)
            if mm:
                k, t = mm.group(1).lower(), mm.group(2)
                if k in ("emotional", "sad"): k = "dil"
            out[k].append(t); raw.append(ln)
    return out, raw

def mark_used(raw):
    if not raw or not os.path.exists(IDEAS): return
    s = open(IDEAS, encoding="utf-8").read()
    for ln in raw: s = s.replace(ln + "\n", "", 1)
    if "## Used" not in s: s = s.rstrip() + "\n\n## Used\n"
    s = s.rstrip() + "\n" + "\n".join(raw) + "\n"
    open(IDEAS, "w", encoding="utf-8").write(s)

def gemini(prompt, key):
    body = {"contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 0.9}}
    errs = []
    for rnd in range(3):                       # 3 rounds over all models; busy models (503) often free up
        for m in MODELS:
            try:
                req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s" % (m, key),
                                             data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST")
                r = json.load(urllib.request.urlopen(req, timeout=300))
                txt = "".join(p.get("text", "") for p in r["candidates"][0]["content"]["parts"])
                data = json.loads(txt[txt.find("["): txt.rfind("]") + 1])
                print("   written by", m); return data
            except urllib.error.HTTPError as e:
                msg = e.read().decode("utf-8", "ignore")
                msg = re.sub(r"key=[\w-]+", "key=***", msg)
                errs.append("%s HTTP %s %s" % (m, e.code, re.sub(r"\s+", " ", msg)[:160]))
                print("   ", errs[-1])
                if e.code in (429, 500, 503, 504): time.sleep(20)
            except Exception as e:
                errs.append("%s %s" % (m, str(e)[:120])); print("   ", errs[-1]); time.sleep(5)
        time.sleep(60)
    raise RuntimeError("Gemini failed: " + " | ".join(errs[-3:]))

def clean(items, series, start):
    good = []
    for n, s in enumerate(items):
        s["series"] = series
        num = start + n
        slug = re.sub(r"[^a-z0-9]+", "-", str(s.get("id", "")).lower()).strip("-")
        slug = re.sub(r"^(flat7|ai|comedy|dil)-\d+-?", "", slug) or "reel"
        s["id"] = "%s-%d-%s" % (series, num, slug[:40])
        s["ep"] = ("Part %d" % num) if series == "flat7" else (("EP %d" % num) if series == "ai" else "")
        try:
            build_reel.validate(s)
            if 7 <= len(s["lines"]) <= 16: good.append(s)
        except AssertionError as e:
            print("   dropped", s.get("id"), e)
    return good

def history():
    by = {"flat7": [], "ai": [], "comedy": [], "dil": []}
    for s in run_next.queue(): by.setdefault(s.get("series", "comedy"), []).append(s)
    return by

def task_text(series, n, start, by, ideas):
    prev = by.get(series, [])
    used_titles = "; ".join(s.get("title", "")[:60] for s in prev[-20:])
    if series == "flat7":
        recap = "\n".join("%s: %s ... %s" % (s.get("ep"), s.get("title", ""), (s["lines"][-2]["text"] if len(s["lines"]) > 1 else ""))
                          for s in prev[-4:])
        extra = ("Ideas from the owner: " + " | ".join(ideas)) if ideas else ""
        return ("ABHI YE BATCH DO (sirf JSON array): series \"flat7\" — suspense series \"Flat No. 7\", Part %d se Part %d. "
                "Kahani pichhle part ke cliffhanger se seedha aage badhe, har part me naya clue + Ramesh ki comedy + AI Robot ka deadpan line + cliffhanger. "
                "Pichhle parts:\n%s\n%s") % (start, start + n - 1, recap, extra)
    if series == "ai":
        topics = ("Topics (owner ke ideas, pehle ye): " + " | ".join(ideas)) if ideas else \
                 "Topics khud chuno: real, abhi ke AI/online-safety/tech situations jo aam Indian log face karte hain."
        return ("ABHI YE BATCH DO (sirf JSON array): series \"ai\" — \"Ramesh vs AI: Sach Ka Scanner\", EP %d se EP %d. "
                "Har reel ek alag mazedaar kahani: Ramesh ek real AI/tech situation me phasta hai, AI Robot (B) ek SACH, kaam ki tip deta hai, end me twist. "
                "%s Pehle ho chuke (repeat mat karna): %s") % (start, start + n - 1, topics, used_titles)
    if series == "dil":
        topics = ("Topics (owner ke ideas, pehle ye): " + " | ".join(ideas)) if ideas else \
                 ("Topics khud chuno — jo emotional reels sabse zyada dekhi/share hoti hain: naukri jaana, maa-papa ki qurbani, "
                  "middle-class sangharsh, dosti, budhe maa-baap, bachchon ki masoomiyat, struggle se success, ajnabi ki madad ka phal, tyohaar par akelapan.")
        return ("ABHI YE BATCH DO (sirf JSON array): series \"dil\" — \"Dil Se\" emotional kahaniyan, %d alag standalone reels (number %d se %d). "
                "Har kahani: line 1 me dard bhara hook -> Ramesh ki mushkil/dukh dheere dheere badhe -> aakhri se pehle line me dil chhoo lene wala twist "
                "(umeed, pyaar ya kisi ki qurbani ka sach). Rona-dhona nahi, sachchi aur relatable feel. Maut, khoon, hinsa ya aatmahatya bilkul nahi. "
                "Characters: Maa ke liye D, Papa ke liye U ya K, beti/beta C, patni W. "
                "Aakhri line = ek comment-sawaal + \"अगर कहानी दिल को छू गई, तो ऐसी और कहानियों के लिए फॉलो करो!\" "
                "%s Pehle ho chuke (repeat mat karna): %s") % (n, start, start + n - 1, topics, used_titles)
    topics = ("Topics (owner ke ideas, pehle ye): " + " | ".join(ideas)) if ideas else \
             "Topics khud chuno: abhi jo trending/relatable hai (festival, cricket, office, shaadi, family, society, naya phone/game, mausam)."
    return ("ABHI YE BATCH DO (sirf JSON array): series \"comedy\", %d alag standalone comedy kahaniyan (number %d se %d). "
            "Har kahani: clear setup -> badhta mazaak -> unexpected twist, alag characters/jagah. %s Pehle ho chuke (repeat mat karna): %s") % (
        n, start, start + n - 1, topics, used_titles)

def main():
    st = run_next.load_state()
    waiting = [s for s in run_next.queue() if s["id"] not in st["posted"]]
    force = "--force" in sys.argv
    print("Reels waiting:", len(waiting))
    if len(waiting) >= LOW_WATER and not force:
        print("Enough reels queued, nothing to write."); return
    key = os.environ.get("GEMINI_KEY", "").strip()
    if not key: raise SystemExit("GEMINI_KEY not set")
    by = history(); ideas, raw = read_ideas()
    folder = os.path.join(ROOT, "weeks", "auto-" + datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d-%H%M"))
    os.makedirs(folder, exist_ok=True)
    wrote = 0
    for series in ("flat7", "ai", "comedy", "dil"):
        prev = by.get(series, [])
        nums = [int(m.group(1)) for s in prev for m in [re.match(r"%s-(\d+)" % series, s["id"])] if m]
        start = (max(nums) + 1) if nums else 1
        my_ideas = ideas.get(series, [])[:PER_SERIES]
        print("Writing", series, "from", start, "| ideas:", len(my_ideas))
        try:
            items = clean(gemini(brief() + "\n\n" + task_text(series, PER_SERIES, start, by, my_ideas), key), series, start)
        except Exception as e:
            print("  ", series, "failed:", e); continue
        if items:
            json.dump(items, open(os.path.join(folder, series + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            wrote += len(items); print("   saved", len(items))
    used = [ln for ln in raw if any(i in ln for k in ideas for i in ideas[k][:PER_SERIES])]
    mark_used(used)
    if not wrote:
        os.rmdir(folder); print("Nothing written.")
    else:
        print("NEW SCRIPTS:", wrote, "->", folder)

if __name__ == "__main__":
    main()
