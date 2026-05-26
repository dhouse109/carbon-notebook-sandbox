// Jekyll: index.html front matter `intro_text` + .intro-section in _layouts/home-custom.html.
export function HomeIntroSection() {
  return (
    <section className="intro-section">
      <h2 id="introduction" className="sr-only">
        Introduction
      </h2>
      <div className="intro-content max-w-2xl text-lg leading-relaxed text-foreground">
        <p>
          This site is where I keep notes, projects, experiments, and longer-running threads from
          my work as a technical leader and hands-on architect. Some of it is polished. Some of it
          is closer to a lab notebook. The common thread is software as a practice: building
          systems, studying how they work, and using that process to think more clearly about
          platforms, AI, tools, and teams.
        </p>
      </div>
    </section>
  );
}
