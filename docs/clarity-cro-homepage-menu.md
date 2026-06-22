# MyMedEquip Homepage — Menu CRO Review (Clarity-informed)

_Prepared 2026-06-22 · Owner: 3P Digital · Client: **MyMedEquip** (mymedequip.com.au, Shopify store — "Empowering Lifesavers") · Hypothesis under test: the homepage primary navigation is cluttered and is costing browse-to-product / add-to-cart conversion._

---

## 0. Data status (read this first)

This review could **not** be auto-backed with live numbers in the current session because:

| Path | Result |
|---|---|
| Clarity Data Export API (`project-live-insights`) | Blocked — `www.clarity.ms` not in the environment's network egress allowlist |
| MyMedEquip homepage/sitemap scrape (to read the real menu) | Blocked — site returns HTTP 403 to automated fetchers (WAF/bot protection) across the whole domain |

What I **could** confirm (via web search): MyMedEquip is a **Shopify storefront** selling **First Aid Kits**, **Consumables** (`/collections/consumables`), and **Paramedic/prehospital** gear, with a **first-aid blog** (`/blogs/first-aid`). Audiences span paramedics, nurses, military/tactical, rescue teams, workplaces, and everyday consumers.

**Capability note:** even with egress open, Clarity's **Data Export API does not return element-level click/heatmap data.** It returns aggregate traffic + *frustration signals* (Dead Clicks, Rage Clicks, Quick-backs, Excessive Scrolling), optionally by URL — not "how many clicked nav item X." Per-menu-item evidence lives in the Clarity **UI** (Heatmaps + Recordings), per §1.

**To make this fully data-backed, pick one:**
1. Paste the Clarity homepage figures / heatmap screenshot (fastest), **or**
2. Add `www.clarity.ms` to egress → I'll pull the export metrics by URL via the built `/api/clarity` integration, **or**
3. Paste the header markup (or add the Shopify theme repo) → I'll mark up and implement the real menu.

Since it's Shopify, **GA4 + Clarity together** give the full picture: Clarity for *behavioural* friction (hunting, dead clicks), GA4 for *navigation→PDP→cart* funnel drop.

Everything below is structured so dropping in real numbers is fill-in-the-blank, not a rewrite.

---

## 1. Confirm the clutter with Clarity (do this before changing anything)

Run these in the Clarity UI for the **homepage URL**, last 28 days, segmented **Desktop vs Mobile** (mobile is where e-commerce nav clutter hurts most):

**A. Heatmaps → Click map (homepage)**
- Rank header/nav items by click share. Look for:
  - **Long tail of near-zero items** — nav links each <2% of nav clicks → demote/remove.
  - **The 80/20** — on a store, expect `First Aid Kits`, `Consumables`, search, and cart to absorb most intent. Everything else is cognitive cost.
- **Dead clicks on the nav** — taps on dropdown parents that aren't clickable, or mega-menu headers that look like links but aren't.
- **Rage clicks on the nav** — repeated clicks = label/expectation mismatch or a janky/slow mega-menu.

**B. Heatmaps → Scroll map (homepage)**
- If a tall sticky header + announcement bar pushes hero products/CTA below the fold, note average fold vs. where "Shop"/featured products sit.

**C. Session recordings — filter homepage + "Rage clicks"/"Dead clicks"**
- Watch 8–10. Look for: hovering/hunting in the mega-menu, opening a category then bouncing, **mobile users opening the hamburger and closing without selecting**, and whether shoppers default to **search** instead of the menu (a classic "menu isn't helping" tell).

**D. Quantify with metrics you can also automate (Data Export, by URL)**
- `Quick back` on homepage — clicked into a category then bounced straight back = wrong/over-promised label.
- `Excessive scrolling` — hunting behaviour, often downstream of weak nav wayfinding.
- `Traffic` (sessions, pages/session) on homepage — baseline for §4.

> Fill in: Top nav items by click % ▸ ____ · Header dead-click rate ▸ ____ · Rage-click sessions on nav ▸ ____ · Mobile hamburger open→no-select ▸ ____ · % homepage sessions using search ▸ ____

---

## 2. Why a Shopify medical-supply nav tends to get cluttered

MyMedEquip sells across **three product lines** (kits / consumables / paramedic) to **many use-cases** (workplace, vehicle, outdoor & survival, sports, tactical, pet, professional/prehospital). That's two competing axes — *product type* vs *use-case/audience* — plus blog, brand, and account links. Flatten them into one bar and shoppers can't form a mental model. Common failure modes:

- **Two taxonomies in one row** — browsing by *product* and by *use-case* interleaved; shoppers who think "I need a **workplace** kit" can't find that path next to "Consumables".
- **Hick's Law overload** — too many top-level choices slows every decision; >7 top-level items measurably raises time-to-first-click.
- **Mega-menu dumping** — every collection exposed at once (Shopify themes encourage this) instead of progressive disclosure.
- **Low-intent items in prime real estate** — `Blog`, `About`, `Our Story` sitting between high-intent `Shop`/category links.
- **Search under-weighted** — on a catalogue store, search is a primary nav tool; if it's a small icon while the menu is overloaded, you're fighting your shoppers' preferred path.
- **Mobile parity neglect** — the desktop overload becomes an unscannable hamburger accordion.

---

## 3. Recommendations — declutter, prioritized

> Re-rank against §1 click data before shipping. P1 = do first.

**P1 — Cut the top-level set to 5–6 high-intent destinations.**
Recommended spine for this catalogue:
`First Aid Kits` · `Consumables` · `Paramedic & Pro` · `Bestsellers / Shop All` · `Resources` (blog/guides) · `About` — with a **prominent utility cluster**: **Search (expanded, not just an icon)**, Account, Cart.
Move `Our Story`, policy, shipping, and secondary links to the **footer**.

**P1 — Make Search a first-class element, not an afterthought.**
For a SKU-heavy store, an always-visible search box (with predictive results) often outperforms menu browsing. If §1.C shows high search usage, widen the search field and shrink the menu.

**P1 — Lead with the primary buying axis; make use-case a secondary cut.**
Keep **product type** as the top-level spine, and expose **use-case** *inside* the `First Aid Kits` mega-menu as a clean column:
`First Aid Kits ▸` → **Workplace/Compliant · Vehicle/Car · Outdoor & Survival · Sports · Tactical · Pet** + "Shop all kits".
This serves the "I need a *workplace* kit" shopper without cluttering the main bar.

**P2 — Progressive disclosure in the mega-menus.**
`Consumables ▸` → **Trauma & Haemostatics · Airway Management · Wound Care & Dressings · Diagnostics** (4–6 groups max, clear headers, one "View all" per group). Don't list every collection flat.

**P2 — Demote content/brand to a single "Resources" hub.**
Roll the first-aid blog + buying guides under one `Resources` item (great for SEO and for de-risking purchases) instead of multiple content links competing with Shop.

**P3 — Fix what the data flags directly.**
- Nav label with **rage clicks** → rename to match destination (label over/under-promising).
- **Dead-click** mega-menu header → make group headers clickable to a landing collection, or visually non-interactive.

**P3 — Mobile: collapse to intent order.**
Hamburger ordered by §1 click ranking; **search pinned at top**; accordions for kit/consumable subgroups; account + cart persistent; About/Resources at the bottom.

---

## 4. Measurement & validation plan

**Baseline (capture now, before changes)** — homepage, 28d, Desktop/Mobile split:
- Nav click distribution (Clarity heatmap) · header dead-click & rage-click rates · `Quick back` & `Excessive scrolling` (Data Export) · % sessions using search · homepage→collection CTR · homepage→PDP→**add-to-cart** funnel (GA4).

**Test:** ship the decluttered nav as an A/B or staged release.

**Success signals (expect):**
- ↑ click concentration on the primary spine (top items capture a higher share).
- ↓ Dead clicks & ↓ Rage clicks on the header.
- ↓ `Quick back` from the homepage; ↑ pages/session.
- ↑ homepage→collection→PDP→**add-to-cart** rate (the conversion that matters).
- Mobile: ↓ hamburger open→no-select rate; faster time-to-first-product.

**Guardrail:** verify that demoting collections/content to the footer doesn't tank traffic or organic entries to genuinely important pages — check Clarity/GA before and after.

---

## 5. What I can do next (just say which)

- **Wire the data in:** with egress open, auto-pull homepage `Quick back` / `Excessive scrolling` / traffic by URL through the existing `/api/clarity` integration and drop real numbers into §1/§4.
- **Build the menu:** add the MyMedEquip Shopify theme repo (or paste the header/nav Liquid markup) and I'll implement the decluttered nav — product-led mega-menu + use-case column + mobile accordion — as a concrete diff.
- **Annotate the live menu:** paste a homepage screenshot and I'll mark up exactly which items to cut / keep / demote against these principles.
