import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import GithubCTA from "@/components/page/Projects/GithubCTA";
import Project from "@/components/page/Projects/Project";
import { getAllContentMetadata, getMostRecentUpdate } from "@/lib/server/mdx";
import JsonLd from "@/components/ui/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/server/jsonld";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of software engineering, reverse engineering, and cybersecurity projects by aXXo.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects - aXXo's website",
    description: "A showcase of software engineering, reverse engineering, and cybersecurity projects by aXXo.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - aXXo's website",
    description: "A showcase of software engineering, reverse engineering, and cybersecurity projects by aXXo.",
  },
};

export default async function Projects() {
  const projects = await getAllContentMetadata("project");
  const mostRecentUpdate = getMostRecentUpdate(projects);

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);

  return (
    <Main title="Projects" createdAt={new Date("2025-12-22")} updatedAt={mostRecentUpdate}>
      <JsonLd schema={breadcrumbs} />
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
        <GithubCTA />
      </Section>
    </Main>
  );
}
