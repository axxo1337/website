import { Lightbulb, LucideProps, OctagonAlert, TriangleAlert } from "lucide-react";
import TexturedContainer from "./TexturedContainer";
import { cn } from "@/lib/client/utils";

const calloutObjectMap: Record<string, { Icon: React.ComponentType<LucideProps>, iconColor: string, containerClassName: string | null}> = {
  info: { Icon: Lightbulb, iconColor: "#FFF", containerClassName: null },
  warning: { Icon: TriangleAlert, iconColor: "#FBDD31", containerClassName: "bg-[#FBDD31]/20" },
  danger: { Icon: OctagonAlert, iconColor: "#FB3131", containerClassName: "bg-[#FB3131]/20" },
};

export default function Callout({ children, type = "info" }: CalloutProps) {
  const { Icon, iconColor, containerClassName } = calloutObjectMap[type];

  return (
    <TexturedContainer className={cn("my-4 p-3.5 py-4.5 flex gap-2 items-start", containerClassName)}>
      <Icon style={{ color: iconColor }} className="shrink-0" size={20} />
      <p className="leading-4.5">
        {children}
      </p>
    </TexturedContainer>
  );
}

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "danger";
}
