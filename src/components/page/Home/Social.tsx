import Image from "next/image";
import Link from "next/link";

export default function Social({ href, iconPath, title }: Social) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center group gap-2 border border-white/20 hover:border-white duration-250 transition-colors rounded-full py-2 px-4 blured-bg"
      >
        <Image
          src={iconPath}
          className="size-6 md:size-8 group-hover:brightness-85 duration-250 transition-all"
          width={32}
          height={32}
          alt={title}
        />
        <span className="font-medium text-lg md:text-xl group-hover:text-white/80 transition-colors duration-250 group-hover-underline">
          {title}
        </span>
      </Link>
    </li>
  );
}

interface Social {
  href: string;
  iconPath: string;
  title: string;
}
