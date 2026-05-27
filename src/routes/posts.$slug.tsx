// Jekyll: _layouts/single.html — long-form post page with author sidebar + sticky TOC.
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { RelatedPosts } from "@/components/RelatedPosts";
import { postBySlug } from "@/data/posts";
import { featuredCategories } from "@/data/categories";

const toc = [
  { id: "preamble", label: "Preamble" },
  { id: "the-shape-of-it", label: "The shape of it" },
  { id: "an-example", label: "An example" },
  { id: "what-this-changes", label: "What this changes" },
];

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Software Studies` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-sans text-2xl text-text-bright">Post not found</h1>
      <p className="mt-2 text-muted-foreground">That slug isn't in the archive.</p>
      <Link to="/archive" className="mt-6 inline-block text-link hover:text-link-hover">
        Back to the archive
      </Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const d = new Date(post.date);
  return (
    <PageLayout toc={toc}>
      <article className="page__content max-w-2xl">
        <header className="page__title-wrap border-b border-border pb-5">
          <p className="page__categories font-sans text-xs uppercase tracking-wide text-muted-foreground">
            {post.categories
              .map((c: string) => featuredCategories.find((f) => f.name === c)?.display_name ?? c)
              .join(" · ")}
          </p>
          <h1 className="page__title mt-2 font-sans text-3xl text-text-bright">{post.title}</h1>
          <p className="page__meta mt-3 font-sans text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.date}>
              {d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="mx-2">·</span>
            <span>{post.readTimeMin} min read</span>
          </p>
        </header>

        <div className="mt-8 space-y-6 text-foreground">
          <h2 id="preamble" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
            Preamble
          </h2>
          <p>{post.excerpt}</p>
          <p>
            This is a sample body rendered as JSX. In the Jekyll site, this would be Markdown
            processed by Kramdown and rendered through <code className="rounded-sm bg-surface px-1 py-0.5 text-sm text-syntax-yellow">_layouts/single.html</code>.
          </p>

          <h2 id="the-shape-of-it" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
            The shape of it
          </h2>
          <p>
            Most of the time, the most useful thing I can do is describe the shape of a problem
            before reaching for a solution. Names matter; boundaries matter; the order things are
            discussed matters.
          </p>
          <blockquote className="border-l-2 border-primary bg-surface px-5 py-3 italic">
            Systems get easier to change when their parts stop pretending to be parts of something
            else.
          </blockquote>

          <h2 id="an-example" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
            An example
          </h2>
          <p>A small fragment, formatted as a Carbon-skinned code block:</p>
          <CodeBlock language="ruby">
{`# _config.yml — Software Studies Carbon
minimal_mistakes_skin: "software-studies-carbon"
author:
  name: "Damien House"
  bio: "​"`}
          </CodeBlock>

          <h2 id="what-this-changes" className="border-b border-border pb-2 font-sans text-xl text-text-bright">
            What this changes
          </h2>
          <p>
            Not much, immediately. The point of writing it down is to make the next decision
            slightly easier — for me, and for anyone reading along.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-sm border border-border bg-surface px-2 py-0.5 font-sans text-xs uppercase tracking-wide text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <RelatedPosts current={post} />
      </article>
    </PageLayout>
  );
}
