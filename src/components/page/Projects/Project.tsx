import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function Project({ title, description, createdAt, thumbnailPath, href }: ProjectProps) {
  return (
    <Link href={href} className="group">
      <article>
        <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-sm border-2 border-white/20 bg-black">
          {thumbnailPath ? (
            <Image
              src={thumbnailPath}
              fill={true}
              alt="thumnail"
              className="group-hover:scale-[102%] transition-transform duration-200 ease-in-out absolute"
            />
          ) : (
            <span className="absolute left-1/2 top-1/2 -translate-1/2 font-medium text-lg md:text-xl text-center px-4 w-full select-none text-white/50 group-hover:scale-[102%] transition-transform duration-200 ease-in-out">
              This project has no thumbnail yet.
            </span>
          )}
        </AspectRatio>
        <div className="my-2">
          <span className="text-2xl font-medium group-hover-underline">{title}</span>
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-0.5">
            <span>Created • {format(createdAt, "MM/dd/yyyy")}</span>
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
}
