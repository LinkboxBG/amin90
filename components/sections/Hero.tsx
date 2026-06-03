import Link from "next/link";
import CallButton from "@/components/ui/CallButton";
import { ArrowRightIcon } from "@/components/ui/Icons";
import Logo from "@/components/brand/Logo";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  text?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showLogo?: boolean;
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  text,
  secondaryHref = "/traurni-uslugi",
  secondaryLabel = "Виж услугите",
  showLogo = false,
}: Props) {
  return (
    <section className="ds brand-canvas">
      <div className="container-page relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl fade-up">
          {showLogo && <Logo variant="mono-white" className="mb-8 h-16 w-auto md:h-20" />}
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-balance text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && (
            <p className="mt-5 font-display text-xl italic text-gold-400 md:text-2xl">{subtitle}</p>
          )}
          {text && <p className="mt-6 max-w-2xl text-lg text-on-dark-muted">{text}</p>}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CallButton />
            <Link href={secondaryHref} className="btn btn-outline">
              {secondaryLabel}
              <ArrowRightIcon className="size-[1.1em]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
