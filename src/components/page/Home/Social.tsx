import Image from "next/image";
import Link from "next/link";

export default function Social({ href, iconPath, title }: Social) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 border border-white/20 hover:border-white transition-colors rounded-full py-2 px-4"
      >
        <Image
          src={iconPath}
          className="size-6 md:size-8"
          width={32}
          height={32}
          alt={title}
        />
        <span className="font-medium text-lg md:text-xl">{title}</span>
      </Link>
    </li>
  );
}

interface Social {
  href: string;
  iconPath: string;
  title: string;
}
