interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

export function IconKeystone({ color = "currentColor", size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 38V22" stroke={color} strokeWidth="1.5" />
      <path d="M40 38V22" stroke={color} strokeWidth="1.5" />
      <path d="M8 22C8 22 24 6 40 22" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <rect x="21" y="10" width="6" height="5" fill={color} />
      <path d="M8 38H40" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function Wordmark({ accent, color = "#FAFAFA", scale = 1 }: { accent: string; color?: string; scale?: number }) {
  return (
    <span
      style={{
        fontFamily: '"Barlow", sans-serif',
        fontWeight: 700,
        fontSize: `${scale * 28}px`,
        letterSpacing: "0.18em",
        color,
        lineHeight: 1,
      }}
    >
      ARCH<span style={{ color: accent }}>EX</span>
    </span>
  );
}
