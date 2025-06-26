interface ServerImagePrefetchProps {
  projects: Project[];
}

export function ServerImagePrefetch({ projects }: ServerImagePrefetchProps) {
  const priorityProjects = projects.slice(0, 3);
  const secondaryProjects = projects.slice(3);

  return (
    <>
      {priorityProjects.map((project, index) => (
        <div key={`priority-${project.id}`}>
          <link
            rel="preload"
            href={project.mainImage}
            as="image"
            fetchPriority="high"
          />

          {project.images.length > 0 && (
            <link
              rel="preload"
              href={project.images[0]}
              as="image"
              fetchPriority="high"
            />
          )}
        </div>
      ))}

      {secondaryProjects.map((project, index) => (
        <link
          key={`secondary-${project.id}`}
          rel="preload"
          href={project.mainImage}
          as="image"
          fetchPriority="low"
        />
      ))}
    </>
  );
}
