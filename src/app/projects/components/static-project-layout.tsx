interface StaticProjectLayoutProps {
  projects: Project[];
  children: React.ReactNode;
}

export function StaticProjectLayout({
  projects,
  children,
}: StaticProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        {/* Static SEO-friendly project listing for crawlers */}
        <div className="sr-only">
          <h1>Projects Portfolio</h1>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <h2>{project.title}</h2>
                <p>{project.brief}</p>
                <p>Tech Stack: {project.techStack.join(", ")}</p>
                <p>Status: {project.status}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive client component */}
        {children}
      </div>
    </div>
  );
}
