// Jekyll: .archive__item / .archive__item-title / .archive__item-excerpt / .archive__item-meta
// Used by the home page, category archives, tag archives, and post archive.
import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/posts";

interface Props {
  post: Post;
  showMeta?: boolean;
}

export function ArchiveItemCard({ post, showMeta = false }: Props) {
  const date = new Date(post.date);
  return (
    <article className="archive__item group rounded-sm border border-border bg-surface p-5 transition-colors hover:bg-surface-elevated">
      <h3 className="archive__item-title font-sans text-lg font-semibold leading-snug">
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="text-foreground transition-colors group-hover:text-link-hover"
        >
          {post.title}
        </Link>
      </h3>
      <p className="archive__item-excerpt mt-2 text-muted-foreground">{post.excerpt}</p>
      {showMeta && (
        <p className="archive__item-meta mt-3 font-sans text-xs uppercase tracking-wide text-muted-foreground">
          <time dateTime={post.date}>
            {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <span className="mx-2">·</span>
          <span>{post.readTimeMin} min read</span>
        </p>
      )}
    </article>
  );
}

export function ArchiveList({ posts, showMeta }: { posts: Post[]; showMeta?: boolean }) {
  return (
    <div className="archive__list grid gap-4">
      {posts.map((p) => (
        <ArchiveItemCard key={p.slug} post={p} showMeta={showMeta} />
      ))}
    </div>
  );
}
