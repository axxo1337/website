import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="h-[calc(100dvh-184px-56px)] sm:h-[calc(100dvh-140px-56px)] flex flex-col gap-8 items-center justify-center">
      <h1 className="text-5xl md:text-7xl font-semibold">Not Found</h1>
      <p className="text-center max-w-lg">
        It doesn&apos;t seem like I could find what you&apos;re looking for... Perhaps the page was removed? Anyways, you can go
        back home using{" "}
        <Link href="/" className="inline-anchor">
          this link
        </Link>
        .
      </p>
    </main>
  );
}
