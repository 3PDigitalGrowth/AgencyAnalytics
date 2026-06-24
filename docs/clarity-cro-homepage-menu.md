# MyMedEquip Homepage — Menu CRO Review (Clarity-informed)

_Prepared 2026-06-24 · Owner: 3P Digital · Client: **MyMedEquip** (mymedequip.com.au, Shopify — "Empowering Lifesavers") · Reviewed against the **actual homepage** (screenshots, captured 2026-06-24)._

---

## 0. The menu as it stands today

**Primary nav (left → right):**
1. Books & Reference Cards ▾
2. Boots Bags & Apparel ▾
3. Supplies & Equipment ▾
4. First Aid Kits ▾
5. Simulation & Training
6. Resource Vault ▾
7. Contact Us

**Utility row:** Country/currency (Australia AUD $) · Logo · **Scoped search** ("All ▾" + "Search for…" + voice) · Account · Cart
**Below nav:** "EMPOWERING LIFESAVERS" bar → rotating **USP carousel** (Free shipping >$299 · TGA Approved Kits · Subject Matter Experts · Bulk Orders)

**Second navigation system on the same page:** a 6-tile category shortcut row in the hero area —
`Survival Kits` · `Blood Control Consumables` · `Trauma Shears & Tools` · `Reference Books & Cards` · `Paramedic Boots & Footwear` · `Student Kits – Nurses & Paramedics`.

> Data note: Clarity's Data Export API is still egress-blocked here, and it wouldn't give per-item click data anyway (that's UI-only). So the findings below are derived from the **actual menu structure** and are framed as **hypotheses to confirm** with the Clarity heatmap pulls in §3. Each is independently defensible on IA/CRO grounds.

---

## 1. Findings — the menu *is* cluttered, and here's specifically why

**F1 — Prime real estate is mis-allocated to low-intent items.**
The two **left-most** (most valuable) slots are `Books & Reference Cards` and `Boots Bags & Apparel` — niche/accessory lines. The core revenue categories `First Aid Kits` and `Supplies & Equipment` sit in positions 3–4. Left-to-right scanning + Hick's Law means you're spending your highest-attention positions on your lowest-intent categories.

**F2 — Your hero/best-selling category isn't in the menu at all.**
The homepage screams **bleed control / trauma** — featured product is the *TRUST Tactical Ratchet Tourniquet* ($199.90), a "Blood Control News" blog block, "best-selling tourniquet" copy, and a `Blood Control Consumables` hero tile. Yet there is **no top-level "Bleed Control / Trauma" menu item** — it's buried inside `Supplies & Equipment`. The single most important buying path is hidden.

**F3 — Two different navigation systems with mismatched labels.**
The top menu and the hero tile row use **different taxonomies and even different words for the same thing**:
- `Books & Reference Cards` (menu) vs `Reference Books & Cards` (tile) — same products, words reordered.
- `Boots Bags & Apparel` (menu) vs `Paramedic Boots & Footwear` (tile).
- `Supplies & Equipment` (menu) vs `Blood Control Consumables` / `Trauma Shears & Tools` (tiles).
Two competing systems that don't agree is precisely the "cluttered / which way do I go?" feeling — and it splits click signal so neither path looks decisive in analytics.

**F4 — Catch-all overlap creates ambiguity.**
`Supplies & Equipment` overlaps `First Aid Kits`, `Blood Control Consumables`, and `Trauma Shears & Tools`. A shopper after a tourniquet has 3+ plausible entry points. Overlapping categories are the classic driver of **dead clicks and back-and-forth** (validate in §3).

**F5 — Mixed taxonomy axes in one bar.**
Product categories (`First Aid Kits`, `Supplies & Equipment`) sit beside a **service/format** (`Simulation & Training`) and **content** (`Resource Vault`) and a **utility** (`Contact Us`). Four different kinds of thing flattened into one row raises cognitive load.

**F6 — Inconsistent grammar/grouping in labels.**
`Boots Bags & Apparel` mashes three things with no separators; ampersand/comma usage differs item-to-item. Minor, but it adds to the "untidy" perception.

**F7 — Vertical stack pushes the hero/CTA down.**
Announcement bar + USP carousel + two nav rows consume significant above-the-fold height before the hero CTA. Worth checking the scroll map (§3) on mobile especially.

**What's already good (keep):** scoped **search is prominent** (big win for a SKU-heavy store — keep it front-and-centre); trust USPs (TGA, paramedic-owned, free-shipping threshold) are strong and correctly placed.

---

## 2. Recommendation — a tighter, intent-ranked menu

Re-rank to lead with revenue/intent, surface the hero category, and fold low-intent lines into logical parents. Proposed **6-item** spine:

| # | New top-level | Rolls in (mega-menu columns) | Was |
|---|---|---|---|
| 1 | **First Aid Kits ▾** | Workplace/Compliant · Vehicle · Outdoor & Survival · Tactical · Student – Nurses & Paramedics · Pet | #4 → #1 |
| 2 | **Bleed Control & Trauma ▾** _(new)_ | Tourniquets · Haemostatics & Dressings · Chest Seals · Trauma Shears & Tools | promoted out of "Supplies & Equipment" |
| 3 | **Supplies & Equipment ▾** | Airway · Diagnostics · Consumables · Simulation & Training | absorbs #5 |
| 4 | **Apparel & Bags ▾** | Boots & Footwear · Bags & Packs · Apparel | renamed from "Boots Bags & Apparel" |
| 5 | **Resources ▾** | Resource Vault · Books & Reference Cards · Blood Control News (blog) | absorbs #1 & #6 |
| 6 | **Bulk & Corporate / Contact** | Clinic, Government & Corporate orders · Contact Us | from "Contact Us" |

Why this works:
- **Leads with the two highest-intent paths** (Kits, Bleed Control) instead of Books/Boots.
- **Promotes the hero category** (F2) to its own top-level slot — your bestseller finally has a front door.
- **Removes the catch-all ambiguity** (F4): tourniquets/shears now live under Bleed Control, not also under Supplies.
- **Single axis at the top** (product), with service/content demoted into parents (F5).
- **6 items, consistent grammar** (F6).

**Critically — unify the two systems (F3):** make the homepage hero tiles use the **exact same labels and destinations** as the menu. One vocabulary, used everywhere. If you keep the tile row, it should mirror the 6 spine items (or the top sub-categories), not introduce a third taxonomy.

**Keep search prominent**; on mobile, pin search at the top of the hamburger and order items by the spine above.

---

## 3. Confirm with Clarity before shipping (maps to the findings)

In the Clarity **UI**, homepage, last 28 days, **Desktop vs Mobile**:

- **Click map → header.** Rank the 7 items by click share. _Expect F1: Books/Boots underperform their prime position; Kits/Supplies over-index despite being further right._
- **Click map → hero tile row.** Compare tile clicks vs menu clicks for the same categories. _Expect F3: intent split across the two systems._
- **Dead clicks on nav + mega-menus.** _Expect F4: ambiguity around Supplies & Equipment vs Kits vs trauma._
- **Rage clicks on nav.** Any label being clicked repeatedly = rename candidate (F3/F6).
- **Scroll map.** Where's the average fold vs the hero CTA? (F7 — check mobile.)
- **Session recordings** filtered to Rage/Dead clicks on homepage: watch for menu-hunting and **search-instead-of-menu** behaviour (if shoppers skip the menu for search, that's a strong "menu isn't helping" signal).

**Also automatable now** (Data Export by URL, via the built `/api/clarity`): `Quick back` and `Excessive scrolling` per top collection — high `Quick back` on a category = label over-promising.

> Fill in: Books/Boots click share ▸ ____ · Kits/Supplies click share ▸ ____ · tile-vs-menu split ▸ ____ · header dead-click rate ▸ ____ · % homepage sessions using search ▸ ____ · mobile hamburger open→no-select ▸ ____

---

## 4. Measurement & validation plan

**Baseline now (pre-change):** nav click distribution · header dead/rage-click rates · `Quick back`/`Excessive scrolling` by collection · % sessions using search · homepage→collection→PDP→**add-to-cart** funnel (GA4).

**Test:** ship the 6-item spine + unified tile labels as an A/B or staged release.

**Success signals:**
- ↑ click concentration on the top spine; **Bleed Control & Trauma** captures meaningful share (proof F2 was costing you).
- ↓ dead clicks & ↓ rage clicks on the header.
- ↓ `Quick back` from the homepage; ↑ pages/session.
- ↑ homepage→collection→PDP→**add-to-cart** (the conversion that matters).
- Mobile: ↓ hamburger open→no-select; faster time-to-first-product.

**Guardrail:** confirm demoting Books/Simulation into parents doesn't tank traffic/organic entries to those pages — check Clarity/GA before & after.

---

## 5. What I can do next (just say which)

- **Implement it:** add the MyMedEquip Shopify theme repo (or paste the header/nav Liquid + the hero-tiles section) and I'll build the 6-item mega-menu, unified tile labels, and mobile accordion as a concrete diff.
- **Wire the data in:** open egress to `www.clarity.ms` and I'll auto-pull `Quick back`/`Excessive scrolling`/traffic by collection into §3/§4 via the existing `/api/clarity` integration.
- **Quick visual:** I can produce an annotated before/after menu mock (labelled keep/cut/demote) for client sign-off.
