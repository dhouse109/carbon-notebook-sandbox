// Jekyll: index.html (layout: home-custom) + _layouts/home-custom.html
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { FeaturedCategorySection } from "@/components/FeaturedCategorySection";
import { featuredCategories } from "@/data/categories";

const toc = [
  { id: "introduction", label: "Introduction" },
  ...featuredCategories.map((c) => ({ id: c.name, label: c.display_name })),
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Software Studies — Damien House" },
      { name: "description", content: "Notes, projects, experiments, and longer-running threads on software as a practice." },
      { property: "og:title", content: "Software Studies" },
      { property: "og:description", content: "Notes and lab work from Damien House on platforms, AI, and tools." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageLayout toc={toc}>
      <h1 className="sr-only">Software Studies</h1>
      <HomeIntroSection />
      <div className="categories-showcase mt-12 space-y-12">
        {featuredCategories.map((c) => (
          <FeaturedCategorySection key={c.name} {...c} />
        ))}
      </div>
    </PageLayout>
  );
}
