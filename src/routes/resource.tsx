// Jekyll: /resource/index.md — curated reading shelf.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { resourceGroups } from "@/data/resources";

const toc = resourceGroups.map((g) => ({ id: g.name.toLowerCase(), label: g.name }));

export const Route = createFileRoute("/resource")({
  head: () => ({
    meta: [
      { title: "Resource — Software Studies" },
      { name: "description", content: "A curated technical reference shelf." },
      { property: "og:title", content: "Resource — Software Studies" },
    ],
  }),
  component: ResourcePage,
});

function ResourcePage() {
  return (
    <PageLayout toc={toc}>
      <h1 className="font-sans text-3xl text-text-bright">Resource</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A reference shelf — the books, papers, and writers I keep returning to. Grouped by the
        reason I open them, not by topic.
      </p>

      <div className="mt-10 space-y-10">
        {resourceGroups.map((g) => (
          <section key={g.name}>
            <h2
              id={g.name.toLowerCase()}
              className="border-b border-border pb-2 font-sans text-lg text-text-bright"
            >
              {g.name}
            </h2>
            <ul className="mt-3 divide-y divide-border">
              {g.items.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-foreground">{item.title}</span>
                  <span className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
                    {item.by}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
