import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import SiteImage from "./SiteImage";
import type { SiteImage as SiteImageData } from "@/content/siteImages";

type Props = {
  eyebrow?: string;
  title?: string;
  image: SiteImageData;
  priority?: boolean;
};

/** A single contained trust/context image with an optional heading. */
export function TrustImageBlock({ eyebrow, title, image, priority }: Props) {
  return (
    <section className="section">
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} />}
        <div className={`max-w-3xl ${title ? "mt-8" : ""}`}>
          <SiteImage
            image={image}
            aspect="landscape"
            priority={priority}
            sizes="(min-width: 1024px) 768px, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}

export default TrustImageBlock;
