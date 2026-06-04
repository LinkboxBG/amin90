import Link from "next/link";

/** Renders text with optional internal paths like `/pogrebenie/` → Link */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`?\/[a-z0-9-]+\/?`?)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^`?(\/[a-z0-9-]+)\/?`?$/);
        if (m) {
          const href = m[1].replace(/\/$/, "") || "/";
          return (
            <Link key={i} href={href} className="font-semibold text-navy-800 underline decoration-gold-500/60 hover:text-gold-700">
              {href}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default RichText;
