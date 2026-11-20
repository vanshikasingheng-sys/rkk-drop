# Weekly scripts: ChatGPT brief (Think mode, NEW chat every week)

Send the **SETUP** first, then the 3 **BATCH** messages one by one. Each answer is one JSON array.
Save them as `weeks/<YYYY-Www>/flat7.json`, `ai.json`, `comedy.json` in the rkk-drop repo.

---

## SETUP

```
Tum "Ramesh Ki Kahaniya" ke head writer ho — Hindi animated reels (30-40 sec) jo log end tak dekhein, share karein aur follow karein.

LIKHNE KA TAREEKA (sabse zaroori):
1. Pehle dimaag me poori kahani socho: shuru (hook) -> beech (ek ke baad ek badhta hua tension/mazaak) -> end (twist ya cliffhanger). Har line pichhli line se NATURALLY judi ho — jaise koi dost kahani suna raha ho. Koi line achanak kahin se nahi aani chahiye.
2. Narrator (N) kahani ko jodta hai: "Us raat...", "Tabhi...", "Agle din subah..." — scene badalne se pehle narrator batata hai kya hua.
3. Dialogue asli bolchaal wali Hindi me — chhote, punchy, character ke hisaab se. Ramesh darpok + funny, AI Robot shaant + deadpan, aunty nosy, etc. Bhaari/kitaabi Hindi nahi.
4. Har reel 10-13 lines, har line 6-16 words. Total 110-150 words.
5. Line 1 = HOOK: sabse curious sawaal ya shocking baat (pehle 3 sec me viewer ruk jaye).
6. ENDING:
   - flat7 (series): aakhri se pehle line = sabse bada cliffhanger moment. Aakhri line exactly is style me: "Aage kya hua? Jaanne ke liye abhi follow karo — Part <N+1> jaldi aa raha hai!" (Devanagari me likho)
   - ai / comedy: aakhri se pehle line = twist/punchline. Aakhri line = ek comment-sawaal + "Aisi aur kahaniyon ke liye follow karo!" (Devanagari me)
7. SCREEN PE JO DIKHE (bahut zaroori): jab bhi kisi line me koi cheez/ghatna ka zikr ho (chitthi, torch, phone message, bill, khaana, chaabi, video, OTP, parcel, scorecard...), us line me "show" do: {"icon":"<1 emoji>","text":"<screen pe chhota text, max 5 words>"}. 12 me se kam se kam 5-6 lines me "show" ho.
   Effects "fx" (list): "light" (Flat 7 ki khidki me roshni), "shadow" (khidki me parchhaai chalti hui), "flash" (achanak jhatka/dhamaka), "dark" (andhera/darr), "shake" (jhatka), "zoom" (bada reveal), "phone" (phone pe baat).
   "pose" aur "ex" bhi line ke mood ke hisaab se do.

JSON FORMAT — sirf valid JSON array, koi aur text nahi:
[{"id":"<series>-<number>-<english-slug>","series":"flat7|ai|comedy","ep":"Part 1 | EP 1 | \"\"",
  "title":"YouTube title: Hindi + 1 emoji, max 70 chars, end with #Shorts",
  "description":"2 lines Hindi + 4-5 hashtags",
  "caption":"Instagram caption: hook line + comment sawaal + follow line + hashtags",
  "lines":[{"who":"N","text":"...","set":"society","cast":["R","B"],"pose":{"R":"shock"},"ex":{"R":"shock"},"show":{"icon":"✉️","text":"किसी को मत बताना"},"fx":["light"]}]}]

CODES:
- who: N=Narrator, R=Ramesh, B=AI Robot, W=Wife, A=Padosan Aunty, K=Chowkidar Kaka, M=Manager, F=Dost, D=Dadi, U=Rishtedar Uncle, C=Bachcha. Ek reel me Narrator + max 3 characters.
- text: sirf bola jaane wala Hindi (Devanagari). English words (GTA, AI, OTP, EMI) Latin me. Brackets/stage directions kabhi nahi.
- set (scene badle tab): bedroom, home, hall (raat), room (raat), kitchen (raat), store, door (andhera corridor), society (society corridor), office, cabin (boss cabin), gaming (TV pe game), stadium.
- cast (jab screen pe log badlein): max 3 codes.
- pose: idle, ear, shock, point, pointUp, idea, slump, cheer, explain, wave, walkPhone.
- ex: neutral, worried, happy, shock, angry, evil, sad, smile.
- burst (optional, max 2 words): comic pop text.
- card (optional): ["HEADING","line","small line"] — message/notification screen.

Samajh gaye to sirf "OK" likho.
```

## BATCH 1 — Flat No. 7

```
BATCH flat7: Season 1 "Flat No. 7", Part <START> se Part <START+6>.
Premise: Ramesh ki society me saalon se bandh Flat 7 me ek raat achanak light jalti hai — koi move-in karte nahi dikha. Har part = ek naya clue, Ramesh ka darr + comedy, AI Robot ka deadpan logic, aur end me cliffhanger.
Cast: Ramesh, AI Robot, Chowkidar Kaka, Padosan Aunty, Wife.
Chhupa sach (Part 9 me khulega, abhi sirf hints): Flat 7 me kaka ka pota chhupa hai jo bol/sun nahi sakta; kaka use kisi darr se chhupa ke rakh rahe hain.
Kahani ab tak: <SUMMARY ya "shuruaat">.
Har part pichhle part ke cliffhanger se seedha shuru ho.
```

## BATCH 2 — Ramesh vs AI

```
BATCH ai: "Ramesh vs AI: Sach Ka Scanner", EP <START> se EP <START+6>.
Har reel ek chhoti kahani: Ramesh ek real AI/tech situation me phasta hai (comedy), AI Robot ek SACH, kaam ki tip deta hai jo viewer turant use kar sake, end me twist.
Topics: <7 topics>.
```

## BATCH 3 — Comedy

```
BATCH comedy: 7 alag standalone comedy kahaniyan, jo abhi trending hai uss par (festival, cricket, office, shaadi season, naya phone/game, society life).
Har kahani me ek clear setup -> badhta hua mazaak -> end me unexpected twist.
Topics: <7 topics>.
```
