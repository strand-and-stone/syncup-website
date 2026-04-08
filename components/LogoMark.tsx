import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  size?: number;
};

/** Navbar mark — same asset as `/icon.svg` (favicon). */
export function LogoMark({ className = "", size = 28 }: LogoMarkProps) {
  return (
    <Image
      src="/icon.svg"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      aria-hidden
    />
  );
}
