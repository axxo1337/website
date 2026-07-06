import { TPostStatus } from "@/lib/client/types/post";
import { cn } from "@/lib/client/utils";

//
// [SECTION] Defines
//

const statusObjectMap = new Map<TPostStatus, { title: string; style: string }>([
  ["WIP", { title: "Work in progress", style: "border-yellow-500 bg-yellow-500/10 text-yellow-500" }],
  ["DRAFT", { title: "Draft (Not available in prod)", style: "border-red-500 bg-red-500/10 text-red-500" }],
]);

//
// [SECTION] Content
//

export default function PostStatusIndicator({ status }: PostStatusIndicatorProps) {
  if (status === "COMPLETE") return null;

  const statusObject = statusObjectMap.get(status);

  if (!statusObject) return null;

  return (
    <div className="mt-4">
      <span className={cn("px-2 py-1 border rounded-full text-xs", statusObject.style)}>{statusObject.title}</span>
    </div>
  );
}

//
// [SECTION] Types
//

interface PostStatusIndicatorProps {
  status: TPostStatus;
}
