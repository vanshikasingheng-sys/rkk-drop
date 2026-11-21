#!/usr/bin/env python3
"""Write status.json after every run (read by the weekly report): queue size + last runs and their result.
Usage: status.py <job-status> [kind]"""
import json, os, sys, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_reel, run_next

ROOT = build_reel.ROOT
P = os.path.join(ROOT, "status.json")
s = json.load(open(P)) if os.path.exists(P) else {"runs": []}
st = run_next.load_state()
q = run_next.queue()
waiting = [x["id"] for x in q if x["id"] not in st["posted"]]
ready = os.path.join(ROOT, "work", "ready.json")
reel = json.load(open(ready))["id"] if os.path.exists(ready) else ""
s["updated"] = datetime.datetime.now(run_next.IST).isoformat(timespec="minutes")
s["waiting"] = len(waiting)
s["next"] = waiting[:3]
s["runs"] = (s.get("runs", []) + [{"at": s["updated"], "kind": sys.argv[2] if len(sys.argv) > 2 else "reel",
                                     "result": sys.argv[1] if len(sys.argv) > 1 else "?", "reel": reel,
                                     "run": os.environ.get("GITHUB_RUN_ID", "")}])[-40:]
json.dump(s, open(P, "w"), ensure_ascii=False, indent=1)
print("status:", s["waiting"], "waiting")
