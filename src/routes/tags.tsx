// Jekyll: /tags/index.html — tag taxonomy page.
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArchiveList } from "@/components/ArchiveItemCard";
import { allTags, posts } from "@/data/posts";
import { useState } from "react";

export const Route = createFileRoute("/tags")({
  head: () => ({
    meta: [
      { title: "Tags — Software Studies" },
      { name: "description", content: "Browse posts by tag." },
      { property: "og:title", content: "Tags — Software Studies" },
    ],
  }),
  component: TagsPage,
});

function TagsPage() {
  const tags = allTags();
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <PageLayout showToc={false}>
      <h1 className="font-sans text-3xl text-text-bright">Tags</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Lightweight cross-cuts through the archive. Click a tag to filter the list below.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map(([tag, count]) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              onClick={() => setActive(isActive ? null : tag)}
              className={
                "rounded-sm border px-2.5 py-1 font-sans text-xs uppercase tracking-wide transition-colors " +
                (isActive
                  ? "border-primary bg-surface-elevated text-text-bright"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground")
              }
            >
              {tag} <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-sans text-sm uppercase tracking-wide text-muted-foreground">
          {active ? `Posts tagged “${active}”` : "All posts"}
        </h2>
        <ArchiveList posts={filtered} showMeta />
      </div>
    </PageLayout>
  );
}
