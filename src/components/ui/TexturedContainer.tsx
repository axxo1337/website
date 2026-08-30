import { cn } from "@/lib/client/utils";

export default function TexturedContainer({ children, className }: TexturedContainerProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>
      {children}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_12.5px_rgba(255,255,255,0.30)]" />
    </div>
  );
}

interface TexturedContainerProps {
  children: React.ReactNode;
  className?: string;
}
