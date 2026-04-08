type LogoMarkProps = {
  className?: string;
  size?: number;
};

/** Brand mark: dark tile + flame (matches app header / favicon). */
export function LogoMark({ className = "", size = 28 }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="#0a0a0a" />
      <rect
        width="31"
        height="31"
        x="0.5"
        y="0.5"
        rx="8.5"
        stroke="rgba(168, 85, 247, 0.45)"
        strokeWidth="1"
      />
      <path
        fill="#f97316"
        d="M16 7.5s-2.8 3.2-2.8 6.4c0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4c0-3.2-2.8-6.4-2.8-6.4s-.9 2.2-.9 3.9c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-1.7-.9-3.9-.9-3.9Z"
      />
      <path
        fill="#fb923c"
        opacity={0.85}
        d="M14.2 14.2c-.4.6-.6 1.3-.6 2.1 0 1.9 1.5 3.4 3.4 3.4.5 0 1-.1 1.4-.3-.8-.5-1.4-1.4-1.4-2.5 0-.9.3-1.7.8-2.4-.6-.2-1.3-.3-2-.3-.5 0-1 .1-1.6.2Z"
      />
    </svg>
  );
}
