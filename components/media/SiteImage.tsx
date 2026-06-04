import Image from "next/image";
import type { SiteImage as SiteImageData, ImageAspect } from "@/content/siteImages";

const ASPECT_CLASS: Record<ImageAspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

type Props = {
  image: SiteImageData;
  aspect?: ImageAspect;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
};

/**
 * next/image wrapper with a fixed aspect-ratio container to prevent layout
 * shift. Uses `fill` so callers never need correct intrinsic dimensions.
 */
export function SiteImage({
  image,
  aspect,
  sizes = "100vw",
  priority,
  rounded = true,
  className = "",
}: Props) {
  const ratio = ASPECT_CLASS[aspect ?? image.aspect ?? "landscape"];
  return (
    <div
      className={`relative w-full overflow-hidden border border-line bg-paper ${ratio} ${
        rounded ? "rounded-lg" : ""
      } ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority ?? false}
        className="object-cover"
      />
    </div>
  );
}

export default SiteImage;
