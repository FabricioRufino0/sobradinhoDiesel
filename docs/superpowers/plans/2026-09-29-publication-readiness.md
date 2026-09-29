# Publication Readiness Implementation Plan

> **For agentic workers:** Execute inline in the existing checkout, preserving pre-existing changes.

**Goal:** Test the Sobradinho Diesel site end to end and correct verified issues that block launch, crawling, or accurate discovery in search and answer engines.

**Architecture:** Keep the existing one-page Vite, React, and Tailwind site. Prefer the current platform and dependencies; change only real launch-readiness gaps. Keep structured business facts aligned with visible copy and confirmed details.

**Tech Stack:** Vite 8, React 19, TypeScript 7, Tailwind CSS 4, static files in `public/`.

**Spec:** Current user request; public domain `https://sobradinhodiesel.com.br/`; prior approved one-page services and parts positioning.

## Global Constraints

- Preserve existing local changes and the chosen current checkout.
- Do not invent business hours, service areas, guarantees, prices, or brand partnerships.
- The public site is a single-page site; sitemap and canonical URLs must match it.
- Avoid new dependencies unless a measured requirement cannot be met with the current stack.
- Do not claim Google, Bing, or AI inclusion is guaranteed; report external account setup and indexing dependencies separately.

## Review Focus

- Raw production HTML versus JavaScript-rendered content: confirm what crawlers receive before adding rendering machinery.
- Metadata, robots, sitemap, LLM summary, favicon, canonical, and JSON-LD: confirm formats, URLs, and facts agree.
- Internal links and contact actions: verify every nav, anchor, `tel:` and WhatsApp URL targets the intended destination.
- Narrow and wide viewports: verify no clipped content, horizontal overflow, or inaccessible menu controls.
- Assets and page runtime: verify HTTP status, image/font loading, browser console, keyboard operation, and reduced-motion behavior.

---

### Task 1: Establish a launch baseline

**Files:** `package.json`, `index.html`, `src/main.tsx`, `src/site.tsx`, `src/index.css`, `public/*`, `README.md`.

- [x] Inspect repository guidance, current diff, scripts, and deploy assumptions.
- [x] Run the existing production build and record baseline warnings/errors.
- [x] Serve the production output locally and inspect HTTP responses, browser console, rendered content, and requested assets.

### Task 2: Audit crawling and business identity

**Files:** `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `src/site.tsx`.

- [x] Compare source HTML with rendered page content and check crawler access to CSS, JavaScript, and images.
- [x] Validate canonical/social metadata and parse JSON-LD against visible confirmed business facts.
- [x] Check robots syntax, sitemap URLs, and `llms.txt` accuracy against the one-page site and current search-provider documentation.
- [x] Record any external publication work that requires domain hosting, Search Console, Bing Webmaster Tools, or Business Profile access.

### Task 3: Test site behavior and accessibility

**Files:** `src/site.tsx`, `src/index.css`, `public/assets/*`.

- [x] Check mobile menu open/close, page anchors, WhatsApp/telephone/maps links, and browser console.
- [x] Inspect page layout and overflow at narrow mobile, mobile, tablet, and desktop widths.
- [x] Check headings, landmarks, accessible names, image alternatives, visible focus, representative text contrast, and reduced motion.

### Task 4: Apply minimal verified corrections and recheck

**Files:** only those containing confirmed issues; update `README.md` if publication setup changes.

- [x] Make the smallest safe changes, preserving the current content and confirmed business facts.
- [x] Rebuild production, rerun static URL/metadata checks, and repeat browser checks against the built site.
- [x] Report passed checks, remaining launch prerequisites, and any limitation requiring a live domain or external account.
