export default function Section({ subtitle, title, children }: Section) {
  return (
    <section className="mt-12 md:mt-14">
      <div className="flex flex-col md:gap-1.5 mb-4 md:mb-6">
        <span className="text-xl md:text-2xl text-white/70">{subtitle}</span>
        <h2 className="text-3xl md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

interface Section {
  subtitle: string;
  title: string;
  children?: React.ReactNode;
}
