# MediEquip Homepage — Menu CRO Review (Clarity-informed)

_Prepared 2026-06-22 · Owner: 3P Digital · Hypothesis under test: the homepage primary navigation is cluttered and is costing engagement/conversions._

---

## 0. Data status (read this first)

This review could **not** be auto-backed with live numbers in the current session because:

| Path | Result |
|---|---|
| Clarity Data Export API (`project-live-insights`) | Blocked — `www.clarity.ms` not in the environment's network egress allowlist |
| MediEquip homepage scrape (to read the real menu) | Blocked — site returns HTTP 403 to automated fetchers (bot protection) |

**Important capability note:** even with egress open, the Clarity **Data Export API does not return element-level click/heatmap data.** It returns aggregate traffic + *frustration signals* (Dead Clicks, Rage Clicks, Quick-backs, Excessive Scrolling), optionally split by URL — not "how many people clicked nav item X." The per-menu-item evidence lives in the Clarity **UI** (Heatmaps + Session Recordings). So the strongest menu-clutter evidence is a 20-minute UI pull, described in §1.

**To make this fully data-backed, pick one:**
1. Paste the Clarity figures/heatmap screenshot for the homepage (fastest), **or**
2. Add `www.clarity.ms` to egress **and** confirm the exact domain → I'll pull the export metrics by URL automatically via the integration already built (`/api/clarity`).

Everything below is structured so dropping in the real numbers is a fill-in-the-blank, not a rewrite.

---

## 1. Confirm the clutter with Clarity (do this before changing anything)

Run these in the Clarity UI for the **homepage URL**, last 28 days, segmented **Desktop vs Mobile** (clutter usually hurts mobile most):

**A. Heatmaps → Click map (homepage)**
- Rank the **header/nav** items by click share. Look for:
  - **Long-tail of near-zero items** — nav links each taking <2% of nav clicks are candidates for removal/demotion.
  - **The 80/20** — typically 2–4 items absorb most nav intent. Everything else is cognitive cost.
- **Dead clicks on the nav** — taps on labels/dropdown parents that aren't clickable, or submenu items that mis-fire. Strong "cluttered/confusing" signal.
- **Rage clicks on the nav** — repeated clicks on a menu item = expectation mismatch (label unclear, dropdown slow/janky).

**B. Heatmaps → Scroll map (homepage)**
- If the menu pushes the hero/primary CTA below a tall/sticky header, note the **average fold** and whether the main CTA is above it.

**C. Session recordings — filter homepage + "Rage clicks" and "Dead clicks"**
- Watch 8–10. You're looking for: hovering/hunting in the menu, opening a dropdown then bouncing, mobile users opening the hamburger and closing without selecting.

**D. Quantify with the metrics you can also automate (Data Export, by URL)**
- `Quick back` on the homepage — entered a page from nav then bounced straight back = wrong/over-promised label.
- `Excessive scrolling` — hunting behaviour, often downstream of weak nav wayfinding.
- `Traffic` (sessions, pages/session) on homepage — baseline for the before/after test in §4.

> Fill in: Top nav items by click % ▸ ____ · Dead-click rate on header ▸ ____ · Rage-click sessions on nav ▸ ____ · Mobile hamburger open→no-select rate ▸ ____

---

## 2. Why a B2B medical-equipment nav tends to get cluttered

MediEquip operates across **service/repairs, equipment sales, and consumables**, serving **hospitals, defence, day surgeries, emergency services, dental, surf life saving**, with a customer portal (**MAAS** asset management) and offices in 5 cities (per public profile). That's three businesses + many audiences + a portal — the classic recipe for an overloaded menu where **product categories, audience/sector links, service, support, company, and login all compete in one bar.**

Typical failure modes this produces:
- **Mixed taxonomies in one row** — by *product*, by *sector*, and by *task* all flattened together. Users can't form a mental model.
- **Hick's Law overload** — too many top-level choices slows every decision; >7 top-level items measurably increases time-to-first-click.
- **Low-intent items stealing prime real estate** — "About", "News/Blog", "Careers" sitting between high-intent paths (Shop/Products, Service, Contact).
- **Mega-menu dumping** — every SKU category exposed at once instead of progressive disclosure.
- **Mobile parity neglect** — the desktop overload becomes an unscannable hamburger list.

---

## 3. Recommendations — declutter, prioritized

> Re-rank against §1 click data before shipping. P1 = do first.

**P1 — Cut the top-level set to the 5–7 highest-intent destinations.**
Recommended primary spine for this business model:
`Products/Equipment` · `Consumables/Supplies` · `Service & Repairs` · `Industries` (sector landing) · `About` · `Contact` — plus a utility cluster (Search, **Login/MAAS**, Phone, primary CTA).
Move everything else (News, Careers, Resources, policy links) to the **footer** or under About.

**P1 — Separate "buy" from "learn" with a clear primary CTA.**
One unmistakable high-contrast CTA in the header (e.g. *Request a Quote* / *Contact Sales* / *Shop*). Right now intent likely diffuses across many equal-weight links. Anchor it.

**P2 — Use progressive disclosure for product depth.**
Don't expose every category on hover. Group into a tidy mega-menu with **4–6 columns max, clear headers, and one "View all" per group.** Aim for a scannable structure, not a wall.

**P2 — Make the taxonomy single-axis at the top level.**
Pick **product-led** as primary (matches purchase intent) and demote sector/audience to a secondary "Industries" hub or an in-page switcher — don't interleave the two axes in the main bar.

**P2 — Surface the portal/login as utility, not a nav peer.**
`MAAS` / customer login belongs in the top-right utility cluster (small, persistent), not competing with marketing nav.

**P3 — Fix what the data flags directly.**
- Any nav label with **rage clicks** → rename to match destination (the label is over/under-promising).
- Any **dead-click** parent → make dropdown parents either clickable to a landing page or visually non-interactive.

**P3 — Mobile: collapse to intent order.**
Hamburger list ordered by the §1 click ranking, primary CTA pinned at top, accordions for product depth, login/phone at the bottom.

---

## 4. Measurement & validation plan

**Baseline (capture now, before changes)** — homepage, 28d, Desktop/Mobile split:
- Nav click distribution (Clarity heatmap) · Header dead-click & rage-click rates · `Quick back` & `Excessive scrolling` (Data Export) · homepage→key-page CTR · macro-conversion (quote/contact/add-to-cart).

**Test:** ship the decluttered nav as an A/B or staged release.

**Success signals (expect):**
- ↑ click concentration on the primary spine (top 5 items capture a higher share).
- ↓ Dead clicks & ↓ Rage clicks on the header.
- ↓ `Quick back` from the homepage; ↑ pages/session.
- ↑ click-through to Products / Service / Contact and ↑ primary-CTA clicks.
- Mobile: ↓ hamburger open→no-select rate.

**Guardrail:** watch that demoting items to the footer doesn't tank traffic to genuinely important pages — verify in Clarity/GA before and after.

---

## 5. What I can do next (just say which)

- **Wire the data in:** with egress open + confirmed domain, auto-pull homepage `Quick back` / `Excessive scrolling` / traffic by URL through the existing `/api/clarity` integration and drop real numbers into §1/§4.
- **Build the menu:** if you add the MediEquip site repo (or paste the header/nav markup), I'll implement the decluttered navigation as a concrete diff with the mega-menu + mobile accordion.
- **Annotate the live menu:** paste a homepage screenshot and I'll mark up exactly which items to cut/keep/demote against CRO principles.
