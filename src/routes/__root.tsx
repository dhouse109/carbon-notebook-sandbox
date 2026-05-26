// Framework boundary note:
// TanStack Start hosts this prototype. Routing, data fetching, and React hooks
// are scaffolding only — do NOT build features that depend on them. Every
// visual decision here must map back to a Jekyll / Minimal Mistakes equivalent
// (see src/routes/style-guide.tsx → "Port Back to Jekyll").
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteMasthead } from "@/components/SiteMasthead";
import { site } from "@/data/site";

function NotFoundComponent() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="mt-3 font-sans text-2xl text-text-bright">This page is not in the notebook</h1>
      <p className="mt-3 text-muted-foreground">
        The page you're looking for doesn't exist. Try the archive or head back home.
      </p>
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <Link to="/" className="text-link hover:text-link-hover">Home</Link>
        <Link to="/archive" className="text-link hover:text-link-hover">Archive</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-sans text-xl text-text-bright">This page didn't load</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Something went wrong on our end. Try refreshing.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="rounded-sm border border-border bg-surface px-4 py-2 font-sans text-sm text-foreground hover:bg-surface-elevated"
        >
          Try again
        </button>
        <a href="/" className="rounded-sm border border-border px-4 py-2 font-sans text-sm text-foreground hover:bg-surface">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.title} — ${site.tagline}` },
      { name: "description", content: "Personal notebook and lab for software practice — Damien House." },
      { name: "author", content: "Damien House" },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <SiteMasthead />
        <Outlet />
        <footer className="mt-16 border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 font-sans text-xs text-muted-foreground sm:px-6 lg:px-8">
            <span>© {new Date().getFullYear()} Damien House · {site.tagline}</span>
            <span className="opacity-70">Theme: Software Studies Carbon · prototype</span>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
