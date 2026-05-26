// Jekyll: _includes/related.html — renders related posts at the foot of single.html.
import { ArchiveList } from "./ArchiveItemCard";
import { posts, type Post } from "@/data/posts";

export function RelatedPosts({ current }: { current: Post }) {
  const related = posts
    .filter((p) => p.slug !== current.slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section className="page__related mt-12 border-t border-border pt-8">
      <h2 className="page__related-title mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-text-bright">
        You may also enjoy
      </h2>
      <ArchiveList posts={related} showMeta />
    </section>
  );
}
