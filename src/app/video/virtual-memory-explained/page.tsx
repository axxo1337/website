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
        <p>
          Nowadays it&apos;s not uncommon for computers to be running hundreds
          of processes at a time. By this fact two major concerns arize:
          security and resource management. On one hand each application should
          be mostly isolated one from another. You wouldn&apos;t want{" "}
          <a className="inline-anchor">Notion</a> to be spying on what your{" "}
          <a className="inline-anchor">Chrome</a> browser open tabs are. And on
          the other you might be running these applications on an old laptop
          which doesn&apos;t have enough RAM to handle all of them at once.
        </p>
        <br />
        <p>
          These are the problems virtual memory solves. And that&apos;s what
          this video explains. I recommend you first give it a watch and come
          back here afterwards to read my written explanation. Although note
          that I&apos;ve made some very slight mistakes here and there in said
          video. Thankfully these were all clarified in a comment I made and
          pinned in the comments section of said video.
        </p>
        <br />
        <p>
          Just for good measure I&apos;ll correct them here as well, but feel
          free to skip this list and watch the video, or maybe simply get on
          with the first chapter of this document:
        </p>
        <br />
        <ol className="document-decimal-list">
          <li>
            I misspelled the Level 4 Page Map Table as &quot;PLM4&quot; instead
            of PML4 throughout the video.
          </li>
          <li>
            At{" "}
            <a
              className="inline-anchor"
              href="https://youtube.com/watch?v=ultz9m0n0GE&t=375s&pp=0gcJCTAAlc8ueATH"
            >
              6:15
            </a>{" "}
            I wrote 412 by accident. The number should be 512.
          </li>
          <li>
            I realized just now that my illustration of page sizes might have
            been confusing. Regular pages are of 4KB which is 4096 bytes. Not
            4096KB (just to be crystal clear)
          </li>
          <li>
            The table entries contain a bit called the &quot;present&quot; bit
            (the rightmost bit). It&apos;s called that because as long as it is
            1 it means the page is in memory. As soon as it is 0 it means the
            page is on disk, and when it is on disk the bits used for the
            physical page index are used to locate the page on disk instead.
          </li>
        </ol>
        <h3 className="text-2xl first:mt-0 mt-6 mb-3.5 font-semibold">
          What is memory?
        </h3>

        <span>Work in progres..</span>

        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Memory paging
        </h3>
        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Memory tables
        </h3>
        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Virtual address
        </h3>
        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Identity mapping
        </h3>
        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Translation look-aside buffer
        </h3>
        <h3 className="text-2xl first:mt-0 mt-6 mb-4 font-semibold">
          Why use all these tables?
        </h3>
      </Section>
    </Main>
  );
}
