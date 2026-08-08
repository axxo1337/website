import { ArrowRight, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GithubRepo({ link }: GithubRepoProps) {
  const indexOfRepo = link.lastIndexOf("/") + 1;
  const repo = link.substring(indexOfRepo, link.length);
  const remainingString = link.substring(0, indexOfRepo - 1);
  const owner = remainingString.substring(remainingString.lastIndexOf("/", indexOfRepo) + 1, indexOfRepo - 1);

  return (
    <Link href={link} className="rounded-lg my-4 border border-white/20 p-3 justify-between blured-bg flex items-center group">
      <div className="flex items-center gap-3">
        <Image alt="Github Logo" src="/images/socials/github.png" className="size-6 md:size-8" width={32} height={32} />
        <div className="flex flex-col">
          <span className="font-medium">{repo}</span>
          <span className="text-xs text-white/80">{owner}</span>
        </div>
      </div>
      <span className="inline-anchor text-sm flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-all duration-250 ease-in-out">
        Click to open <ArrowRight size={20} />
      </span>
    </Link>
  );
}

interface GithubRepoProps {
  link: string;
}
