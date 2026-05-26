// Jekyll: /categories/index.html — taxonomy archive page.
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArchiveList } from "@/components/ArchiveItemCard";
import { featuredCategories } from "@/data/categories";
import { postsByCategory, posts } from "@/data/posts";

const toc = featuredCategories.map((c) => ({ id: c.name, label: c.display_name }));

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Software Studies" },
      { name: "description", content: "Browse posts by category." },
      { property: "og:title", content: "Categories — Software Studies" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <PageLayout toc={toc}>
      <h1 className="font-sans text-3xl text-text-bright">Categories</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {posts.length} posts grouped into four working categories. These mirror the categories on
        the home page.
      </p>
      <div className="mt-10 space-y-12">
        {featuredCategories.map((c) => {
          const items = postsByCategory(c.name, 99);
          return (
            <section key={c.name} className="category-section border-t border-border pt-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={c.name} className="category-title font-sans text-2xl text-text-bright">
                  {c.display_name}
                </h2>
                <span className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
                  {items.length} {items.length === 1 ? "post" : "posts"}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-muted-foreground">{c.description}</p>
              <div className="mt-5">
                <ArchiveList posts={items} showMeta />
              </div>
            </section>
          );
        })}
      </div>
      <p className="mt-12 font-sans text-sm">
        <Link to="/tags" className="text-link hover:text-link-hover">Browse by tag instead →</Link>
      </p>
    </PageLayout>
  );
}
