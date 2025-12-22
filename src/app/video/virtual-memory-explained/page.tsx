"use client";

import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import YouTubeVideo from "@/components/page/Video/YouTubeVideo";

export default function VirtualMemoryExplained() {
  return (
    <Main
      title="Virtual Memory Explained"
      createdAt={new Date(2025, 12, 22)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <YouTubeVideo id="ultz9m0n0GE" />
      <Section subtitle="What's this video about?" title="Overview">
        <span>Coming soon...</span>
      </Section>
    </Main>
  );
}
