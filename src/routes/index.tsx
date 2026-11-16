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
      { property: "og:description", content: "Research-driven engineering and human-centered design from Damien House." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageLayout toc={toc}>
      <HomeIntroSection />
      <div className="categories-showcase mt-12 space-y-12">
        {featuredCategories.map((c) => (
          <FeaturedCategorySection key={c.name} {...c} />
        ))}
      </div>
    </PageLayout>
  );
}
