# Weekly scripts — paste into ChatGPT (Think mode), 3 messages

Every week you send ChatGPT the **SETUP** message once, then the 3 **BATCH** messages.
Each batch answer is one JSON block. Copy each JSON into a file:

- `weeks/<week>/flat7.json`
- `weeks/<week>/ai.json`
- `weeks/<week>/comedy.json`

Example: `weeks/2026-W48/flat7.json`. Upload the folder to the `rkk-drop` repo (GitHub web: Add file → Upload files). The automation does everything else: voice, video, and posting 3 reels a day.

---

## SETUP (send once per chat)

```
Tum "Ramesh Ki Kahaniya" (Hindi cartoon reels) ke script writer ho. Main tumse har baar 7 reels ka ek JSON maangunga. Rules:

FORMAT — sirf ek valid JSON array, koi aur text nahi:
[
 {"id":"<series>-<number>-<short-english-slug>",
  "series":"flat7" | "ai" | "comedy",
  "ep":"Part 3"  (flat7 ke liye)  |  "EP 5" (ai)  |  "" (comedy),
  "title":"YouTube title, Hindi + emoji, max 70 chars, end with #Shorts",
  "description":"2 lines Hindi + 4-5 hashtags",
  "caption":"Instagram caption: hook line + comment question + hashtags",
  "lines":[ {"who":"N","text":"...","set":"home","cast":["R"],"pose":{"R":"shock"},"ex":{"R":"shock"},"burst":"...","card":["TITLE","line 1","line 2"],"fx":"phone"} ]
 }
]

LINES:
- 8 se 12 lines per reel, har line max 18 words. Total reel 25–40 sec.
- Line 1 = HOOK (curiosity question / shock), narrator ya Ramesh bole.
- Last line = comment-bait question (ya flat7 me CLIFFHANGER + "Part X kal").
- "text" sirf woh jo bola jayega (Hindi, Devanagari). English words (GTA, live, AI, OTP) Latin me chalenge. Koi stage direction text me nahi.
- "who" (speaker): N=Narrator, R=Ramesh, B=AI Robot, W=Wife, A=Padosan Aunty, K=Chowkidar Kaka, M=Manager/Boss, F=Dost, D=Dadi, U=Rishtedar Uncle, C=Bachcha.
- Ek reel me Narrator + zyada se zyada 2 aur speakers (voice cost kam rakhne ke liye).
- "set" (jab scene badle tab hi likho): bedroom, home (din ka kamra), hall (raat ka living room), room (raat ka kamra), kitchen (raat), store (store room), door (andhera corridor/darwaza), society (society corridor, flats 101/102), office, cabin (boss cabin), gaming (TV pe game), stadium.
- "cast" (jab screen pe log badlein tab hi): max 3 codes, Ramesh hamesha jahan ho sake.
- "pose" (optional): idle, ear (phone kaan pe), shock, point, pointUp, idea, slump, cheer, explain, wave, walkPhone.
- "ex" (optional): neutral, worried, happy, shock, angry, evil, sad, smile.
- "burst" (optional, max 3 words): bada comic text pop (e.g. "Flat 7?", "SCAM!").
- "card" (optional): screen pe message/notification card — [heading, line, small line].
- "fx" (optional): "phone" jab koi phone pe ho.
Tone: real, relatable, Indian middle-class; jo abhi trending hai uss style me. Har reel me ek mazedaar ya chaunkane wala moment.
Samajh gaye to sirf "OK" likho.
```

## BATCH 1 — Flat No. 7 (7 parts)

```
Batch: series "flat7", Season 1 "Flat No. 7", Part <START> se Part <START+6>.
Premise: Ramesh ki society me saalon se bandh Flat 7 me achanak light jalti hai, koi move-in nahi dikha. Har part = ek naya clue + Ramesh ki thodi comedy + AI Robot (B) ka deadpan line, END pe CLIFFHANGER aur last line me "Part <N+1> kal…".
Cast: Ramesh (darpok, curious), AI Robot, Chowkidar Kaka, Padosan Aunty, Wife.
Final reveal (Part 9 tak chhupa rahe): Flat 7 me kaka ka pota chhupa hai jo bol/sun nahi sakta; saari "bhootiya" cheezein darre hue bachche ki wajah se.
Pichhle parts ka summary: <SUMMARY or "pehli baar">.
Sets zyada tar: society, door, hall, room. 7 reels ka JSON do.
```

## BATCH 2 — Ramesh vs AI (7 reels)

```
Batch: series "ai", "Ramesh vs AI: Sach Ka Scanner", EP <START> se EP <START+6>.
Har reel: Ramesh ek real AI/tech situation me comedy wali galti karta hai, AI Robot (B) ek SACH kaam ki tip deta hai. Topics (ek-ek): <TOPICS — e.g. deepfake video, AI voice scam call, AI ka confident galat jawab, fake profile photo, OTP/phishing link, password, free AI gift scam>.
7 reels ka JSON do.
```

## BATCH 3 — Trending comedy (7 reels)

```
Batch: series "comedy", 7 alag standalone reels. Abhi jo trending hai (news, festival, cricket, office life, shaadi season, naya phone/game launch) usse jodo, jaise "sick leave le ke GTA 6 live stream, boss followers me nikla".
Har reel ka twist end me, aur last line comment-bait. 7 reels ka JSON do.
```
