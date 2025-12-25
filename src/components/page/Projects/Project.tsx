import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function Project({
  title,
  description,
  createdAt,
  thumbnailPath,
  href,
}: ProjectProps) {
  return (
    <Link href={href} className="group">
      <article>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={thumbnailPath}
            fill={true}
            alt="thumnail"
            className="rounded-sm border-2 border-white/20 object-cover"
          />
        </AspectRatio>
        <div className="my-2">
          <span className="text-2xl font-medium group-hover:underline">
            {title}
          </span>
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-0.5">
            <span>Created • {format(createdAt, "MM/dd/yyyy")}</span>
          </div>
        </div>
        <p className="text-white/75">{description}</p>
      </article>
    </Link>
  );
}

interface ProjectProps {
  title: string;
  description: string;
  createdAt: Date;
  thumbnailPath: string;
  href: string;
}
