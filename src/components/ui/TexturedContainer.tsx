import { cn } from "@/lib/client/utils";

export default function TexturedContainer({ children, className }: TexturedContainerProps) {
  return (
    <div
      className={cn(
        "[--textured-container-rounded:var(--radius-md)] relative overflow-hidden rounded-(--textured-container-rounded)",
        className,
      )}
    >
      {children}
      <div className="rounded-[calc(var(--textured-container-rounded)-2px)] pointer-events-none absolute inset-0 shadow-[inset_0_0_12.5px_rgba(255,255,255,0.30)] z-20" />
    </div>
  );
}

interface TexturedContainerProps {
  children: React.ReactNode;
  className?: string;
}
