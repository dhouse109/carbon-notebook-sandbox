// Jekyll: composition of Minimal Mistakes .initial-content / .page layout.
// Three-column on lg+ (author | content | toc); single column on mobile.
import type { ReactNode } from "react";
import { AuthorSidebar } from "./AuthorSidebar";
import { StickyToc, type TocItem } from "./StickyToc";

interface Props {
  children: ReactNode;
  toc?: TocItem[];
  showAuthor?: boolean;
  showToc?: boolean;
}

export function PageLayout({ children, toc, showAuthor = true, showToc = true }: Props) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)_220px] lg:gap-10 lg:px-8">
      {showAuthor ? (
        <div className="lg:order-1">
          <AuthorSidebar />
        </div>
      ) : (
        <div aria-hidden className="hidden lg:block lg:order-1" />
      )}

      <main className="page page__content min-w-0 lg:order-2">{children}</main>

      <div className="hidden lg:order-3 lg:block">
        {showToc && toc ? <StickyToc items={toc} /> : null}
      </div>
    </div>
  );
}
