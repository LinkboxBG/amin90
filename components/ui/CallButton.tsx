import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

type Props = {
  variant?: "primary" | "outline";
  label?: string;
  withNumber?: boolean;
  className?: string;
};

/** Основен CTA на секция = телефонно обаждане (бранд правило). */
export function CallButton({
  variant = "primary",
  label = "Обади се",
  withNumber = true,
  className = "",
}: Props) {
  return (
    <a
      href={`tel:${site.primaryPhone}`}
      className={`btn btn-${variant} ${className}`}
      aria-label={`Обади се на ${site.primaryPhoneDisplay}`}
    >
      <PhoneIcon className="size-[1.1em]" />
      <span>
        {label}
        {withNumber ? ` – ${site.primaryPhoneDisplay}` : ""}
      </span>
    </a>
  );
}

export default CallButton;
