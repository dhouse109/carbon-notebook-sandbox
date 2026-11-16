// Jekyll: _pages/practice.md — long-form, multi-section kramdown page with toc: true.
// Headings match the Oct 2026 source; body copy is an abbreviated design fixture.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

const toc = [
  { id: "shared-philosophy", label: "A Shared Philosophy for Product-Focused Engineering" },
  { id: "model-for-reasoning", label: "A Model for Reasoning About Software" },
  { id: "dual-track", label: "A Dual-Track R&D Practice" },
  { id: "track-1", label: "Track 1 — Research", level: 3 as const },
  { id: "track-2", label: "Track 2 — Development", level: 3 as const },
  { id: "language", label: "Language as an Instrument of Invention" },
  { id: "expanded", label: "A Practice Meant to Be Expanded" },
  { id: "footnote", label: "Footnote" },
];

const h2 = "mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright";
const h3 = "mt-8 font-sans text-lg text-text-bright";
const fixture = "Fixture text for layout testing. See _pages/practice.md for the full section.";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Software Studies" },
      { name: "description", content: "Software Studies — a collaborative framework for product-focused R&D." },
      { property: "og:title", content: "Practice — Software Studies" },
      { property: "og:description", content: "A collaborative framework for product-focused R&D." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <PageLayout toc={toc}>
      <article className="max-w-2xl">
        <h1 className="font-sans text-3xl text-text-bright">
          Software Studies — A Collaborative Framework for Product-Focused R&amp;D
        </h1>
        <p className="mt-3 inline-block rounded-sm border border-border px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
          Abbreviated design fixture · headings match the real page
        </p>
        <p className="mt-6">
          A peer-to-peer reflection on structuring inquiry, extending patterns of thought, and
          deepening the way software is designed and built.
        </p>

        <h2 id="shared-philosophy" className={h2}>A Shared Philosophy for Product-Focused Engineering</h2>
        <p className="mt-4 text-muted-foreground">{fixture}</p>

        <h2 id="model-for-reasoning" className={h2}>A Model for Reasoning About Software</h2>
        <p className="mt-4 text-muted-foreground"><em>{fixture}</em></p>
        <blockquote className="my-6 border-l-2 border-primary bg-surface px-5 py-3 italic text-foreground">
          Fixture blockquote — tests pull-quote rhythm inside a long-form section.
        </blockquote>

        <h2 id="dual-track" className={h2}>A Dual-Track R&amp;D Practice</h2>
        <p className="mt-4 text-muted-foreground">{fixture}</p>
        <h3 id="track-1" className={h3}>Track 1 — Research (Exploration &amp; Sensemaking)</h3>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted-foreground">
          <li>Fixture activity</li><li>Fixture activity</li><li>Fixture artifact</li>
        </ol>
        <h3 id="track-2" className={h3}>Track 2 — Development (Design &amp; Construction)</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
          <li>Fixture activity</li><li>Fixture activity</li><li>Fixture artifact</li>
        </ul>

        <h2 id="language" className={h2}>Language as an Instrument of Invention</h2>
        <p className="mt-4 text-muted-foreground">{fixture}</p>

        <h2 id="expanded" className={h2}>A Practice Meant to Be Expanded</h2>
        <p className="mt-4 text-muted-foreground">{fixture}</p>
        <p className="mt-4 text-sm">
          The professional practice side lives at{" "}
          <a href="https://109.studio" className="text-link hover:text-link-hover" target="_blank" rel="noopener noreferrer">109.studio</a>.
        </p>

        <h2 id="footnote" className={h2}>Footnote</h2>
        <p className="mt-4 text-sm text-muted-foreground">{fixture}</p>
      </article>
    </PageLayout>
  );
}
