# Google AdSense Integration Guide

This project ships with **placeholder ad components only**. No real AdSense
script or ad unit code has been added anywhere in the codebase. This document
explains where and how to wire in real AdSense code when the site is ready to
monetize.

## 1. Placeholder components

Three reusable placeholder components live in `src/app/shared/components/`:

| Component | Selector | Typical placement | Typical size |
|---|---|---|---|
| `AdBanner` | `<app-ad-banner />` | Top/bottom of listing pages, homepage | 728×90 responsive leaderboard |
| `AdRectangle` | `<app-ad-rectangle />` | Sidebar on detail pages, tool pages | 300×250 medium rectangle |
| `AdInArticle` | `<app-ad-in-article />` | Between sections of long-form content | In-article / in-feed unit |

Each currently renders a clearly labeled "Advertisement" box with a dashed
border — easy to spot in the codebase, impossible to mistake for real content
or a clickable button, and never placed where it could be confused with
navigation.

Current usage locations (search the codebase for these component tags to find
every placement):

- Homepage: bottom of page (`AdBanner`)
- AI Tools / Developer Tools / Software / Tutorials / Guides / Comparisons list
  pages: bottom of page (`AdBanner`)
- AI Tool / Software / Tutorial / Guide / Comparison detail pages: sidebar
  (`AdRectangle`) + mid-content (`AdInArticle`)
- Developer tool pages: sidebar (`AdRectangle`) + mid-content (`AdInArticle`,
  inside `ToolLayout`)

## 2. Steps to add real AdSense code

1. **Get approved for AdSense** and create ad units in your AdSense dashboard
   (one per placement type above is usually enough to start).
2. **Add the AdSense loader script** to `src/index.html`, inside `<head>`,
   once you have a publisher ID:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
   ```
3. **Add `ads.txt`** to the `public/` folder (served at `/ads.txt`) with the
   line AdSense gives you, e.g.:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. **Replace the placeholder markup** inside each of the three components
   with the real `<ins class="adsbygoogle">` snippet AdSense provides, and
   call `(adsbygoogle = window.adsbygoogle || []).push({})` after the
   component renders (in `ngAfterViewInit` or an `effect`). Because all ad
   placements already go through these three components, you only need to
   edit three files, not every page.
5. **Respect user consent.** The `CookieConsentService`
   (`src/app/core/services/cookie-consent.service.ts`) already tracks whether
   a visitor has accepted "advertising" cookies. Before pushing a
   personalized ad request, check `cookieConsent.preferences().advertising`
   and request a non-personalized ad (or skip the request) if it is `false`,
   per Google's consent requirements for users in regions like the EEA/UK.
6. **Verify with AdSense's own testing tools** after deploying, and check
   Core Web Vitals — ads must not cause significant layout shift; the
   placeholder components already reserve space (`min-height`) for this
   reason, so keep similar sizing once real ads are in.

## 3. Design principles to preserve

- **Content stays primary.** Ads should never be placed in a way that
  interrupts a user mid-task (e.g. never inside a developer tool's input/output
  area).
- **No misleading placements.** Never style an ad to look like a button, a
  navigation link, or a "download" action.
- **No encouragement to click.** Do not add copy like "Click here" or
  "Support us by clicking" near ad units — this violates AdSense policy.
- **Keep the "Advertisement" label** on every unit for transparency, even
  after real ads are wired in.

## 4. Where NOT to add ads

- Inside forms (newsletter, contact, cookie preferences)
- Inside the developer tool input/output areas themselves
- In a way that could be confused with the "Visit website" / "Copy" / "Clear"
  buttons already on tool and tool-detail pages
