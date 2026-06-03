import { LOGO_VIEWBOX, MARK_VIEWBOX, MARK_PATH, SUBTITLE_PATH } from "./logoPaths";

type LogoVariant = "on-dark" | "on-light" | "mono-white" | "mono-navy" | "gradient" | "wordmark";

const GOLD = "#baad7b";
const NAVY = "#141e3c";
const WHITE = "#ffffff";

function fills(variant: LogoVariant): { mark: string; subtitle: string; gradient?: boolean } {
  switch (variant) {
    case "on-dark":
      return { mark: GOLD, subtitle: WHITE };
    case "on-light":
      return { mark: GOLD, subtitle: NAVY };
    case "mono-white":
      return { mark: WHITE, subtitle: WHITE };
    case "mono-navy":
      return { mark: NAVY, subtitle: NAVY };
    case "gradient":
      return { mark: "url(#aminGold)", subtitle: WHITE, gradient: true };
    case "wordmark":
      return { mark: GOLD, subtitle: GOLD };
  }
}

type LogoProps = {
  variant?: LogoVariant;
  /** wordmark = само марката „АМИН" без подзаглавието (за компактен mobile header) */
  wordmark?: boolean;
  className?: string;
  title?: string;
};

/**
 * Лого на Погребална агенция АМИН — inline SVG (единствен източник на пътищата).
 * Подзаглавие винаги „Траурна агенция". alt/aria: „Погребална агенция АМИН".
 */
export function Logo({
  variant = "on-dark",
  wordmark = false,
  className,
  title = "Погребална агенция АМИН",
}: LogoProps) {
  const f = fills(wordmark ? "wordmark" : variant);
  const showSubtitle = !wordmark;

  return (
    <svg
      viewBox={showSubtitle ? LOGO_VIEWBOX : MARK_VIEWBOX}
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {f.gradient && (
        <defs>
          <linearGradient id="aminGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ddd4b4" />
            <stop offset="50%" stopColor="#baad7b" />
            <stop offset="100%" stopColor="#8f8253" />
          </linearGradient>
        </defs>
      )}
      <path transform="translate(-4,-20)" d={MARK_PATH} fill={f.mark} />
      {showSubtitle && <path d={SUBTITLE_PATH} fill={f.subtitle} />}
    </svg>
  );
}

export default Logo;
