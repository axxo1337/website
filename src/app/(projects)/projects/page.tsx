import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Project from "@/components/page/Projects/Project";
import { getAllContentMetadata } from "@/lib/server/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects() {
  const projects = (await getAllContentMetadata("project")).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const mostRecentUpdate = projects.reduce((latest, project) => {
    const projectUpdate = new Date(project.updatedAt);
    return projectUpdate > latest ? projectUpdate : latest;
  }, new Date(0));

  return (
    <Main
      title="Projects"
      createdAt={new Date(2025, 11, 22)}
      updatedAt={mostRecentUpdate}
    >
      <Section title="Library">
        <p className="md:text-lg">
          This page doesn&apos;t list ALL of my project, but you can find some
          of my most recent here. Clicking any of them will direct you to
          another page dedicated to describing said project.
        </p>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, projectIndex) => (
            <Project
              key={`project-${projectIndex}`}
              title={project.title}
              description={project.description as string}
              createdAt={new Date(project.createdAt)}
              thumbnailPath={project.thumbnailPath as string}
              href={`/project/${project.slug}`}
            />
          ))}
        </div>
      </Section>
    </Main>
  );
}
