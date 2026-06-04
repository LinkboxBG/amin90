import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import SiteImage from "./SiteImage";
import type { SiteImage as SiteImageData } from "@/content/siteImages";

type Props = {
  title: string;
  eyebrow?: string;
  images: SiteImageData[];
  priority?: boolean;
};

/** Responsive grid gallery built from registry images. */
export function ImageGallery({ title, eyebrow = "Снимки", images, priority }: Props) {
  if (!images.length) return null;

  return (
    <section className="section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <SiteImage
              key={image.id}
              image={image}
              aspect="landscape"
              priority={priority && i === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ImageGallery;
