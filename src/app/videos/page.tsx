import Main from "@/components/layout/Main";

export default function Videos() {
  return (
    <Main
      title="Videos"
      createdAt={new Date(2025, 12, 22)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <div className="my-12">
        <span className="text-4xl font-semibold">Coming soon...</span>
      </div>
    </Main>
  );
}
