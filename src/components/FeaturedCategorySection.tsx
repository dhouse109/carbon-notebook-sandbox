// Jekyll: page.featured_categories loop in _layouts/home-custom.html.
// Renders .category-section with .category-title, description, .archive__list.
import { Link } from "@tanstack/react-router";
import { ArchiveList } from "./ArchiveItemCard";
import { postsByCategory } from "@/data/posts";
import type { CategoryName } from "@/data/categories";

interface Props {
  name: CategoryName;
  display_name: string;
  description: string;
}

export function FeaturedCategorySection({ name, display_name, description }: Props) {
  const items = postsByCategory(name, 3);
  return (
    <section className="category-section border-t border-border pt-10">
      <h2
        id={name}
        className="category-title font-sans text-2xl font-semibold text-text-bright"
      >
        {display_name}
      </h2>
      <div className="category-description-intro-content mt-3 max-w-2xl text-muted-foreground">
        <p>{description}</p>
      </div>
      <div className="mt-6">
        <ArchiveList posts={items} />
      </div>
      <p className="mt-4 font-sans text-sm">
        <Link to="/categories" className="text-link hover:text-link-hover">
          More in {display_name} →
        </Link>
      </p>
    </section>
  );
}
