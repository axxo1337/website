import { formatUTC } from "@/lib/client/utils";

//
// [SECTION] Content
//

export default function Main({ title, createdAt, updatedAt, readingTime, children }: MainProps) {
  return (
    <main className="mt-8 md:mt-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
        <div className="text-sm md:text-base flex flex-wrap gap-5 gap-y-1 items-center text-white/75 mt-1">
          <span>
            Created •{" "}
            <time dateTime={createdAt.toISOString()}>
              {formatUTC(createdAt)}
            </time>
          </span>
          <span>
            Last updated •{" "}
            <time dateTime={updatedAt.toISOString()}>
              {formatUTC(updatedAt)}
            </time>
          </span>
          {readingTime && (
            <span>
              Reading time • {readingTime}
            </span>
          )}
        </div>
      </div>
      {children}
    </main>
  );
}

//
// [SECTION] Types
//

interface MainProps {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  readingTime?: string;
  children: React.ReactNode;
}

