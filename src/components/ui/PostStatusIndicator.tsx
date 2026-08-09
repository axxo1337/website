import { TPostStatus } from "@/lib/client/types/post";
import { cn, postStatusObjectMap } from "@/lib/client/utils";

//
// [SECTION] Content
//

export default function PostStatusIndicator({ status }: PostStatusIndicatorProps) {
  if (status === "COMPLETE") return null;

  const statusObject = postStatusObjectMap.get(status);

  if (!statusObject) return null;

  return (
    <div className="mt-4">
      <span
        className={cn(
          "px-2 py-1 border rounded-full text-xs backdrop-brightness-35",
          statusObject.containerClassName,
          statusObject.spanClassName,
        )}
      >
        {statusObject.text}
      </span>
    </div>
  );
}

//
// [SECTION] Types
//

interface PostStatusIndicatorProps {
  status: TPostStatus;
}
