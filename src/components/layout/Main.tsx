import { format } from "date-fns";

export default function Main({ title, createdAt, updatedAt, children }: Main) {
  return (
    <main className="mt-8 md:mt-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
        <div className="text-sm md:text-base flex flex-wrap gap-5 gap-y-1 items-center font-medium text-white/75 mt-1">
          <span>
            Created •{" "}
            <time dateTime={createdAt.toISOString()}>
              {format(createdAt, "MM/dd/yyyy")}
            </time>
          </span>
          <span>
            Last updated •{" "}
            <time dateTime={updatedAt.toISOString()}>
              {format(updatedAt, "MM/dd/yyyy")}
            </time>
          </span>
        </div>
      </div>
      {children}
    </main>
  );
}

interface Main {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  children: React.ReactNode;
}
