// Jekyll: _pages/about.md (layout: single, author_profile: true, toc: true, toc_sticky: true)
// Resume list → <ul class="resume-variants">; archive → native <details class="resume-archive">.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

const toc = [
  { id: "what-i-do", label: "What I do" },
  { id: "how-i-work", label: "How I work" },
  { id: "resume", label: "Resume" },
  { id: "resume-archive", label: "Archive", level: 3 as const },
];

// Paths mirror the Jekyll repo. PDFs are not hosted in this prototype.
const resumeVariants = [
  { role: "Staff AI Engineer", href: "/assets/portfolio/resume.dhouse.v14.06.2026-staff-ai-engineer.pdf" },
  { role: "Lead Full-Stack Engineer", href: "/assets/portfolio/resume.dhouse.v14.06.2026-lead-full-stack-engineer.pdf" },
];

// Design fixtures only — represent the shape of the archive list, not real documents.
const archiveFixtures = ["Fixture entry — 2025", "Fixture entry — 2019", "Fixture entry — 2012", "Fixture entry — 1998"];

const h2 = "mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Software Studies" },
      { name: "description", content: "About Damien House — what I do, how I work, and current resumes." },
      { property: "og:title", content: "About — Software Studies" },
      { property: "og:description", content: "What I do, how I work, and current resumes." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout toc={toc}>
      <article className="max-w-2xl">
        <h1 className="font-sans text-3xl text-text-bright">About</h1>
        <p className="mt-4">
          I'm a technical leader and hands-on architect with an extensive background in web
          platforms, content management systems, and full-stack software development.
        </p>

        <h2 id="what-i-do" className={h2}>What I do</h2>
        <p className="mt-4">
          I work on long-lived software systems — content platforms, internal tools, and the
          workflows around them. Most of my time is spent reasoning through migrations, contracts
          between teams, and the slow accumulation of decisions that becomes a platform.
        </p>

        <h2 id="how-i-work" className={h2}>How I work</h2>
        <p className="mt-4">
          I prefer small, reviewable changes; documentation as an interface to my own future
          self; and systems that are honest about what they are.
        </p>
        <blockquote className="my-6 border-l-2 border-primary bg-surface px-5 py-3 italic text-foreground">
          The most useful thing a senior engineer can do is make the next decision slightly easier
          for everyone around them.
        </blockquote>

        <h2 id="resume" className={h2}>Resume</h2>
        <p className="mt-4 text-muted-foreground">Current role-specific versions:</p>
        <ul className="resume-variants mt-3 space-y-2">
          {resumeVariants.map((r) => (
            <li key={r.role} className="flex items-baseline gap-3">
              <span aria-hidden className="text-primary">→</span>
              <a href={r.href} className="font-sans text-link hover:text-link-hover">{r.role}</a>
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">PDF · not hosted in prototype</span>
            </li>
          ))}
        </ul>

        <h3 id="resume-archive" className="mt-8 font-sans text-base text-text-bright">Archive</h3>
        <details className="resume-archive mt-3 rounded-sm border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-2 font-sans text-sm text-foreground hover:bg-surface-elevated">
            View previous resumes, 1998–2025
          </summary>
          <ul className="space-y-1 border-t border-border px-4 py-3 font-sans text-sm text-muted-foreground">
            {archiveFixtures.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <p className="px-4 pb-3 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
            Design fixtures — real entries live in _pages/about.md
          </p>
        </details>
      </article>
    </PageLayout>
  );
}
