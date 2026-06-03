import type { Step } from "@/content/types";
import SectionHeading from "./SectionHeading";

export function Steps({
  steps,
  title = "Как протича процесът",
  eyebrow = "Стъпка по стъпка",
}: {
  steps: Step[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 bg-white p-6">
              <span className="font-display text-4xl italic font-black text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg leading-snug">{step.title}</h3>
              {step.text && <p className="text-sm text-ink-500">{step.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Steps;
