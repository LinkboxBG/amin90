import Link from "next/link";
import type { ContentSection, SectionPrice } from "@/content/types";
import { getPublicImages } from "@/content/siteImages";
import Container from "@/components/ui/Container";
import CallButton from "@/components/ui/CallButton";
import SiteImage from "@/components/media/SiteImage";
import LightboxGallery from "@/components/media/Lightbox";
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

/** Ценови chip до заглавието на секцията. */
function PriceChip({ value }: { value: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-gold-500 bg-gold-500/10 px-4 py-1.5 font-body text-base font-semibold not-italic text-gold-700">
      {value}
    </span>
  );
}

/** Компактен ценови списък — заменя суровите таблици в продуктовите секции. */
function PriceList({ price }: { price: Extract<SectionPrice, { kind: "list" }> }) {
  return (
    <div className="mt-6 max-w-prose overflow-hidden rounded-lg border border-line bg-white">
      <ul className="divide-y divide-line">
        {price.items.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-6 px-5 py-3"
          >
            <span className="text-ink-700">{item.label}</span>
            <span className="shrink-0 font-semibold text-navy-900">{item.value}</span>
          </li>
        ))}
      </ul>
      {price.note && (
        <p className="border-t border-line bg-paper px-5 py-3 text-sm text-ink-500">
          {price.note}
        </p>
      )}
    </div>
  );
}

function SectionButtonLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("tel:") || href.startsWith("http");
  const className =
    "inline-flex items-center rounded-full border border-navy-800 px-5 py-2.5 font-body text-sm font-semibold not-italic text-navy-800 transition-colors hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-700";
  return external ? (
    <a href={href} className={className}>
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function SectionImages({ section }: { section: ContentSection }) {
  const images = getPublicImages(section.imageIds ?? []);
  if (!images.length) return null;

  if (section.lightbox) {
    return (
      <div className="mt-8">
        <LightboxGallery images={images.map((i) => ({ src: i.src, alt: i.alt }))} />
      </div>
    );
  }
  if (images.length === 1) {
    return (
      <figure className="mt-8 max-w-xl">
        <SiteImage image={images[0]} sizes="(min-width: 1024px) 36rem, 100vw" />
        <figcaption className="mt-2 text-sm text-ink-500">{images[0].alt}</figcaption>
      </figure>
    );
  }
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
      {images.map((image) => (
        <SiteImage
          key={image.id}
          image={image}
          sizes="(min-width: 1024px) 33vw, 50vw"
        />
      ))}
    </div>
  );
}

/** Карти на продуктови модели (напр. кръстове: снимка, цветове, размер, цена). */
function ModelCards({ models }: { models: NonNullable<ContentSection["models"]> }) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => {
        const [image] = getPublicImages([model.imageId]);
        return (
          <div
            key={model.name}
            className="overflow-hidden rounded-lg border border-line bg-white shadow-[var(--shadow-sm)]"
          >
            {image && (
              <LightboxGallery
                images={[{ src: image.src, alt: image.alt }]}
                thumbGridClass="grid grid-cols-1"
                thumbAspect="aspect-[4/3]"
              />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-navy-900">{model.name}</h3>
                <PriceChip value={model.price} />
              </div>
              <dl className="mt-3 space-y-1.5 text-sm text-ink-700">
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-navy-800">Размер:</dt>
                  <dd>{model.size}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-navy-800">Цветове:</dt>
                  <dd>{model.colors.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  // Каталожните решетки се рендерират от ProductCards преди текстовите секции.
  const rendered = sections.filter((sec) => !sec.catalogBoxes?.length);

  return (
    <>
      {rendered.map((sec, idx) => (
        <section
          key={sec.heading}
          id={sec.id}
          className={`${idx % 2 === 0 ? "section" : "section bg-paper"} ${
            sec.id ? "scroll-mt-24" : ""
          }`}
        >
          <Container>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl text-navy-900">{sec.heading}</h2>
              {sec.price?.kind === "single" && <PriceChip value={sec.price.value} />}
            </div>
            {sec.price?.kind === "single" && sec.price.note && (
              <p className="mt-2 text-sm text-ink-500">{sec.price.note}</p>
            )}
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
              sec.numbered ? (
                <ol className="mt-6 max-w-prose list-decimal space-y-2 pl-6 text-lg text-ink-700">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="mt-6 max-w-prose list-disc space-y-2 pl-6 text-lg text-ink-700">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ul>
              )
            )}
            <SectionImages section={sec} />
            {sec.models && sec.models.length > 0 && <ModelCards models={sec.models} />}
            {sec.price?.kind === "list" && <PriceList price={sec.price} />}
            {sec.table && <SectionTable table={sec.table} />}
            {(sec.button || sec.showPhoneCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {sec.showPhoneCta && <CallButton />}
                {sec.button && (
                  <SectionButtonLink label={sec.button.label} href={sec.button.href} />
                )}
              </div>
            )}
          </Container>
        </section>
      ))}
    </>
  );
}

export default ContentSections;
