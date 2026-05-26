// Stand-in for `site.posts` in Jekyll. Each post has Liquid-style front matter
// fields (title, date, categories, tags, excerpt) plus a small body for the
// post detail prototype.
import type { CategoryName } from "./categories";

export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  categories: CategoryName[];
  tags: string[];
  excerpt: string;
  readTimeMin: number;
}

export const posts: Post[] = [
  {
    slug: "platforms-are-decisions",
    title: "Platforms are accumulated decisions",
    date: "2026-04-18",
    categories: ["product-platform-architecture"],
    tags: ["platforms", "drupal", "architecture"],
    excerpt:
      "A platform is not a stack. It is the residue of every small decision the team made about how the system should be easier to change.",
    readTimeMin: 7,
  },
  {
    slug: "content-models-as-contracts",
    title: "Content models are contracts with the future",
    date: "2026-03-29",
    categories: ["product-platform-architecture"],
    tags: ["content", "modeling", "drupal"],
    excerpt:
      "Field-level decisions feel small at the time. Five years later they are the reason the migration is hard.",
    readTimeMin: 9,
  },
  {
    slug: "migration-as-listening",
    title: "Migration as listening",
    date: "2026-02-11",
    categories: ["product-platform-architecture"],
    tags: ["migrations", "legacy"],
    excerpt:
      "The most useful part of a migration is rarely the new system. It is what the old one finally tells you on the way out.",
    readTimeMin: 6,
  },
  {
    slug: "ai-in-the-review-loop",
    title: "AI belongs in the review loop, not the writing loop",
    date: "2026-04-02",
    categories: ["applied-ai-workflow-systems"],
    tags: ["ai", "review", "workflow"],
    excerpt:
      "Models are better at noticing than at deciding. Wire them into the place where the team already pauses to look.",
    readTimeMin: 8,
  },
  {
    slug: "reviewable-automation",
    title: "Reviewable automation",
    date: "2026-03-14",
    categories: ["applied-ai-workflow-systems"],
    tags: ["ai", "automation"],
    excerpt:
      "Automation that cannot be inspected is automation that cannot be trusted. Build the seam where a human can look.",
    readTimeMin: 5,
  },
  {
    slug: "search-as-a-product-surface",
    title: "Search as a product surface",
    date: "2026-01-22",
    categories: ["applied-ai-workflow-systems"],
    tags: ["search", "ai"],
    excerpt:
      "Most content sites treat search as plumbing. Treating it as a surface changes what you measure and what you ship.",
    readTimeMin: 7,
  },
  {
    slug: "local-dev-is-a-product",
    title: "Local dev is a product",
    date: "2026-04-10",
    categories: ["developer-tooling-delivery-systems"],
    tags: ["devex", "tooling"],
    excerpt:
      "If the first hour of a new engineer's week is hostile, your platform is hostile. Treat the local environment with the same care as production.",
    readTimeMin: 6,
  },
  {
    slug: "small-ci-systems",
    title: "Small CI systems beat clever ones",
    date: "2026-03-05",
    categories: ["developer-tooling-delivery-systems"],
    tags: ["ci", "delivery"],
    excerpt:
      "A pipeline you can explain on a whiteboard outperforms a pipeline that requires a wiki to understand.",
    readTimeMin: 5,
  },
  {
    slug: "documentation-as-interface",
    title: "Documentation as interface",
    date: "2026-02-02",
    categories: ["developer-tooling-delivery-systems"],
    tags: ["docs", "devex"],
    excerpt:
      "Docs are the API your team uses to call the rest of the team. Treat that API with the same seriousness.",
    readTimeMin: 6,
  },
  {
    slug: "spike-notebook-march",
    title: "Lab notebook: a small spike on embeddings drift",
    date: "2026-03-22",
    categories: ["rd-labs-learning-experiments"],
    tags: ["embeddings", "lab", "notes"],
    excerpt:
      "Two weeks of notes from a short spike on how a corpus rebuild shifts retrieval rankings — and what surprised me.",
    readTimeMin: 10,
  },
  {
    slug: "reading-feb",
    title: "Reading list, February",
    date: "2026-02-25",
    categories: ["rd-labs-learning-experiments"],
    tags: ["reading", "notes"],
    excerpt:
      "A short pass through what stuck this month, mostly about systems thinking and the long lives of platforms.",
    readTimeMin: 4,
  },
  {
    slug: "prototype-as-question",
    title: "A prototype is a question",
    date: "2026-01-09",
    categories: ["rd-labs-learning-experiments"],
    tags: ["prototyping", "method"],
    excerpt:
      "Prototypes are not small versions of the answer. They are precise ways of asking the next question.",
    readTimeMin: 5,
  },
];

export function postsByCategory(name: CategoryName, limit = 3) {
  return posts.filter((p) => p.categories.includes(name)).slice(0, limit);
}

export function postsByYear() {
  const map = new Map<number, Post[]>();
  for (const p of [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))) {
    const y = new Date(p.date).getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return [...map.entries()];
}

export function allTags() {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
