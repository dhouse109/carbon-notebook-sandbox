// Jekyll mapping reference: the values shown here live in
//   _sass/minimal-mistakes/skins/_software-studies-carbon.scss
//   assets/css/main.scss
// Use this page to plan changes, then port the chosen edits back to those files.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArchiveItemCard } from "@/components/ArchiveItemCard";
import { CodeBlock } from "@/components/CodeBlock";
import { posts } from "@/data/posts";
import { useState } from "react";

const toc = [
  { id: "framework-boundary", label: "Framework boundary" },
  { id: "color-tokens", label: "Color tokens" },
  { id: "typography", label: "Typography" },
  { id: "components", label: "Component samples" },
  { id: "before-after", label: "Before / after tokens" },
  { id: "port-back", label: "Port back to Jekyll" },
];

interface Token {
  css: string;
  sass: string;
  hex: string;
  file: "carbon" | "main";
  note?: string;
}

const FILE = {
  carbon: "_sass/minimal-mistakes/skins/_software-studies-carbon.scss",
  main: "assets/css/main.scss",
} as const;

const tokens: Token[] = [
  { css: "--background", sass: "$background-color", hex: "#12110f", file: "carbon" },
  { css: "--foreground", sass: "$text-color", hex: "#d0c6b8", file: "carbon" },
  { css: "--muted-foreground", sass: "$muted-text-color", hex: "#9b9184", file: "carbon" },
  { css: "--text-bright", sass: "(none — used in main.scss)", hex: "#f3eee6", file: "main", note: "TOC title, elevated headings" },
  { css: "--primary", sass: "$primary-color", hex: "#ca884b", file: "carbon" },
  { css: "--link", sass: "$link-color", hex: "#b8a06f", file: "carbon" },
  { css: "--link-hover", sass: "lighten($link-color, 9%)", hex: "#cdb787", file: "carbon" },
  { css: "--masthead-link", sass: "$masthead-link-color", hex: "#aaa197", file: "carbon" },
  { css: "--masthead-link-hover", sass: "$masthead-link-color-hover", hex: "#eee8dc", file: "carbon" },
  { css: "--border", sass: "$border-color", hex: "#342d25", file: "carbon" },
  { css: "--surface", sass: "$code-background-color", hex: "#1a1713", file: "carbon", note: ".archive__item bg in main.scss" },
  { css: "--surface-elevated", sass: "$code-background-color-dark", hex: "#221d18", file: "carbon", note: "hover surface" },
  { css: "--toc-title-bg", sass: "(literal in main.scss .toc .nav__title)", hex: "#342d25", file: "main" },
];

const beforeAfter: { token: string; current: string; experimental: string; sass: string; file: keyof typeof FILE }[] = [
  { token: "--primary", current: "#ca884b", experimental: "#d89455", sass: "$primary-color", file: "carbon" },
  { token: "--border", current: "#342d25", experimental: "#3d342a", sass: "$border-color", file: "carbon" },
  { token: "--link", current: "#b8a06f", experimental: "#c9b07a", sass: "$link-color", file: "carbon" },
  { token: "--surface-elevated", current: "#221d18", experimental: "#28221c", sass: "$code-background-color-dark", file: "carbon" },
];

export const Route = createFileRoute("/style-guide")({
  head: () => ({
    meta: [
      { title: "Style Guide — Software Studies" },
      { name: "description", content: "Theme tokens, component samples, and Jekyll port-back notes." },
    ],
  }),
  component: StyleGuide,
});

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1200);
        });
      }}
      className="rounded-sm border border-border bg-surface px-2 py-1 font-sans text-xs uppercase tracking-wide text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function StyleGuide() {
  const cssVarsBlock = `:root {\n${tokens.map((t) => `  ${t.css}: ${t.hex};`).join("\n")}\n}`;
  const sassVarsBlock = tokens
    .filter((t) => t.sass.startsWith("$"))
    .map((t) => `${t.sass}: ${t.hex} !default;`)
    .join("\n");

  return (
    <PageLayout toc={toc}>
      <h1 className="font-sans text-3xl text-text-bright">Style guide</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A working surface for the Software Studies Carbon skin. Every token, sample, and
        before/after on this page maps back to a file in the Jekyll repo.
      </p>

      {/* 1. Framework boundary ------------------------------------------------ */}
      <section className="mt-12">
        <h2 id="framework-boundary" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Framework boundary
        </h2>
        <div className="mt-4 rounded-sm border border-border bg-surface p-5">
          <p className="text-foreground">
            TanStack Start is the prototype host only. Routing, data fetching, and React hooks are
            scaffolding — do not build features that depend on them.
          </p>
          <p className="mt-3 text-muted-foreground">
            Every visual decision here must translate to a Jekyll / Minimal Mistakes equivalent.
            When in doubt, prefer the Jekyll-native pattern.
          </p>
        </div>
      </section>

      {/* 2. Color tokens ----------------------------------------------------- */}
      <section className="mt-12">
        <h2 id="color-tokens" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Color tokens
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tokens.map((t) => (
            <div key={t.css} className="flex gap-4 rounded-sm border border-border bg-surface p-3">
              <div
                aria-hidden
                className="h-16 w-16 shrink-0 rounded-sm border border-border"
                style={{ background: t.hex }}
              />
              <div className="min-w-0 flex-1 font-sans text-xs">
                <div className="text-text-bright">{t.hex}</div>
                <div className="mt-1 truncate text-foreground">{t.css}</div>
                <div className="truncate text-muted-foreground">{t.sass}</div>
                <div className="mt-1 truncate text-muted-foreground/80">{FILE[t.file]}</div>
                {t.note && <div className="mt-1 italic text-muted-foreground/80">{t.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Typography ------------------------------------------------------- */}
      <section className="mt-12">
        <h2 id="typography" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Typography
        </h2>
        <div className="mt-6 space-y-6 rounded-sm border border-border bg-surface p-5">
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
              Headings — Space Grotesk ($header-font-family)
            </p>
            <h3 className="mt-2 font-sans text-2xl text-text-bright">The shape of a system</h3>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
              Body — Source Serif 4 ($global-font-family)
            </p>
            <p className="mt-2 max-w-xl text-foreground">
              A platform is not a stack. It is the residue of every small decision the team made
              about how the system should be easier to change over time.
            </p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
              Mono — Source Code Pro ($monospace)
            </p>
            <p className="mt-2 font-mono text-sm text-foreground">
              const platform = decisions.reduce(accumulate, baseline);
            </p>
          </div>
        </div>
      </section>

      {/* 4. Component samples ------------------------------------------------ */}
      <section className="mt-12">
        <h2 id="components" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Component samples
        </h2>

        <h3 className="mt-6 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          Links — $link-color / $link-color-hover
        </h3>
        <p className="mt-2">
          A <a href="#" className="text-link hover:text-link-hover">restrained link</a> in body
          copy, plus a <a href="#" className="text-primary hover:text-link-hover">primary-colored emphasis</a>.
        </p>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          Buttons (lightweight)
        </h3>
        <div className="mt-3 flex flex-wrap gap-3">
          <button className="rounded-sm border border-border bg-surface px-4 py-2 font-sans text-sm text-foreground hover:bg-surface-elevated">
            Default
          </button>
          <button className="rounded-sm border border-primary px-4 py-2 font-sans text-sm text-primary hover:bg-surface-elevated">
            Accent
          </button>
        </div>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          .archive__item
        </h3>
        <div className="mt-3">
          <ArchiveItemCard post={posts[0]} showMeta />
        </div>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          .highlighter-rouge
        </h3>
        <CodeBlock language="scss">
{`// _sass/minimal-mistakes/skins/_software-studies-carbon.scss
$background-color: #12110f !default;
$text-color: #d0c6b8 !default;
$primary-color: #ca884b !default;`}
        </CodeBlock>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          Blockquote
        </h3>
        <blockquote className="mt-3 border-l-2 border-primary bg-surface px-5 py-3 italic text-foreground">
          Documentation is the API your team uses to call the rest of the team.
        </blockquote>
      </section>

      {/* 5. Before / after --------------------------------------------------- */}
      <section className="mt-12">
        <h2 id="before-after" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Before / after token comparison
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three small nudges to try in the Carbon skin. Each row shows the current token, an
          experimental value, the Sass variable, and the file to change.
        </p>
        <div className="mt-6 overflow-x-auto rounded-sm border border-border">
          <table className="w-full font-sans text-sm">
            <thead className="bg-surface-elevated text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Token</th>
                <th className="px-3 py-2">Current</th>
                <th className="px-3 py-2">Experimental</th>
                <th className="px-3 py-2">Sass variable</th>
                <th className="px-3 py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {beforeAfter.map((row) => (
                <tr key={row.token} className="border-t border-border">
                  <td className="px-3 py-2 text-foreground">{row.token}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className="inline-block h-4 w-4 rounded-sm border border-border" style={{ background: row.current }} />
                      <code className="text-muted-foreground">{row.current}</code>
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className="inline-block h-4 w-4 rounded-sm border border-border" style={{ background: row.experimental }} />
                      <code className="text-text-bright">{row.experimental}</code>
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{row.sass}</td>
                  <td className="px-3 py-2 text-muted-foreground/80">{FILE[row.file]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Port back -------------------------------------------------------- */}
      <section className="mt-12">
        <h2 id="port-back" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
          Port back to Jekyll
        </h2>

        <h3 className="mt-6 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          CSS variables (paste into assets/css/main.scss inside :root)
        </h3>
        <div className="mt-2 flex items-start gap-3">
          <pre className="flex-1 overflow-x-auto rounded-sm border border-border bg-surface p-4 font-mono text-xs text-foreground">{cssVarsBlock}</pre>
          <Copy text={cssVarsBlock} />
        </div>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          Sass variables (paste into _sass/minimal-mistakes/skins/_software-studies-carbon.scss)
        </h3>
        <div className="mt-2 flex items-start gap-3">
          <pre className="flex-1 overflow-x-auto rounded-sm border border-border bg-surface p-4 font-mono text-xs text-foreground">{sassVarsBlock}</pre>
          <Copy text={sassVarsBlock} />
        </div>

        <h3 className="mt-8 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          Mapping table
        </h3>
        <div className="mt-2 overflow-x-auto rounded-sm border border-border">
          <table className="w-full font-sans text-sm">
            <thead className="bg-surface-elevated text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Prototype token</th>
                <th className="px-3 py-2">Sass variable</th>
                <th className="px-3 py-2">Jekyll file</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t.css} className="border-t border-border">
                  <td className="px-3 py-2 text-foreground">{t.css}</td>
                  <td className="px-3 py-2 text-muted-foreground">{t.sass}</td>
                  <td className="px-3 py-2 text-muted-foreground/80">{FILE[t.file]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-surface p-5">
            <h3 className="font-sans text-sm uppercase tracking-wide text-text-bright">
              Safe to port
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-foreground">
              <li>Palette hex changes (background, text, primary, link, border, surfaces)</li>
              <li>Font-family swaps in the skin's typography section</li>
              <li>Hover surface adjustments on <code>.archive__item</code></li>
              <li>TOC title background and active-state border-left color</li>
              <li>Border color softening / warming</li>
              <li>Code block background tone</li>
            </ul>
          </div>
          <div className="rounded-sm border border-border bg-surface p-5">
            <h3 className="font-sans text-sm uppercase tracking-wide text-text-bright">
              Prototype-only — do NOT port
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-foreground">
              <li>TanStack route structure and file-based routing</li>
              <li>React component composition and props</li>
              <li>Tailwind utility class names</li>
              <li>The explicit <code>TocItem[]</code> array shape (Jekyll uses Kramdown's auto-TOC)</li>
              <li>The page-layout CSS grid (MM has its own grid)</li>
              <li>Client-side tag filtering state (Jekyll renders per-tag pages)</li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
