import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { Metadata } from "next";

//
// [SECTION] Defines
//

export const metadata: Metadata = {
  title: "Videos",
};

//
// [SECTION] Content
//

export default function Videos() {
  return (
    <Main
      title="Videos"
      createdAt={new Date(2025, 12, 22)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <Section title="Library">
        <p className="md:text-lg">
          This page doesn&apos;t list ALL of my videos, but you can find some of
          my most recent here. Clicking any of them will direct you to another
          page dedicated to directing you to the actual video, but also to
          providing an overview of its contents through some sort of blog post.
        </p>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="grid grid-cols-2">
          <span>Coming soon...</span>
        </div>
      </Section>
    </Main>
  );
}
