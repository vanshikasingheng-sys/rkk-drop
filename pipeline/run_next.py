#!/usr/bin/env python3
"""One scheduled run: pick the next unposted reel, build it, upload to rkk-drop, post via Make, update state.json.
Modes: build [--id X]  -> work/ready.json ;  post -> Make webhook + state.json.
Env: GEMINI_KEY, MAKE_WEBHOOK. The video itself is pushed to the "media" branch by the workflow.
"""
import json, os, sys, glob, datetime, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_reel

ROOT = build_reel.ROOT
STATE = os.path.join(ROOT, "state.json")
MAX_PER_DAY = 3
IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))

def load_state():
    if os.path.exists(STATE): return json.load(open(STATE))
    return {"posted": [], "days": {}, "drop_files": [], "log": []}

def save_state(s): json.dump(s, open(STATE, "w"), ensure_ascii=False, indent=1)

def queue():
    """Reels in posting order: week folders sorted; inside a week one of each series per day (flat7, ai, comedy).
    Multi-part "kahani" stories (and "dil") are pooled from all folders and slotted in as every 4th reel."""
    order, dil = [], []
    for wk in sorted(glob.glob(os.path.join(ROOT, "weeks", "*"))):
        series = {}
        for f in sorted(glob.glob(os.path.join(wk, "*.json"))):
            data = json.load(open(f))
            for spec in (data if isinstance(data, list) else [data]):
                if spec.get("series") in ("dil", "kahani"): dil.append(spec); continue
                series.setdefault(spec.get("series", "comedy"), []).append(spec)
        keys = [k for k in ("flat7", "ai", "comedy") if k in series] + [k for k in series if k not in ("flat7", "ai", "comedy")]
        n = max(len(v) for v in series.values()) if series else 0
        for i in range(n):
            for k in keys:
                if i < len(series[k]): order.append(series[k][i])
    out = []
    for n, spec in enumerate(order):
        out.append(spec)
        if n % 3 == 2 and dil: out.append(dil.pop(0))
    return out + dil

def post(spec, url, hook):
    payload = {"video_url": url, "title": spec.get("title", "")[:100], "description": spec.get("description", ""),
               "caption": spec.get("caption", spec.get("description", ""))}
    req = urllib.request.Request(hook, data=json.dumps(payload, ensure_ascii=False).encode(), method="POST",
                                 headers={"Content-Type": "application/json"})
    r = urllib.request.urlopen(req, timeout=60).read().decode()
    if "accepted" not in r.lower(): raise RuntimeError("webhook said: " + r[:100])

def pick(st):
    today = datetime.datetime.now(IST).strftime("%Y-%m-%d")
    if st["days"].get(today, 0) >= MAX_PER_DAY:
        print("Daily cap reached (%d) for %s - nothing to do." % (MAX_PER_DAY, today)); return None
    todo = [s for s in queue() if s["id"] not in st["posted"]]
    if not todo: print("QUEUE EMPTY - add next week's scripts in weeks/."); return None
    print("Next reel:", todo[0]["id"], "|", len(todo) - 1, "more waiting"); return todo[0]

def prefetch(st, n=2):
    """Use spare free TTS quota: make the voice for the next reels now (cached in work/, reused when they are built).
    Also deletes work folders of reels that are already posted, so the cache stays small."""
    import shutil
    ready = os.path.join(ROOT, "work", "ready.json")
    keep = json.load(open(ready))["id"] if os.path.exists(ready) else None
    for d in glob.glob(os.path.join(ROOT, "work", "*")):
        b = os.path.basename(d)
        if b.startswith("flat7-") and b not in st.get("long_done", []): continue   # still needed for the weekly long video
        if os.path.isdir(d) and b in st["posted"] and b != keep: shutil.rmtree(d, ignore_errors=True)
    key = os.environ.get("GEMINI_KEY", "").strip()
    todo = [s for s in queue() if s["id"] not in st["posted"] and s["id"] != keep][:n]
    for spec in todo:
        wd = os.path.join(ROOT, "work", spec["id"]); os.makedirs(wd, exist_ok=True)
        need = len(build_reel.chunk_lines(spec["lines"]))
        have = len([f for f in glob.glob(os.path.join(wd, "chunk*.pcm")) if os.path.getsize(f) > 1000])
        if have >= need: print("voice ready:", spec["id"]); continue
        print("prefetching voice:", spec["id"], "(%d/%d parts done)" % (have, need))
        try:
            build_reel.make_voice(spec, wd, key)
        except build_reel.DailyLimit:
            print("free voice quota used up for today - stopping"); return
        except Exception as e:
            print("prefetch stopped:", str(e)[:150]); return

def main():
    """build: make the next reel -> work/ready.json   |   post: send ready reel to Make + update state"""
    mode = sys.argv[1] if len(sys.argv) > 1 else "build"
    st = load_state(); ready = os.path.join(ROOT, "work", "ready.json")
    if mode == "build":
        if os.path.exists(ready): os.remove(ready)
        force = sys.argv[sys.argv.index("--id") + 1] if "--id" in sys.argv else None
        spec = next((s for s in queue() if s["id"] == force), None) if force else pick(st)
        if not spec: return
        try:
            final = build_reel.build(spec)
        except build_reel.DailyLimit as e:
            print("TTS daily limit - will retry next run:", e); return
        json.dump({"id": spec["id"], "final": final, "name": "rkk_%s.mp4" % spec["id"]}, open(ready, "w"))
        print("READY", spec["id"])
    elif mode == "prefetch":
        prefetch(st)
    elif mode == "post":
        r = json.load(open(ready)); spec = next(s for s in queue() if s["id"] == r["id"])
        url = "https://raw.githubusercontent.com/%s/media/%s" % (os.environ.get("GITHUB_REPOSITORY", "vanshikasingheng-sys/rkk-drop"), r["name"])
        post(spec, url, os.environ["MAKE_WEBHOOK"])
        today = datetime.datetime.now(IST).strftime("%Y-%m-%d")
        st["posted"].append(spec["id"]); st["days"][today] = st["days"].get(today, 0) + 1
        st["log"].append({"id": spec["id"], "at": datetime.datetime.now(IST).isoformat(timespec="minutes"), "url": url})
        save_state(st); print("POSTED", spec["id"], "->", url)

if __name__ == "__main__":
    main()
