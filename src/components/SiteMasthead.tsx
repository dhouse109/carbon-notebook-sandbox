// Jekyll: _data/navigation.yml + Minimal Mistakes .masthead / .greedy-nav styles.
// Class names preserved so changes here translate back cleanly.
import { Link } from "@tanstack/react-router";
import { site, mainNav } from "@/data/site";

export function SiteMasthead() {
  return (
    <header className="masthead border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-6 gap-y-2 px-4 py-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="site-title font-sans text-lg font-semibold text-text-bright hover:text-masthead-link-hover"
        >
          {site.title}
        </Link>
        <span className="site-subtitle hidden text-xs italic text-muted-foreground sm:inline">
          {site.tagline}
        </span>
        <nav className="greedy-nav ml-auto">
          <ul className="visible-links flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-sm">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-masthead-link transition-colors hover:text-masthead-link-hover"
                  activeProps={{ className: "text-masthead-link-hover" }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/style-guide"
                className="text-masthead-link/70 transition-colors hover:text-masthead-link-hover"
                activeProps={{ className: "text-masthead-link-hover" }}
              >
                Style guide
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
