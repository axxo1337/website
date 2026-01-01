import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "References",
};

export default function References() {
  return (
    <Main title="References" createdAt={new Date(2025, 11, 22)} updatedAt={new Date(2026, 0, 1)}>
      <Section subtitle="What's this about?" title="Overview">
        <p className="md:text-lg">
          This page was originally named &quot;resources&quot;, but as{" "}
          <a href="https://github.com/grimy86" className="inline-anchor">
            grimy86
          </a>{" "}
          (a good lad) pointed out, it may mislead people into thinking I&apos;m affiliated to whatever I put here. So unless
          specified otherwise I&apos;m not. Anything I put here is purely to list helpful resources which I may or may not have
          used in my previous work. All that matters is that it&apos;s pedagogically useful.
        </p>
      </Section>
      <Section subtitle="Some advice and links" title="Material">
        <h3 className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 mb-2">Game Hacking</h3>
        <p>
          Game Hacking is a polymath field. If you intend to learn it then you should already be comfortable with C++, data
          structures, Windows Internals and Reverse Engineering. Below I will list resources for each of these sections.
        </p>
        <h4 className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2">C++</h4>
        <p>
          To learn C++ nowadays you&apos;re very well covered. Like many people, I cannot emphasize enough how good{" "}
          <a href="https://learncpp.com" className="inline-anchor">
            learncpp.com
          </a>{" "}
          is. Although since I know that many don&apos;t find reading for learning always very appealing, here&apos;s a couple
          of good YouTube content you should check out:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 my-1">
          <li>
            <a
              href="https://www.youtube.com/watch?v=18c3MTX0PK0&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb"
              className="inline-anchor"
            >
              The Cherno&apos;s C++ course
            </a>
            .
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=-TkoO8Z07hI" className="inline-anchor">
              Bro Code&apos;s video
            </a>
            . While it&apos;s a good introduction I doesn&apos;t seem to really go far through C++. I would still rely on other
            resources.
          </li>
        </ul>

        <h4 className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2">Data Structures</h4>
        <p>
          I&apos;m not saying you should be a crazy competitive coder, but just at least having some basic knowledge of
          algorithms and data structures is important. Data structures even more:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 my-1">
          <li>
            <a href="https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY" className="inline-anchor">
              MIT 6.006&apos;s Introduction to algorithms, Spring 2020
            </a>
            .
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Introduction_to_Algorithms" className="inline-anchor">
              Introduction to algorithms
            </a>{" "}
            (book).
          </li>
          <li>
            <a
              href="https://books.google.ca/books/about/Grokking_Algorithms.html?id=yzkzEAAAQBAJ&source=kp_book_description&redir_esc=y"
              className="inline-anchor"
            >
              Grokking Algorithms
            </a>
            .
          </li>
          <li>
            <a href="https://leetcode.com" className="inline-anchor">
              LeetCode
            </a>
            . This is less to learn and more to practice.
          </li>
        </ul>

        <h4 className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2">Windows Internals</h4>
        <p>
          Windows internals consists of learning, well, how Windows works. As of writing this I&apos;m working on my very own
          introduction to this subject, but until then resources are scarce:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 my-1">
          <li>
            <a href="https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals" className="inline-anchor">
              Windows Internals books
            </a>
            . This is an unavoidable series. After reading it I wouldn&apos;t say it&apos;s GREAT, but it being the only one of
            its kind it should be in your library.
          </li>
          <li>
            <a href="https://a.co/f8nmIgY" className="inline-anchor">
              Windows Kernel Programming, Second Edition
            </a>
            . An amazing book by one of the co-authors of the Windows Internals book series. You can clearly see that the bad
            parts of that series are not his fault by reading this great creation.
          </li>
          <li>
            <a href="https://www.vergiliusproject.com" className="inline-anchor">
              Vergilius Project
            </a>
            . A convenient database of present and past undocumented kernel structures from the Windows kernel.
          </li>
        </ul>

        <h4 className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2">Reverse Engineering</h4>
        <p>
          Reverse engineering is at the essence of game hacking. Firstly, you need all the beforementioned prerequisites. Then,
          you also want to be familiar with some assembly language. My recommendation is x86_64 Intel assembly. If you&apos;re
          working with desktop devices that&apos;s what you&apos;ll likely need. Overall, while this subject relies heavily on
          prerequisite theory, it&apos;s hard to really recommend resources for it as learning it is mostly done through
          practice. Here are some resources:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 my-1">
          <li>
            <a href="https://www.tutorialspoint.com/assembly_programming/index.htm" className="inline-anchor">
              Tutorials point assembly programming
            </a>
            . There aren&apos;t many existing resources to learn assembly. This one should at least get you through the
            fundamentals you need.
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Reversing:_Secrets_of_Reverse_Engineering" className="inline-anchor">
              Reversing: Secrets of Reverse Engineering
            </a>
            . An amazing book which got me started back in my younger days. Some of its contents are a little out of date, but I
            still think most of it is very relevant now and in the future.
          </li>
        </ul>
      </Section>
    </Main>
  );
}
