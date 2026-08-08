import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Project from "@/components/page/Projects/Project";
import { getAllContentMetadata } from "@/lib/server/mdx";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    <Main title="Projects" createdAt={new Date(2025, 11, 22)} updatedAt={mostRecentUpdate}>
      <Section title="Library">
        <p>
          This page doesn&apos;t list ALL of my projects, but you can find some of my most recent here. Clicking any of them
          will direct you to another page dedicated to describing said project.
        </p>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, projectIndex) => (
            <Project
              key={`project-${projectIndex}`}
              title={project.title}
              description={project.description as string}
              createdAt={new Date(project.createdAt)}
              thumbnailPath={project.thumbnailPath}
              href={`/project/${project.slug}`}
              status={project.status}
              categories={project.categories}
            />
          ))}
        </div>
        <hr className="my-4 md:my-6 border-white/20" />
        <Link
          href="https://github.com/axxo1337"
          className="rounded-lg border border-white/20 p-3 justify-between blured-bg flex items-center group"
        >
          <div className="flex items-center gap-3">
            <Image alt="Github Logo" src="/images/socials/github.png" className="size-6 md:size-8" width={32} height={32} />
            <div className="flex flex-col">
              <p>To see more of my projects you should check my full Github profile ;)</p>
            </div>
          </div>
          <span className="inline-anchor text-sm flex items-center gap-1">
            Click to open <ArrowRight size={20} />
          </span>
        </Link>
      </Section>
    </Main>
  );
}
