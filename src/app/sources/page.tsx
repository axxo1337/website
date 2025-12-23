import Main from "@/components/layout/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources",
};

export default function Sources() {
  return (
    <Main
      title="Sources"
      createdAt={new Date(2025, 12, 22)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <div className="my-12">
        <span className="text-4xl font-semibold">Coming soon...</span>
      </div>
    </Main>
  );
}
