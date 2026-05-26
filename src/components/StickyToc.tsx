// Jekyll: toc: true, toc_sticky: true, .toc, .toc__menu, .sidebar__right.
// Prefer the explicit `items` prop — it maps directly to MM's static TOC.
// The optional `scanContainer` ref enables runtime heading scan as an
// enhancement; do not rely on it for the Jekyll port.
import { useEffect, useState, type RefObject } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items?: TocItem[];
  scanContainer?: RefObject<HTMLElement | null>;
  title?: string;
}

export function StickyToc({ items, scanContainer, title = "Table of Contents" }: Props) {
  const [scanned, setScanned] = useState<TocItem[]>([]);

  useEffect(() => {
    if (items || !scanContainer?.current) return;
    const headings = scanContainer.current.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    setScanned(
      Array.from(headings).map((h) => ({ id: h.id, label: h.textContent ?? h.id })),
    );
  }, [items, scanContainer]);

  const list = items ?? scanned;
  if (list.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className="toc sidebar__right sticky top-20 self-start rounded-sm border border-border bg-surface text-sm"
    >
      <div className="nav__title bg-toc-title-bg px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-text-bright">
        {title}
      </div>
      <ul className="toc__menu p-2">
        {list.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className="block border-l-2 border-transparent py-1 pl-3 font-sans text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
