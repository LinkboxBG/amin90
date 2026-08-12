"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/Icons";

export type LightboxImage = { src: string; alt: string };

const SWIPE_THRESHOLD_PX = 40;

/**
 * Интерим лайтбокс галерия (по спецификацията от promeni-08-26): thumbnail
 * решетка, при клик — модал с prev/next (стрелки, клавиши, swipe), затваряне
 * с X / Esc / клик извън изображението. Планирано е при бъдещата sitewide
 * lightbox задача този компонент да поеме и останалите галерии на сайта.
 */
export function LightboxGallery({
  images,
  className = "",
  thumbAspect = "aspect-[4/3]",
  thumbGridClass = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
}: {
  images: LightboxImage[];
  className?: string;
  thumbAspect?: string;
  thumbGridClass?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex === null, close, step]);

  if (!images.length) return null;
  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className={`${thumbGridClass} ${className}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Увеличи: ${img.alt}`}
            className={`group relative ${thumbAspect} w-full cursor-zoom-in overflow-hidden rounded-lg border border-line bg-paper transition-shadow hover:shadow-[var(--shadow-sm)] focus-visible:outline-2 focus-visible:outline-gold-500`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {current !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-navy-900/95"
            onClick={close}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (dx > SWIPE_THRESHOLD_PX) step(-1);
              else if (dx < -SWIPE_THRESHOLD_PX) step(1);
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Затвори"
              className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon className="size-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Предишна снимка"
                  className="absolute left-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
                >
                  <ChevronDownIcon className="size-6 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Следваща снимка"
                  className="absolute right-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
                >
                  <ChevronDownIcon className="size-6 -rotate-90" />
                </button>
              </>
            )}

            <figure
              className="relative h-[80vh] w-[92vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
              <figcaption className="absolute -bottom-8 left-0 right-0 text-center text-sm text-white/70">
                {current.alt}
                {images.length > 1 && ` · ${openIndex! + 1} / ${images.length}`}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}

export default LightboxGallery;
