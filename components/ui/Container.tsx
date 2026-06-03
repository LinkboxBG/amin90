import type { ReactNode } from "react";

export function Container({
  children,
  narrow = false,
  className = "",
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={`${narrow ? "container-narrow" : "container-page"} ${className}`}>
      {children}
    </div>
  );
}

export default Container;
