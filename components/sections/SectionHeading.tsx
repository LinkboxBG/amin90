type Props = {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, className = "", align = "left" }: Props) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl leading-tight">{title}</h2>
      <hr className={`gold-divider mt-5 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}

export default SectionHeading;
