import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";

export default function LicensePage() {
  return (
    <Main title="License" createdAt={new Date(2025, 5, 21)} updatedAt={new Date(2026, 5, 21)}>
      <Section title="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <p>Copyright (C) 2026 axxo1337</p>

          <p>
            This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To
            view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative
            Commons, PO Box 1866, Mountain View, CA 94042, USA.
          </p>

          <hr />

          <p>BY-NC-SA 4.0 Core Terms Summary (Not a substitute for the full legal code):</p>

          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <p>
                Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were
                made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your
                use.
              </p>
            </li>

            <li>
              <p>NonCommercial — You may not use the material for commercial purposes.</p>
            </li>

            <li>
              <p>
                ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under
                the same license as the original.
              </p>
            </li>
          </ol>

          <p>
            No additional restrictions — You may not apply legal terms or technological measures that legally restrict others
            from doing anything the license permits.
          </p>
        </div>
      </Section>
    </Main>
  );
}
