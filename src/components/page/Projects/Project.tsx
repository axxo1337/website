import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TPostStatus } from "@/lib/client/types/post";
import { formatUTC } from "@/lib/client/utils";
import Image from "next/image";
import Link from "next/link";

export default function Project({ title, description, createdAt, thumbnailPath, href, status }: ProjectProps) {
  return (
    <Link href={href} className="group">
      <article>
        <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-sm border-2 border-white/20 bg-black">
          {thumbnailPath ? (
            <Image
              src={thumbnailPath}
              fill={true}
              alt="thumnail"
              className="group-hover:scale-[102%] transition-all group-hover:blur-sm blur-none duration-200 ease-in-out absolute"
            />
          ) : (
            <span className="absolute left-1/2 top-1/2 -translate-1/2 font-medium text-lg md:text-xl text-center px-4 w-full select-none text-white/50 group-hover:scale-[102%] transition-all duration-200 ease-in-out opacity-100 group-hover:opacity-0">
              This project has no thumbnail yet.
            </span>
          )}

          {status === "WIP" && (
            <div className="absolute top-0 left-0 bg-yellow-500/20 px-2 py-1 rounded-br-md flex justify-between items-center border-r border-b border-yellow-500 group-hover:opacity-0 opacity-100 transition-opacity">
              <span className="text-sm text-yellow-500">Work in progress</span>
            </div>
          )}

          <span className="absolute left-1/2 top-1/2 -translate-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-center text-xl font-bold underline">
            Click to open
          </span>
        </AspectRatio>
        <div className="my-2">
          <span className="text-2xl font-medium group-hover-underline">{title}</span>
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-0.5">
            <span>Created • {formatUTC(createdAt)}</span>
          </div>
        </div>
        <p className="text-white/75 line-clamp-2">{description}</p>
      </article>
    </Link>
  );
}

interface ProjectProps {
  title: string;
  description: string;
  createdAt: Date;
  thumbnailPath?: string | null;
  href: string;
  status: TPostStatus;
}
