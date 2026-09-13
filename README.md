# TechAI Tools

A frontend-only Angular website for discovering AI tools, developer utilities
and software, plus practical tutorials, guides and comparisons. Built as a
content-focused technology platform designed to eventually support Google
AdSense — not as an ad-first template.

> **Branding note:** "TechAI Tools" is a placeholder name. Change it by
> updating `src/index.html` (`<title>`), `src/app/layout/header/header.html`
> (logo text) and `src/app/layout/footer/footer.html`.

## 1. Project overview

The site has three pillars:

1. **AI Tools directory** — searchable, filterable listing of AI tools with
   full detail pages (features, pros/cons, pricing, alternatives, FAQ).
2. **Developer Tools** — 17 fully working, browser-only utilities (JSON
   formatter, JWT decoder, regex tester, password generator, etc.) covering
   all 20 tools requested in the original brief (a few closely related pairs,
   like Base64 encode/decode, are combined into one tool with a mode toggle).
3. **Content**: Tutorials, Guides, Software directory and head-to-head
   Comparisons, all with SEO metadata, breadcrumbs, and JSON-LD structured
   data where genuinely applicable.

Everything runs client-side against local TypeScript data files — **there is
no backend**, no database, and no real authentication.

## 2. Requirements

- Node.js **v24.19.0** (already installed — do not downgrade)
- npm **11.x** (bundled with the above Node version)
- Angular CLI **21.x** (installed as a dev dependency; use via `npx ng` or a
  global install, either works)

## 3. Installation

```bash
npm install
```

## 4. Development

```bash
npm start
# or
npx ng serve
```

Serves at `http://localhost:4200` with live reload.

## 5. Production build

```bash
npm run build
# or
npx ng build
```

Output goes to `dist/techai-tools/`. The build has been run and verified to
complete with no TypeScript or template errors as part of this project's
development.

## 6. Project architecture

```
src/app/
  core/
    models/       # Shared TypeScript interfaces (AiTool, Tutorial, etc.)
    services/     # ThemeService, SeoService, StructuredDataService,
                   # FavoritesService, ToastService, CookieConsentService
  shared/
    components/   # Button, Card, Badge, Rating, Breadcrumb, Pagination,
                   # Modal, Dropdown, Tabs, Alert, Toast, SkeletonLoader,
                   # EmptyState, FaqAccordion, CopyButton, FavoriteButton,
                   # AdBanner / AdRectangle / AdInArticle placeholders,
                   # SearchBox
  layout/
    header/       # Sticky responsive header: nav, search, theme dropdown
    footer/       # Footer with link columns
    cookie-consent/ # Cookie banner + preferences modal
  features/
    home/
    ai-tools/           # data, service, card component, list + detail pages
    developer-tools/    # ToolLayout/ToolInput/ToolOutput + 17 tool pages
    software/
    tutorials/
    guides/
    comparisons/
    search/
    favorites/
    legal/              # about, contact, privacy-policy, terms, disclaimer,
                         # cookie-policy
    not-found/
```

Each content feature (`ai-tools`, `software`, `tutorials`, `guides`,
`comparisons`) follows the same pattern: a `data/*.data.ts` file (typed mock
data), a `*.service.ts` (the only thing that would need to change to call a
real API later), a card component, and list/detail pages. All routes are
lazy-loaded via `loadChildren`/`loadComponent`.

State that needs to persist (theme, favorites, cookie consent) uses Angular
**signals** inside services, backed by `localStorage`. There is no NgRx —
it genuinely isn't needed at this scale.

## 7. How to add a new AI tool

1. Open `src/app/features/ai-tools/data/ai-tools.data.ts`.
2. Add a new object to the `AI_TOOLS` array matching the `AiTool` interface
   (`src/app/core/models/ai-tool.model.ts`) — give it a unique `slug`.
3. It will automatically appear in `/ai-tools`, in search results, and be
   reachable at `/ai-tools/<slug>`. Reference its slug from a tutorial's
   `relatedToolSlugs` or another tool's `alternatives` (by exact `name`) to
   wire up internal links.

## 8. How to add a new developer tool

1. Add metadata to `src/app/features/developer-tools/data/developer-tools.data.ts`.
2. Create a folder under `src/app/features/developer-tools/pages/<slug>/`
   with a component that uses `ToolLayout` + `ToolInput`/`ToolOutput` (see
   `json-formatter` for the simplest example). Keep the actual logic (e.g.
   parsing, formatting) as plain functions/computed signals in the component.
3. Register the route in `src/app/features/developer-tools/developer-tools.routes.ts`.

## 9. How to add a tutorial

1. Add a new entry to `TUTORIALS` in
   `src/app/features/tutorials/data/tutorials.data.ts`, matching the
   `Tutorial` interface. Content is structured as a `sections[]` array (each
   with a heading + paragraphs/bullets/numbered/code/table) so the detail
   page can render semantic HTML and a table of contents automatically.
2. No route changes needed — `/tutorials/<slug>` resolves automatically.

## 10. How to add a software item

Same pattern as AI tools: edit
`src/app/features/software/data/software.data.ts` (`SoftwareItem` interface).

## 11. How to add a comparison

Edit `src/app/features/comparisons/data/comparisons.data.ts`. Each
`Comparison` has two `ComparisonSide` objects (set `toolSlug` if the item also
exists in the AI Tools directory, to get an automatic "View full profile"
link) and a `featureRows[]` array rendered as a responsive table.

## 12. How to modify the theme

All colors, radii and shadows are CSS custom properties defined once in
`src/styles.scss`, under `:root` (light) and `:root[data-theme='dark']`
(dark). Change a value there and it updates everywhere — components never
hardcode colors.

Theme preference (`light` / `dark` / `system`) is managed by
`ThemeService` (`src/app/core/services/theme.service.ts`), persisted to
`localStorage`, and applied by setting `data-theme` on `<html>`. The header's
theme dropdown calls `themeService.setPreference(...)`.

## 13. How to add Google AdSense later

See **[ADSENSE_INTEGRATION.md](./ADSENSE_INTEGRATION.md)** for full details.
In short: three placeholder components (`AdBanner`, `AdRectangle`,
`AdInArticle`) are already placed on every relevant page — replace their
internal markup with real AdSense `<ins>` tags and add the loader script to
`index.html`. No other page needs to change.

## 14. How to connect a backend later

Every feature has a thin `*.service.ts` (e.g. `AiToolsService`,
`TutorialsService`) that currently reads from a local array. Components only
ever call these services — never the data files directly. To connect a real
API:

1. Inject `HttpClient` into the service.
2. Replace the synchronous array lookups with `firstValueFrom(this.http.get(...))`
   or return `Observable`s and adapt call sites (most are already inside
   `computed()`/effects, so consider using `toSignal()` on the HTTP call, or
   switching the relevant pages to use `AsyncPipe`/signals-from-observables).
3. Keep the same method names/shapes (`getAll()`, `getBySlug()`, etc.) so
   template code doesn't need to change.

Contact form, newsletter signup and cookie preferences are all frontend-only
today and clearly marked as such in the UI — wiring them to a real email
service/backend endpoint is a drop-in change to the relevant `submit()`
method.

## 15. SEO notes

- `SeoService` (`src/app/core/services/seo.service.ts`) sets the page title,
  meta description, canonical URL and Open Graph/Twitter tags on every route.
- `StructuredDataService` injects JSON-LD (`BreadcrumbList`, `Article`,
  `SoftwareApplication`, `FAQPage`) only on pages that genuinely contain that
  content — no fabricated structured data.
- `public/robots.txt` and `public/sitemap.xml` exist, but the sitemap
  currently lists only static section pages. See the comment at the top of
  `sitemap.xml` for how to extend it once detail-page URLs need to be listed.

**Important limitation:** this app is client-side rendered (CSR). Tags set
by `SeoService` are applied via JavaScript after the initial HTML loads.
Modern Googlebot can generally execute JavaScript and see these tags, but
many other crawlers and social-share link previews only read the raw
server-delivered HTML. For guaranteed SEO correctness and fast previews,
add **Angular SSR** (`ng add @angular/ssr`) or prerender key routes at build
time. The `SeoService`/`StructuredDataService` APIs were written to be
rendering-strategy-agnostic, so adding SSR later should not require changing
any call site.

## 16. AdSense / monetization preparation

See [ADSENSE_INTEGRATION.md](./ADSENSE_INTEGRATION.md). No real ad code is
present anywhere in this repository.

## 17. Deployment

This is a static Angular build — `dist/techai-tools/browser/` after running
`npm run build` — and can be deployed to any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3+CloudFront, nginx, etc.).

Because this is a client-side-routed SPA, configure your host to rewrite all
unknown paths to `index.html` (a "SPA fallback" / `try_files` rule), otherwise
deep links like `/ai-tools/chatgpt` will 404 on a hard refresh.

---

## Features implemented

- Full light/dark/system theme, persisted to `localStorage`, applied
  consistently across every surface (header, footer, cards, forms, tables,
  code blocks, modals, cookie banner).
- Responsive header (sticky, search, theme switcher, hamburger menu on
  mobile) and footer with linked columns.
- Homepage: hero + search, featured AI tools, popular developer tools,
  latest tutorials, category grid, "why us" section, frontend-only
  newsletter form, ad banner placement.
- AI Tools directory: search, category filter, pricing filter, sort,
  pagination, and full detail pages (features/pros/cons/best-for/
  alternatives/related tutorials/FAQ) with JSON-LD.
- **17 fully working developer tools**, all 100% client-side (see list
  below), sharing a common `ToolLayout`/`ToolInput`/`ToolOutput` component
  set to avoid duplicated markup.
- Software directory + detail pages (search, category filter).
- Tutorials: 12 genuinely long-form articles (table of contents, semantic
  headings, code blocks with copy buttons, tables, prev/next navigation,
  related tutorials, FAQ), with search/category/difficulty filters and
  pagination.
- Guides: 6 in-depth guides reusing the same long-form content renderer.
- Comparisons: 4 head-to-head comparisons with a responsive feature table,
  pros/cons per side, and a verdict.
- Global search (`/search?q=...`) across AI tools, developer tools, software,
  tutorials, guides and comparisons, grouped by type.
- Favorites (`/favorites`), stored in `localStorage`, with a heart toggle on
  every AI tool, software, tutorial and guide card.
- Legal pages: About, Contact (working reactive form, frontend-only),
  Privacy Policy, Terms, Disclaimer, Cookie Policy — all clearly marked
  where backend/legal review is required before real launch.
- Cookie consent banner + preferences modal (Accept all / Reject
  non-essential / Manage preferences), stored in `localStorage`.
- Ad placeholder components (`AdBanner`, `AdRectangle`, `AdInArticle`) placed
  throughout, never styled as clickable/misleading.
- Custom 404 page and a catch-all route.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon.

## Routes implemented

```
/                                     Home
/ai-tools                             AI Tools directory
/ai-tools/:slug                       AI Tool detail
/developer-tools                      Developer Tools directory
/developer-tools/json-formatter
/developer-tools/json-validator
/developer-tools/json-minifier
/developer-tools/base64               (encoder + decoder, one tool)
/developer-tools/url-encoder-decoder  (encoder + decoder, one tool)
/developer-tools/jwt-decoder
/developer-tools/uuid-generator
/developer-tools/timestamp-converter
/developer-tools/regex-tester
/developer-tools/word-counter         (word + character counter, one tool)
/developer-tools/case-converter
/developer-tools/html-formatter
/developer-tools/css-formatter
/developer-tools/javascript-formatter
/developer-tools/color-converter
/developer-tools/password-generator
/developer-tools/lorem-ipsum-generator
/software
/software/:slug
/tutorials
/tutorials/:slug
/guides
/guides/:slug
/comparisons
/comparisons/:slug
/search
/favorites
/about
/contact
/privacy-policy
/terms
/disclaimer
/cookie-policy
/404
** (wildcard -> 404)
```

## Developer tools implemented (17 tools covering all 20 requested capabilities)

| Tool | Notes |
|---|---|
| JSON Formatter | Pretty-print with 2/4-space indent |
| JSON Validator | Clear pass/fail + parser error message |
| JSON Minifier | Whitespace-free output + size reduction % |
| Base64 Encoder/Decoder | Combined tool, Unicode-safe |
| URL Encoder/Decoder | Combined tool |
| JWT Decoder | Decodes header + payload; **does not** verify signatures (documented) |
| UUID Generator | Batch generation via `crypto.randomUUID()` |
| Timestamp Converter | Two-way Unix <-> date, auto-detects seconds/ms |
| Regex Tester | Live highlighted matches, flags support |
| Word & Character Counter | Words/chars/sentences/paragraphs/reading time |
| Case Converter | 8 case styles at once |
| HTML Formatter | Lightweight tag-based reindenter |
| CSS Formatter | Brace/semicolon-based reindenter |
| JavaScript Formatter | Heuristic reindenter (string/comment-aware); explicitly **not** a Prettier replacement |
| Color Converter | HEX <-> RGB <-> HSL + color picker |
| Password Generator | `crypto.getRandomValues`-based, configurable |
| Lorem Ipsum Generator | Paragraphs/sentences/words |

The three formatter tools (HTML/CSS/JS) are intentionally simple,
dependency-free, rule-based reformatters — not full parsers — to avoid
pulling in a heavy formatting library. This is documented on each tool's own
page under "Limitations."

## SEO implementation

- Per-route `SeoService.update()` calls (title, description, canonical, OG,
  Twitter).
- `StructuredDataService` for JSON-LD (`BreadcrumbList` everywhere it
  applies, `Article` on tutorials, `SoftwareApplication` on AI tool/software
  detail pages, `FAQPage` only where real FAQ content exists).
- Semantic HTML throughout (one `<h1>` per page, proper heading order,
  `<nav>`, `<time>`, `<table>` with `<thead>`/`<tbody>`).
- See section 15 above for the CSR/SSR caveat — **this app does not claim
  perfect SEO from client-side rendering alone.**

## AdSense preparation

See [ADSENSE_INTEGRATION.md](./ADSENSE_INTEGRATION.md).

## How to run locally

```bash
npm install
npm start
```

## Production build command

```bash
npm run build
```

## Known limitations / not implemented

- **No SSR/prerendering yet** — see SEO notes above.
- **No backend** — contact form, newsletter, and all "data" are local/mock,
  by design, per the brief.
- **Ratings, review counts and testimonials are illustrative sample data**,
  not real collected data — replace before any real launch (see
  `disclaimer` page, which already says this).
- **No automated test suite was authored** for this feature set (the default
  Angular unit-test scaffold from `ng new` was kept and adjusted to compile,
  but no new spec files were added) — `ng build` (type-checking + template
  compilation) was used as the primary correctness gate throughout
  development, plus manual code review of every file. No browser/visual
  testing tool was available in this environment, so **visual/interactive UI
  behavior has not been verified in an actual browser** — please run
  `npm start` and click through the app (especially theme toggle, the 17
  developer tools, filters, and mobile widths) before treating this as
  launch-ready.
- **`og-default.png` referenced by `SeoService` does not exist** in
  `public/` — add a real 1200×630 social preview image there, or update the
  default path.
- **Comparison content** covers 4 direct head-to-head comparisons (ChatGPT vs
  Claude, Claude vs Gemini, ChatGPT vs Gemini, Cursor vs GitHub Copilot). The
  brief's "Best AI Coding Tools" / "Best AI Writing Tools" style listicles
  were intentionally left out of the Comparisons section (which uses a
  strict two-item model) — that kind of content is instead covered by the
  "Best AI Tools for Developers" tutorial. A ranked-listicle content type
  could be added later following the same `data`/`service`/pages pattern.

## Recommended next steps for backend/API integration

1. Stand up a real API (any stack) exposing the same shapes as the
   `core/models/*.model.ts` interfaces.
2. Swap each feature's `*.service.ts` internals to call `HttpClient` instead
   of reading the local `data/*.data.ts` array (see section 14 above).
3. Add real authentication if user accounts are needed (favorites are
   currently anonymous/local — moving them server-side would let them sync
   across devices).
4. Add Angular SSR for real SEO guarantees and faster first paint.
5. Replace illustrative ratings/reviews with real, sourced data before
   launch, and finalize the legal pages with qualified review.
