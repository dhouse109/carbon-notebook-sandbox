// Jekyll: _config.yml author.* + Minimal Mistakes author profile partial.
// Class names mirror .sidebar, .author__avatar, .author__name, .author__bio, .author__urls.
import { author } from "@/data/site";

export function AuthorSidebar() {
  return (
    <aside className="sidebar author__profile sticky top-20 self-start text-sm">
      <div className="author__avatar mb-4">
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface font-sans text-xl text-text-bright"
        >
          DH
        </div>
      </div>
      <h2 className="author__name mb-1 font-sans text-base font-semibold text-text-bright">
        {author.name}
      </h2>
      <p className="author__bio mb-4 text-muted-foreground">{author.bio}</p>
      <ul className="author__urls space-y-1 font-sans text-xs uppercase tracking-wide">
        {author.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-muted-foreground transition-colors hover:text-link-hover"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
