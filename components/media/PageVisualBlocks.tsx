import { getPublicImage, getPublicImages } from "@/content/siteImages";
import type { VisualBlock } from "@/content/pageVisuals";
import ServiceImageBlock from "./ServiceImageBlock";
import ImageGallery from "./ImageGallery";
import TrustImageBlock from "./TrustImageBlock";
import CatalogGrid from "./CatalogGrid";
import CategoryVisualCards from "./CategoryVisualCards";

/**
 * Resolves registry image ids in a page's visual config and renders each block.
 * `lead` marks the first block as above-the-fold so its primary image gets
 * `priority` for LCP.
 */
export function PageVisualBlocks({
  blocks,
  lead = false,
}: {
  blocks?: VisualBlock[];
  lead?: boolean;
}) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => renderBlock(block, i, lead && i === 0))}
    </>
  );
}

function renderBlock(block: VisualBlock, index: number, priority: boolean) {
  const key = `${block.kind}-${index}`;

  switch (block.kind) {
    case "service": {
      const primary = getPublicImage(block.primaryId);
      if (!primary) return null;
      return (
        <ServiceImageBlock
          key={key}
          eyebrow={block.eyebrow}
          title={block.title}
          primary={primary}
          supporting={getPublicImages(block.supportingIds ?? [])}
          priority={priority}
        />
      );
    }
    case "gallery": {
      const images = getPublicImages(block.imageIds);
      if (!images.length) return null;
      return (
        <ImageGallery
          key={key}
          eyebrow={block.eyebrow}
          title={block.title}
          images={images}
          priority={priority}
        />
      );
    }
    case "trust": {
      const image = getPublicImage(block.imageId);
      if (!image) return null;
      return (
        <TrustImageBlock
          key={key}
          eyebrow={block.eyebrow}
          title={block.title}
          image={image}
          priority={priority}
        />
      );
    }
    case "monument-catalog":
      return <CatalogGrid key={key} eyebrow={block.eyebrow} title={block.title} />;
    case "service-cards": {
      const cards = block.cards.flatMap((card) => {
        const image = getPublicImage(card.imageId);
        return image ? [{ image, title: card.title, href: card.href }] : [];
      });
      if (!cards.length) return null;
      return (
        <CategoryVisualCards
          key={key}
          eyebrow={block.eyebrow}
          title={block.title}
          cards={cards}
          priority={priority}
        />
      );
    }
    default:
      return null;
  }
}

export default PageVisualBlocks;
