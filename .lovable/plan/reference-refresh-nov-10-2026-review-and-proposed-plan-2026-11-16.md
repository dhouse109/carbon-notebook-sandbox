# Reference refresh (Nov 10, 2026) — review and proposed plan

Read-only review against the bundle (pinned Jekyll commit `f5187d3`). No code has changed.

## Review

| Area | Status | Notes |
| --- | --- | --- |
| Carbon color tokens and the three fonts | Already aligned | Skin Sass is byte-identical to the May upload. No change. |
| Main navigation (6 items, same order) | Already aligned | Style Guide link stays as a sandbox-only extra. |
| Four featured categories (ids, labels, order) | Already aligned | |
| `.archive__item` cards, author sidebar layout, sticky TOC layout | Already aligned | |
| Port Back to Jekyll section, Jekyll mapping comments | Already aligned | Add rows for the new pieces only. |
| Blank tagline and author bio | Intentional difference | Kept. |
| "DH" avatar placeholder (Jekyll uses `walken-on-the-moon.gif`) | Intentional difference | Kept unless you approve (Decision C). |
| 12 sample posts, `/posts/$slug` routes | Intentional difference | Kept as fixtures. Add a visible "design fixture" label. |
| Style Guide route | Intentional difference | Kept. |
| Homepage intro copy | **Inconsistency, needs your call** | Sandbox shows the front-matter `intro_text` ("This site is where I keep notes..."). Jekyll actually renders "This portfolio explores how research-driven engineering...". See Decision A. |
| Homepage heading/TOC | Outdated | Jekyll now shows a visible `h1#introduction` "Introduction" (`home_toc: true`); sandbox hides it (`sr-only`). |
| About structure | Outdated | Jekyll: What I do / How I work / Resume / Archive (h3). Sandbox has an extra "Ideas I return to" and no resume variants or archive. |
| Practice page | Outdated | Jekyll is a long-form "Software Studies — A Collaborative Framework for Product-Focused R&D" with 6 sections and 2 sub-tracks. Sandbox has a short 3-section version. |
| Resource groups | Outdated | Jekyll has 7 groups (adds **Thinking**) and 117 entries; sandbox has 6 groups and 16. |
| Footer | Outdated | Jekyll credits 109.studio, has "Submit feedback on GitHub", and Jekyll / Minimal Mistakes credits. |
| Search, PDF hosting, RSS, issue form, deployment, `_config.yml`/Gemfile | Jekyll-only | Not built. |
| Developer Relations resume (HTML comment only) | Jekyll-only | Not shown. |

## Plan, file by file

1. `src/components/HomeIntroSection.tsx` — show a visible "Introduction" heading (`h1#introduction.home__title`) styled like the Jekyll home title. Intro copy depends on Decision A. Structure and classes otherwise unchanged.
2. `src/routes/index.tsx` — remove the hidden `h1` so there is only one. Keep the TOC array (Introduction + 4 categories). Layout, cards, head metadata unchanged.
3. `src/styles.css` — add only spacing rules for `.home__title`, `.intro-section`, `.resume-variants`, and `details.resume-archive` (summary marker, focus ring, open state) using existing tokens. **No token or font changes.**
4. `src/routes/about.tsx` — reorder to What I do / How I work / Resume, with an Archive h3 (`resume-archive`). Add a `.resume-variants` list: Staff AI Engineer and Lead Full-Stack Engineer, linking to the Jekyll PDF paths (marked as prototype links; no PDFs copied). Add a native `<details class="resume-archive">` with summary "View previous resumes, 1998–2025" and a few placeholder entries labelled as fixtures. The "Ideas I return to" section is removed only if you approve (Decision B). Use the real intro opening sentence; rest of the copy is unchanged.
5. `src/routes/practice.tsx` — rebuild as the long-form page: the real title and the six headings, with the two tracks as h3s. Section bodies are short placeholders under a visible "abbreviated fixture" note, using lists, italics and one blockquote to test the type. TOC includes the h3s. The 109.studio link stays.
6. `src/components/StickyToc.tsx` — add an optional `level` field on items for an indented second level. Explicit array approach unchanged.
7. `src/data/resources.ts` and `src/routes/resource.tsx` — add the seventh group, **Thinking**, with a few clearly sample entries, and lengthen one group to test long lists. Add a small note that entries are samples, not the real 117-item list.
8. `src/routes/__root.tsx` (footer) — match the Jekyll footer: "© year 109.studio", an external "Submit feedback on GitHub" link to the live repo issue form, and "Powered by Jekyll & Minimal Mistakes". Keep a small "prototype" marker. No form, no backend.
9. `src/components/ArchiveItemCard.tsx` / `src/routes/posts.$slug.tsx` — add a small "sample post" label so fixtures are never mistaken for published posts.
10. `src/routes/style-guide.tsx` — add samples for the resume variants list, the resume archive details, and the Introduction heading. Add port-map rows for footer, `home_toc`, `.resume-variants`, and `.resume-archive`. Tokens and sections otherwise unchanged.

Unchanged: `site.ts` (tagline, bio), `AuthorSidebar` (DH avatar), `SiteMasthead`, categories, posts data, Categories, Tags and Archive pages, all nine routes.

## Approved decisions

- **A.** Homepage uses the rendered "This portfolio explores..." copy. The front-matter "This site is where I keep notes..." copy is shown only on the Style Guide for comparison.
- **B.** Remove "Ideas I return to" from About. Archive entries are labelled fixtures with no fake document links.
- **C.** Keep the "DH" avatar.
- **D.** Footer feedback links to the real live-repo GitHub issue form and opens in a new tab. The footer says Jekyll and Minimal Mistakes power the reference site, not this prototype.

When finished, I will report the changed files, the intentional differences that remain, and a testing checklist. No publishing, and neither Jekyll repo is touched.
