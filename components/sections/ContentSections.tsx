import type { ContentSection } from "@/content/types";
import Container from "@/components/ui/Container";
import CallButton from "@/components/ui/CallButton";
import RichText from "./RichText";

function SectionTable({ table }: { table: NonNullable<ContentSection["table"]> }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-paper">
            {table.headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-navy-800">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-line">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-ink-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((sec, idx) => (
        <section key={idx} className={idx % 2 === 0 ? "section" : "section bg-paper"}>
          <Container>
            <h2 className="text-3xl text-navy-900">{sec.heading}</h2>
            {sec.paragraphs && sec.paragraphs.length > 0 && (
              <div className="mt-6 max-w-prose space-y-4 text-lg text-ink-700">
                {sec.paragraphs.map((p, pi) => (
                  <p key={pi}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            )}
            {sec.bullets && sec.bullets.length > 0 && (
              <ul className="mt-6 max-w-prose list-disc space-y-2 pl-6 text-lg text-ink-700">
                {sec.bullets.map((b, bi) => (
                  <li key={bi}>
                    <RichText text={b} />
                  </li>
                ))}
              </ul>
            )}
            {sec.table && <SectionTable table={sec.table} />}
            {sec.showPhoneCta && (
              <div className="mt-8">
                <CallButton />
              </div>
            )}
          </Container>
        </section>
      ))}
    </>
  );
}

export default ContentSections;
