// Jekyll: /archive/index.html — chronological post archive grouped by year.
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { postsByYear } from "@/data/posts";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — Software Studies" },
      { name: "description", content: "Every post, grouped by year." },
      { property: "og:title", content: "Archive — Software Studies" },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const years = postsByYear();
  const toc = years.map(([y]) => ({ id: `year-${y}`, label: String(y) }));

  return (
    <PageLayout toc={toc}>
      <h1 className="font-sans text-3xl text-text-bright">Archive</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every post, newest first. A compact list — closer to Minimal Mistakes' default archive
        treatment than to the home page cards.
      </p>

      <div className="mt-10 space-y-12">
        {years.map(([year, items]) => (
          <section key={year}>
            <h2
              id={`year-${year}`}
              className="border-b border-border pb-2 font-sans text-xl text-text-bright"
            >
              {year}
            </h2>
            <ul className="divide-y divide-border">
              {items.map((p) => {
                const d = new Date(p.date);
                return (
                  <li key={p.slug} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                    <time
                      dateTime={p.date}
                      className="w-24 shrink-0 font-sans text-xs uppercase tracking-wide text-muted-foreground"
                    >
                      {d.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                    </time>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/posts/$slug"
                        params={{ slug: p.slug }}
                        className="font-sans text-base text-foreground hover:text-link-hover"
                      >
                        {p.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
