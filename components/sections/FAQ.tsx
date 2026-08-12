"use client";

import { useState } from "react";
import type { FAQItem } from "@/content/types";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function FAQ({
  items,
  title = "Често задавани въпроси",
  eyebrow = "ЧЗВ",
}: {
  items: FAQItem[];
  title?: string;
  eyebrow?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container-narrow">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`flex w-full items-center justify-between gap-4 py-5 text-left font-body text-base font-semibold not-italic transition-colors hover:text-gold-700 ${
                      isOpen ? "text-gold-700" : "text-ink-900"
                    }`}
                  >
                    {item.q}
                    <ChevronDownIcon
                      className={`size-5 shrink-0 text-gold-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 text-ink-700"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
