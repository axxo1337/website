import Main from "@/components/layout/Main";

export default function Login() {
  return (
    <Main
      title="Login"
      createdAt={new Date("2026-11-15")}
      updatedAt={new Date("2026-11-15")}
    >
      <h2 className="text-2xl mt-2">Look at this moron!</h2>
      <p className="mt-2">THIS IS A STATIC WEBSITE YOU TROGLODYTE</p>
      <img alt="Idiot" src="/images/idiot.gif" className="mt-2" />
      <p className="mt-2">
        You and your LLM harvest aren&apos;t going to find a thing 😂
      </p>
      <img alt="Idiot" src="/images/you_stupid.png" className="mt-2" />
    </Main>
  );
}
