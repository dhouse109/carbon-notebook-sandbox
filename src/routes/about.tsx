// Jekyll: about.md (layout: single, author_profile: true, toc: true, toc_sticky: true)
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

const toc = [
  { id: "what-i-do", label: "What I do" },
  { id: "how-i-work", label: "How I work" },
  { id: "ideas-i-return-to", label: "Ideas I return to" },
  { id: "resume", label: "Resume" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Software Studies" },
      { name: "description", content: "About Damien House — how I work, the ideas I return to, and a short resume." },
      { property: "og:title", content: "About — Software Studies" },
      { property: "og:description", content: "How I work, the ideas I return to, and a short resume." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout toc={toc}>
      <article className="prose-notebook max-w-2xl">
        <h1 className="font-sans text-3xl text-text-bright">About</h1>
        <p className="mt-2 text-muted-foreground">
          A short, plainspoken introduction. This page is the slow one — written for peers, not for
          a homepage banner.
        </p>

        <h2 id="what-i-do" className="mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright">
          What I do
        </h2>
        <p className="mt-4">
          I work as a technical leader and hands-on architect on long-lived software systems —
          content platforms, internal tools, and the workflows around them. Most of my time is
          spent reasoning through migrations, contracts between teams, and the slow accumulation
          of decisions that becomes a platform.
        </p>
        <p className="mt-4">
          I write here to think more clearly. The notebook habit predates the website.
        </p>

        <h2 id="how-i-work" className="mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright">
          How I work
        </h2>
        <p className="mt-4">
          I prefer small, reviewable changes; documentation as an interface to my own future
          self; and systems that are honest about what they are. I lean on prototypes to ask
          better questions, not to ship faster.
        </p>
        <blockquote className="my-6 border-l-2 border-primary bg-surface px-5 py-3 italic text-foreground">
          The most useful thing a senior engineer can do is make the next decision slightly easier
          for everyone around them.
        </blockquote>

        <h2 id="ideas-i-return-to" className="mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright">
          Ideas I return to
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground">
          <li>A platform is the residue of small decisions, not a stack.</li>
          <li>Documentation is the API your team uses to call the rest of the team.</li>
          <li>AI belongs in the review loop more than in the writing loop.</li>
          <li>A prototype is a precise way of asking the next question.</li>
        </ul>

        <h2 id="resume" className="mt-12 border-b border-border pb-2 font-sans text-xl text-text-bright">
          Resume
        </h2>
        <p className="mt-4 text-muted-foreground">
          Twenty-plus years working across content platforms, developer tooling, and applied AI.
          Full timeline available on request — the short version is: builder first, leader by
          accumulation.
        </p>
      </article>
    </PageLayout>
  );
}
