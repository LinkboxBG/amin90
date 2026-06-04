import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import SiteImage from "./SiteImage";
import type { SiteImage as SiteImageData } from "@/content/siteImages";

type Props = {
  eyebrow?: string;
  title?: string;
  primary: SiteImageData;
  supporting?: SiteImageData[];
  priority?: boolean;
};

/**
 * One dominant image plus a small row of supporting thumbnails. Used as
 * illustrative/trust proof on service and product pages (not a product catalog).
 */
export function ServiceImageBlock({
  eyebrow,
  title,
  primary,
  supporting = [],
  priority,
}: Props) {
  return (
    <section className="section">
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} />}
        <div className={`grid gap-4 lg:grid-cols-12 ${title ? "mt-10" : ""}`}>
          <div className="lg:col-span-8">
            <SiteImage
              image={primary}
              aspect="landscape"
              priority={priority}
              sizes="(min-width: 1024px) 62vw, 100vw"
            />
          </div>
          {supporting.length > 0 && (
            <div className="grid grid-cols-3 gap-4 lg:col-span-4 lg:grid-cols-2 lg:content-start">
              {supporting.map((image) => (
                <SiteImage
                  key={image.id}
                  image={image}
                  aspect="landscape"
                  sizes="(min-width: 1024px) 20vw, 30vw"
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default ServiceImageBlock;
