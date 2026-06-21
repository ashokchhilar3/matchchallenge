# Open Items — Math Challenge

Items to revisit in future iterations.

---

## 🔐 Identity & Authentication
**Status:** Deferred (V1 is session-only, no persistence)

**Options explored:**
1. Pick a fun username + avatar (no email, stored locally)
2. Parent enters email once, kid picks username + avatar
3. Classroom code from teacher + kid picks a name
4. QR code invite link — kid just picks a name on first visit
5. Cookie-based — auto-assigned a random fun name, can change it
6. Google/Microsoft sign-in (parent supervised)

**Recovery options explored (for cross-device):**
- QR invite + secret recovery phrase (3 emoji or animals)
- QR invite + optional parent email for recovery
- QR invite + short 4-digit PIN
- QR invite + magic link to parent email

**Decision:** V1 uses session-only name entry. Revisit when adding persistence, leaderboard history, or multi-device support.

---

## 🖥️ Backend & Persistence
**Status:** Deferred (V1 is static frontend only)

**Options explored:**
1. Static HTML/JS — no backend (localStorage + hardcoded questions) ✅ **V1 choice**
2. Simple backend (Node/Python) with a database for questions + leaderboard
3. Serverless (Azure Functions / Firebase) for leaderboard, static frontend
4. Full stack (React + API + DB)

**Decision:** V1 is pure static frontend. Revisit when adding persistent leaderboards, user accounts, or teacher dashboards.

---

## 🗺️ Multiple Maps
**Status:** Architecture supports it, V1 ships with 1 map

**When to revisit:** After V1 feedback — add maps based on difficulty levels, seasonal themes, or topic focus areas.

---

## 📊 Analytics & Dashboards
**Status:** Not started

**Ideas for future:**
- Teacher dashboard to see class progress
- Parent view of child's performance
- Question difficulty analytics (which questions get disputed most)

---

## 🗺️ Rich Map & Celebrations
**Status:** Deferred to V2+

**Map — original vision (approved, deferred):**
- Adventure-themed map (treasure hunt, space, fantasy world — team picks)
- Visual path with checkpoints connected along a trail
- Animated elements, the map feels alive as progress is made

**Celebrations — original vision (approved, deferred):**
- Confetti animation + sound effects + animated badge earned + dancing mascot
- Grand finale: dramatic reveal animation + special prize badge + fireworks
- Accumulated points/stars visible throughout the journey
- Sound effects toggleable (on by default, can be muted)

**V1 uses:** Simple timeline + minimal CSS animations. Revisit after V1 ships.
