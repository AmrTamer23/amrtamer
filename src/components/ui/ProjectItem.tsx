import type { Project } from "../../lib/types";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="w-full flex h-fit bg-rich_black-600 rounded-lg hide my-7 overflow-clip">
      <img
        src={project.image}
        alt="QuizMaster"
        className="w-2/5 object-cover"
        loading="lazy"
      />

      <span className="flex flex-col gap-5 m-5">
        <h2 className="text-4xl">{project.name}</h2>
        <p className="text-2xl">{project.description}</p>
        <span className="text-2xl flex flex-col gap-3">
          Key Features:
          <ul className="list-disc list-inside">
            {project.features.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
        </span>
        <span className="text-2xl flex gap-3">
          <p className="self-end">Built With</p>
          <img
            src={`https://skillicons.dev/icons?i=` + project.technologies}
            className="inline"
          />
        </span>
        <span className="flex gap-3">
          <a
            href={project.link}
            target="_blank"
            className="text-2xl bg-rich_black-500 px-5 py-2 rounded-lg"
          >
            Visit It
          </a>
          <a
            href={project.sourceCode}
            target="_blank"
            className="text-2xl bg-rich_black-500 px-5 py-2 rounded-lg"
          >
            Source Code
          </a>
        </span>
      </span>
    </div>
  );
}
