// Jekyll: /practice/index.md — bridge to 109.studio, kept reflective rather than promotional.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

const toc = [
  { id: "two-sites", label: "Two sites, one practice" },
  { id: "what-belongs-here", label: "What belongs here" },
  { id: "what-belongs-there", label: "What belongs at 109.studio" },
];

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Software Studies" },
      { name: "description", content: "The relationship between damien.house and 109.studio." },
      { property: "og:title", content: "Practice — Software Studies" },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <PageLayout toc={toc}>
      <article className="max-w-2xl">
        <h1 className="font-sans text-3xl text-text-bright">Practice</h1>
        <p className="mt-2 text-muted-foreground">
          A short note about where the personal work ends and the professional practice begins.
        </p>

        <h2 id="two-sites" className="mt-10 border-b border-border pb-2 font-sans text-xl text-text-bright">
          Two sites, one practice
        </h2>
        <p className="mt-4">
          <span className="text-text-bright">damien.house</span> is the personal, reflective side
          of the work — notes, experiments, reading, and rougher project thinking.{" "}
          <a
            href="https://109.studio"
            className="text-link hover:text-link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            109.studio
          </a>{" "}
          is the professional practice side — clearer service framing, client-facing language,
          productized offers.
        </p>
        <p className="mt-4 italic text-muted-foreground">
          This site explains how I think. 109.studio explains how that thinking turns into work.
        </p>

        <h2 id="what-belongs-here" className="mt-10 border-b border-border pb-2 font-sans text-xl text-text-bright">
          What belongs here
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Notes and reflections</li>
          <li>Experiments and lab work</li>
          <li>Technical learning in public</li>
          <li>Reading lists and references</li>
          <li>Unfinished ideas I want to come back to</li>
        </ul>

        <h2 id="what-belongs-there" className="mt-10 border-b border-border pb-2 font-sans text-xl text-text-bright">
          What belongs at 109.studio
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Services and engagements</li>
          <li>Productized offers</li>
          <li>Client-facing case studies</li>
          <li>Calls to action for founders and technical leaders</li>
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          If you arrived here looking for the practice side,{" "}
          <a
            href="https://109.studio"
            className="text-link hover:text-link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            109.studio
          </a>{" "}
          is the right door.
        </p>
      </article>
    </PageLayout>
  );
}
