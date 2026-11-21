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
MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-3.1-pro-preview"]   # free tier: Flash works, Pro needs billing
IDEAS = os.path.join(ROOT, "ideas.md")

def brief():
    s = open(os.path.join(ROOT, "WEEKLY_PROMPT.md"), encoding="utf-8").read()
    b = re.findall(r"```\n(.*?)```", s, re.S)[0]
    return b.replace('Samajh gaye to sirf "OK" likho.', "").strip()

def read_ideas():
    if not os.path.exists(IDEAS): return {}, []
    lines = open(IDEAS, encoding="utf-8").read().split("\n")
    out, raw = {"flat7": [], "ai": [], "comedy": [], "dil": [], "kahani": []}, []
    in_new = True
    for ln in lines:
        if ln.strip().lower().startswith("## used"): in_new = False
        m = re.match(r"\s*[-*]\s+(.*\S)", ln)
        if in_new and m:
            t = m.group(1); k = "comedy"
            mm = re.match(r"(flat7|ai|comedy|dil|emotional|sad|kahani|story|trend)\s*:\s*(.*)", t, re.I)
            if mm:
                k, t = mm.group(1).lower(), mm.group(2)
                if k in ("emotional", "sad"): k = "dil"
                if k in ("story", "trend"): k = "kahani"
            out[k].append(t); raw.append(ln)
    return out, raw

def mark_used(raw):
    if not raw or not os.path.exists(IDEAS): return
    s = open(IDEAS, encoding="utf-8").read()
    for ln in raw: s = s.replace(ln + "\n", "", 1)
    if "## Used" not in s: s = s.rstrip() + "\n\n## Used\n"
    s = s.rstrip() + "\n" + "\n".join(raw) + "\n"
    open(IDEAS, "w", encoding="utf-8").write(s)

def gemini(prompt, key, search=False, raw_text=False, models=None):
    body = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.9}}
    if search: body["tools"] = [{"google_search": {}}]
    else: body["generationConfig"]["responseMimeType"] = "application/json"
    errs = []
    for rnd in range(1 if search else 3):      # rounds over all models; busy models (503) often free up
        for m in (models or MODELS):
            try:
                req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s" % (m, key),
                                             data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST")
                r = json.load(urllib.request.urlopen(req, timeout=300))
                txt = "".join(p.get("text", "") for p in r["candidates"][0]["content"]["parts"])
                if raw_text:
                    print("   answered by", m); return txt
                a, b = txt.find("["), txt.find("{")
                if b != -1 and (a == -1 or b < a): data = json.loads(txt[b: txt.rfind("}") + 1])
                else: data = json.loads(txt[a: txt.rfind("]") + 1])
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
        slug = re.sub(r"^(flat7|ai|comedy|dil|kahani)-\d+-?", "", slug) or "reel"
        s["id"] = "%s-%d-%s" % (series, num, slug[:40])
        if series != "kahani":
            s["ep"] = ("Part %d" % num) if series == "flat7" else (("EP %d" % num) if series == "ai" else "")
        try:
            build_reel.validate(s)
            if 7 <= len(s["lines"]) <= 16: good.append(s)
        except AssertionError as e:
            print("   dropped", s.get("id"), e)
    return good

def history():
    by = {"flat7": [], "ai": [], "comedy": [], "dil": [], "kahani": []}
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


KAHANI_PARTS = 5
KAHANI_LOW = 5          # write a new multi-part story when fewer than this many story parts are waiting

def trends(key):
    """Ask Gemini (with Google Search) what Indian audiences are talking about right now."""
    today = datetime.datetime.now(run_next.IST).strftime("%d %B %Y")
    q = ("Aaj %s hai. Google Search se dekho ki India me IS HAFTE social media (Instagram Reels, YouTube Shorts, X) par "
         "aam log kin cheezon ki sabse zyada baat kar rahe hain. 10 topics do: games (jaise GTA 6), cricket/IPL, nayi movies/web series, "
         "naye phone/tech/AI, festivals/shaadi season, viral memes/trends, sarkari naye rules jo aam aadmi ko lagte hain. "
         "Har topic ek line: topic — kyon trending hai (1 chhota reason). Politics, dharm, kisi asli insaan par aarop, dukhad haadse NAHI.") % today
    try:
        return gemini(q, key, search=True, raw_text=True, models=["gemini-flash-latest", "gemini-flash-lite-latest"])
    except Exception as e:
        print("   trends failed:", e); return ""

def kahani_prompt(start, by, ideas, trend_text):
    prev = by.get("kahani", [])
    done = sorted({s.get("sname", "") for s in prev if s.get("sname")})
    topic = ("Owner ka idea (isi par kahani banao): " + ideas[0]) if ideas else \
            ("Ye abhi ke trending topics hain:\n%s\nInme se jo sabse mazedaar, relatable kahani ban sake wo ek topic chuno." % trend_text if trend_text
             else "Abhi India me jo trending hai (game launch, cricket, nayi movie, naya phone, shaadi season, viral trend) us par kahani banao.")
    return ("""Tum "Ramesh Ki Kahaniya" ke head writer ho — Hindi cartoon channel. Ab ek NAYI MULTI-PART KAHANI likhni hai: %d parts, har part ek alag reel (45-55 sec).
%s
Pehle ho chuki kahaniyan (repeat mat karna): %s

SABSE ZAROORI — kahani ZINDA lage, robot jaisi nahi:
- Aise likho jaise koi mazedaar dost chai pe kahani suna raha ho. Bolchaal ki Hindi, beech me natural English words (game, phone, boss, office, update). Kitaabi Hindi aur "tabhi... tabhi..." wali mechanical lines bilkul nahi.
- Ramesh = aam middle-class banda: thoda lalchi, thoda darpok, dil ka achha, har baar jugaad lagata hai aur phas jaata hai. Har character ki apni aawaz: Wife (W) taunt maarti hai par pyaar karti hai, Dost (F) bura idea deta hai, Boss/Manager (M) khadoos, Padosan Aunty (A) gossip, Dadi (D) seedhi baat, Bachcha (C) masoom par chalaak.
- Har line pichhli line ka JAWAB ya NATEEJA ho — log ek doosre se baat karein, react karein. Dialogue zyada, narrator kam (narrator sirf scene jodne ke liye, max 4 lines per part).
- Chhoti asli details daalo (EMI, 5%% battery, mummy ka call, office ka group chat, pre-order, traffic) — isi se kahani sachchi lagti hai.
- Comedy + thoda emotion: har part me kam se kam 2 hasaane wale moments; kahani ke end me ek dil chhoo lene wala ya zabardast twist.
- Poori kahani pehle socho: Part 1 = mazedaar setup + bada problem; beech ke parts = problem badhta jaye, naye mod; Part %d = climax + twist + achha ending.
- Har part ki pehli line = hook (pichhle part ki yaad ya naya jhatka) taaki naya viewer bhi samajh jaye.
- Har part 11-13 lines, har line 6-16 words.
- Har part me bolne wale sirf Narrator + 2 characters (baaki log scene me dikh sakte hain par bolein nahi) — voice limit ke liye zaroori. Alag part me alag 2 characters chal sakte hain.
- Part 1 se Part %d tak: aakhri se pehle line = cliffhanger; aakhri line exactly: "आगे क्या हुआ? जानने के लिए फॉलो करो — Part <agla number> जल्दी आ रहा है!"
- Part %d (last): aakhri se pehle line = twist/payoff; aakhri line = comment-sawaal + "ऐसी और कहानियों के लिए फॉलो करो!"
- Asli game/movie/phone ka naam le sakte ho (jaise GTA 6), par kisi asli insaan ka mazaak ya aarop nahi. Politics/dharm nahi.

SCREEN: jis line me koi cheez/ghatna ho uske liye "show" {"icon":"<1 emoji>","text":"<max 5 words>"} (har part me 5-6), aur "fx", "pose", "ex", "set", "cast" upar ke CODES ke hisaab se.

JSON (sirf ye object, aur kuch nahi):
{"story":"<kahani ka Hindi naam, max 30 chars>",
 "badge":"<kahani ka chhota naam ENGLISH CAPITAL letters me, max 16 chars, jaise GTA 6 KA CHAKKAR>",
 "outline":["Part 1 me kya hota hai (1 line)", "..."],
 "parts":[{"id":"kahani-<n>-<english-slug>","ep":"Part 1","title":"<kahani naam> | Part 1 | <hook> + 1 emoji, max 90 chars, end #Shorts",
   "description":"2 lines Hindi + 4-5 hashtags","caption":"hook + comment sawaal + follow line + hashtags",
   "lines":[{"who":"N","text":"...","set":"home","cast":["R","W"],"pose":{"R":"shock"},"ex":{"R":"shock"},"show":{"icon":"🎮","text":"..."},"fx":["flash"]}]}]}
""" % (KAHANI_PARTS, topic, "; ".join(done) or "koi nahi", KAHANI_PARTS, KAHANI_PARTS - 1, KAHANI_PARTS))

def write_kahani(key, by, ideas, start, folder):
    tt = "" if ideas else trends(key)
    if tt: print("   trending now:\n" + "\n".join("     " + l for l in tt.strip().split("\n")[:12]))
    data = gemini(brief() + "\n\n" + kahani_prompt(start, by, ideas, tt), key,
                  models=["gemini-flash-latest", "gemini-3.1-pro-preview", "gemini-flash-lite-latest"])
    parts = data.get("parts", []) if isinstance(data, dict) else data
    sname = (data.get("story") if isinstance(data, dict) else "") or "नई कहानी"
    badge = (data.get("badge") if isinstance(data, dict) else "") or "RAMESH KI KAHANI"
    for k, p in enumerate(parts):
        p["ep"] = "Part %d" % (k + 1); p["sname"] = sname; p["badge"] = badge[:18].upper()
    items = clean(parts, "kahani", start)
    if len(items) != len(parts):
        print("   story incomplete (%d/%d parts valid) - not saved" % (len(items), len(parts))); return 0
    json.dump(items, open(os.path.join(folder, "kahani.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("   STORY:", sname, "|", badge, "|", len(items), "parts")
    if isinstance(data, dict):
        for o in data.get("outline", []): print("     -", o)
    return len(items)

def main():
    st = run_next.load_state()
    waiting = [s for s in run_next.queue() if s["id"] not in st["posted"]]
    force = "--force" in sys.argv
    k_wait = [s for s in waiting if s.get("series") == "kahani"]
    print("Reels waiting:", len(waiting), "| story parts waiting:", len(k_wait))
    need_main = len(waiting) - len(k_wait) < LOW_WATER
    need_kahani = force or len(k_wait) < KAHANI_LOW
    if not need_main and not need_kahani:
        print("Enough reels queued, nothing to write."); return
    key = os.environ.get("GEMINI_KEY", "").strip()
    if not key: raise SystemExit("GEMINI_KEY not set")
    by = history(); ideas, raw = read_ideas()
    folder = os.path.join(ROOT, "weeks", "auto-" + datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d-%H%M"))
    os.makedirs(folder, exist_ok=True)
    wrote = 0
    for series in (("flat7", "ai", "comedy") if need_main else ()):
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
    if need_kahani:
        prev = by.get("kahani", [])
        nums = [int(m.group(1)) for s in prev for m in [re.match(r"kahani-(\d+)", s["id"])] if m]
        print("Writing a new multi-part story from part no.", (max(nums) + 1) if nums else 1)
        try:
            wrote += write_kahani(key, by, ideas.get("kahani", [])[:1], (max(nums) + 1) if nums else 1, folder)
        except Exception as e:
            print("   story failed:", e)
    used = [ln for ln in raw if any(i in ln for k in ideas for i in (ideas[k][:1] if k == "kahani" else ideas[k][:PER_SERIES]))
            and (need_main or "kahani" in ln or "story" in ln or "trend" in ln)]
    mark_used(used)
    if not wrote:
        os.rmdir(folder); print("Nothing written.")
    else:
        print("NEW SCRIPTS:", wrote, "->", folder)

if __name__ == "__main__":
    main()
