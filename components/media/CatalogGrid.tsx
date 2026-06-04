import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import CatalogCard from "./CatalogCard";
import {
  monumentCatalog,
  monumentGroups,
  type MonumentItem,
  type MonumentGroup,
} from "@/content/catalog/monuments";

type Props = {
  eyebrow?: string;
  title?: string;
  items?: MonumentItem[];
  groups?: MonumentGroup[];
};

/** Catalog of monument models, grouped into visual categories. */
export function CatalogGrid({
  eyebrow = "Каталог",
  title = "Каталог с модели паметници",
  items = monumentCatalog,
  groups = monumentGroups,
}: Props) {
  if (!items.length) return null;

  return (
    <section className="section bg-paper">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-12">
          {groups.map((group) => {
            const groupItems = items.filter((item) => item.group === group);
            if (!groupItems.length) return null;
            return (
              <div key={group}>
                <h3 className="text-xl font-semibold text-navy-900">{group}</h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {groupItems.map((item) => (
                    <CatalogCard key={item.image.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default CatalogGrid;
