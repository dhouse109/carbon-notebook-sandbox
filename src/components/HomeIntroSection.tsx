// Jekyll: _layouts/home-custom.html — visible <h1 id="introduction" class="home__title"> (Oct 2026,
// home_toc: true) followed by the .intro-section paragraph the layout actually renders.
// Note: index.html front matter `intro_text` holds a different "lab notebook" copy; it is kept
// for comparison on the Style Guide only (Decision A, Nov 2026).
const ext = "text-link underline-offset-2 hover:text-link-hover hover:underline";

export function HomeIntroSection() {
  return (
    <section className="intro-section">
      <h1 id="introduction" className="home__title font-sans text-3xl text-text-bright">
        Introduction
      </h1>
      <div className="intro-content mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
        <p>
          This portfolio explores how research-driven engineering and{" "}
          <a className={ext} href="https://en.wikipedia.org/wiki/Human-centered_design" target="_blank" rel="noopener noreferrer">Human-Centered Design</a>{" "}
          can lead to more thoughtful, effective software. Each project is rooted in curiosity and
          guided by methods like{" "}
          <a className={ext} href="https://en.wikipedia.org/wiki/Design_science_(methodology)" target="_blank" rel="noopener noreferrer">Design Science Research</a>{" "}
          and the{" "}
          <a className={ext} href="https://en.wikiversity.org/wiki/Thinking_Tools/Phoenix_Checklist" target="_blank" rel="noopener noreferrer">Phoenix Checklist</a>{" "}
          to solve real-world problems. Whether designing end-to-end systems, building with AI, or
          crafting developer tools, the goal is always the same: to create scalable, intelligent
          solutions that empower both users and engineers.
        </p>
      </div>
    </section>
  );
}

// index.html front matter `intro_text` — NOT rendered on the homepage. Style Guide comparison only.
export const frontMatterIntroText =
  "This site is where I keep notes, projects, experiments, and longer-running threads from my work as a technical leader and hands-on architect. Some of it is polished. Some of it is closer to a lab notebook. The common thread is software as a practice: building systems, studying how they work, and using that process to think more clearly about platforms, AI, tools, and teams.";
