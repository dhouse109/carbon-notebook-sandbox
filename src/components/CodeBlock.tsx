// Jekyll: MM code block markup — .highlighter-rouge > div.highlight > pre.highlight > code
// In a real post these come from Rouge highlighting.
import type { ReactNode } from "react";

export function CodeBlock({ language, children }: { language?: string; children: ReactNode }) {
  return (
    <div className="highlighter-rouge my-6">
      {language && (
        <div className="border-b border-border bg-surface-elevated px-4 py-1 font-sans text-xs uppercase tracking-wide text-muted-foreground">
          {language}
        </div>
      )}
      <div className="highlight overflow-x-auto rounded-sm border border-border bg-surface">
        <pre className="highlight m-0 p-4 text-sm leading-relaxed text-foreground">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
