
# damien.house Theme Sandbox — Revised Plan

A TanStack Start + React + TypeScript visual sandbox for the Software Studies Carbon Jekyll skin. Goal: experiment with theme refinements that translate cleanly back to the Minimal Mistakes Jekyll repo. Plain editorial, warm carbon-dark, no SaaS hero/animation/dashboard energy.

## Framework boundary note (rendered on Style Guide and as a code comment in `__root.tsx`)

> TanStack Start is the prototype host only. Treat routing, data fetching, and hooks as scaffolding — do not build features that depend on them. Every visual decision (tokens, type, spacing, components) must map back to a Jekyll/Minimal Mistakes equivalent.

## Design tokens (`src/styles.css`)

Carbon palette as CSS vars mapped into Tailwind via `@theme inline`. No hard-coded colors in components. Each var carries a comment naming its Sass counterpart in `_software-studies-carbon.scss`.

- `--background` #12110f → `$background-color`
- `--foreground` #d0c6b8 → `$text-color`
- `--muted-foreground` #9b9184 → `$muted-text-color`
- `--text-bright` #f3eee6
- `--primary` #ca884b → `$primary-color`
- `--link` #b8a06f, `--link-hover` ~#cdb787 → `$link-color`, `lighten(...,9%)`
- `--masthead-link` #aaa197, `--masthead-link-hover` #eee8dc
- `--border` #342d25 → `$border-color`
- `--surface` #1a1713 → `$code-background-color`, `.archive__item` bg
- `--surface-elevated` #221d18 → `$code-background-color-dark`, hover surface
- `--toc-title-bg` #342d25
- Syntax tokens base08..base0e

Fonts loaded via Google Fonts in `__root.tsx` head: Source Serif 4, Space Grotesk, Source Code Pro.

## Routes (file-based)

```
__root.tsx          shell, fonts, SiteMasthead, footer
index.tsx           Home
about.tsx
categories.tsx
tags.tsx
archive.tsx
resource.tsx
practice.tsx
posts.$slug.tsx
style-guide.tsx
```

Each route owns `head()` with its own title/description/og.

## Components (`src/components/`) — every file opens with a Jekyll mapping comment

- `SiteMasthead` — `// Jekyll: _data/navigation.yml + MM .masthead / .greedy-nav`. Renders `<header className="masthead"><nav className="greedy-nav">…</nav></header>` so the MM class names are visible.
- `AuthorSidebar` — `// Jekyll: _config.yml author.* + MM author profile (.sidebar, .author__avatar, .author__name, .author__bio, .author__urls)`. Reuses those class names.
- `StickyToc` — `// Jekyll: toc: true, toc_sticky: true, .toc, .toc__menu, .sidebar__right`. **Accepts an explicit `items: TocItem[]` prop (preferred, maps to Jekyll's static TOC). Optional `scanContainer` ref enables runtime heading scan as an enhancement only.**
- `PageLayout` — three-column grid `[author 240px] [content 1fr] [toc 220px]`, collapses to single column under `lg`. Renders `<main className="page page__content">`.
- `HomeIntroSection` — `// Jekyll: index.html front matter intro_text + _layouts/home-custom.html .intro-section`. Uses the exact intro_text from `index.html`.
- `FeaturedCategorySection` — `// Jekyll: page.featured_categories loop in _layouts/home-custom.html`. Renders `.category-section` with `.category-title`, `.category-description-intro-content`, `.archive__list`.
- `ArchiveItemCard` / `ArchiveList` — `// Jekyll: .archive__item, .archive__item-title, .archive__item-excerpt, .archive__item-meta`. Class names preserved.
- `TaxonomyIndex` — shared by Categories/Tags.
- `PostLayout` — `// Jekyll: _layouts/single.html`. Title, `.page__meta` (date, categories, tags, read time), body, `RelatedPosts`.
- `ResourceList` — grouped sections (Direction, Inspiration, Method, Planning, Philosophy, Research).
- `PracticePage` — reflective copy bridging to 109.studio; one small external link, no marketing CTA.
- `ThemeTokenPanel` — swatches with hex + CSS var name + Sass var name + Jekyll file path.
- `CodeBlock` — `<div className="highlighter-rouge"><pre><code>…</code></pre></div>` with monospace surface.
- `RelatedPosts`.

## Sample data (`src/data/`)

- `site.ts` — site title/tagline, author, `mainNav` (matches `_data/navigation.yml` exactly: About, Categories, Tags, Archive, Resource, Practice — no Schedule).
- `categories.ts` — the four featured categories with the exact slugs + descriptions from `index.html`.
- `posts.ts` — ~12 sample posts (3 per category) with title/date/categories/tags/excerpt/readTime. Helpers: `postsByCategory`, `postsByYear`, `allTags`, `postBySlug`.
- `resources.ts` — grouped reading list.

## Page-by-page TOC arrays (explicit, not scanned)

Every long page declares its TOC inline so it mirrors Jekyll's static `toc:` behavior. Example for About:

```ts
const aboutToc = [
  { id: "what-i-do", label: "What I do" },
  { id: "how-i-work", label: "How I work" },
  { id: "ideas-i-return-to", label: "Ideas I return to" },
  { id: "resume", label: "Resume" },
];
```

`StickyToc` consumes that array. The optional scan mode is documented but off by default.

## Homepage intro (verbatim from `index.html` front matter)

> This site is where I keep notes, projects, experiments, and longer-running threads from my work as a technical leader and hands-on architect. Some of it is polished. Some of it is closer to a lab notebook. The common thread is software as a practice: building systems, studying how they work, and using that process to think more clearly about platforms, AI, tools, and teams.

No alternate marketing copy. No second hero. The four featured category sections follow directly underneath, each rendering 3 archive cards.

## Style Guide route — expanded

Sections in order:

1. **Framework boundary note** — the paragraph above.
2. **Color tokens** — swatch grid. Each swatch shows: hex, CSS var name, Sass var name, the Jekyll file that owns it (`_sass/minimal-mistakes/skins/_software-studies-carbon.scss` or `assets/css/main.scss`).
3. **Typography samples** — serif body, sans headings, mono code.
4. **Component samples** — links, buttons, `.archive__item`, code block, `.toc`, author sidebar, resource list row.
5. **Before / After token comparison** — table with columns: *Token* · *Current Carbon value* · *Experimental value* · *Likely Sass variable* · *Jekyll file to edit*. Two or three worked examples (e.g. nudging `$primary-color`, softening `$border-color`, brightening `$link-color`).
6. **Port Back to Jekyll** — the dedicated section you requested:
   - Copyable block of `:root { --… }` CSS variables.
   - Copyable block of `$…: #…;` Sass variables formatted for `_software-studies-carbon.scss`.
   - Mapping table: prototype token → Sass variable → file path.
   - **Safe to port** list: palette hex changes, font-family swaps, surface/border refinements, hover surface, TOC title bg.
   - **Prototype-only, do NOT port** list: TanStack route structure, React component composition, any Tailwind utility classes, the explicit-TOC array shape, the page-layout grid (Jekyll uses MM's existing grid).

## Layout behavior

- Desktop ≥ lg: 3-column grid with sticky TOC and author sidebar.
- Tablet: author collapses to a top compact card, TOC hidden.
- Mobile (≤sm): single column, masthead wraps; reading measure ~720px.
- Sticky TOC: `position: sticky; top: 5rem`.

## What this prototype intentionally does NOT do

- No SaaS hero, animated gradient, chatbot, service cards, per-page marketing CTAs, dashboard panels, or heavy animation.
- No light mode toggle, no Schedule nav item, no search, no comments, no real markdown rendering (sample post bodies are JSX).
- No backend, no auth.

## Deliverable

Nine routes navigable from the masthead. Carbon skin applied consistently via tokens. Style Guide gives Damien the exact strings to paste into `_software-studies-carbon.scss` and the boundaries of what should and should not travel back to Jekyll.
