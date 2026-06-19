interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

/** Structural keystone — architecture boundary symbol */
export function IconKeystone({ color = "currentColor", size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 38V22" stroke={color} strokeWidth="1.25" />
      <path d="M40 38V22" stroke={color} strokeWidth="1.25" />
      <path d="M8 22C8 22 24 6 40 22" stroke={color} strokeWidth="1.25" strokeLinecap="square" />
      <rect x="21" y="10" width="6" height="5" fill={color} />
      <path d="M8 38H40" stroke={color} strokeWidth="1.25" />
    </svg>
  );
}

export function Wordmark({ accent, color = "#F5F7FA", scale = 1 }: { accent: string; color?: string; scale?: number }) {
  return (
    <span
      style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 600,
        fontSize: `${scale * 26}px`,
        letterSpacing: "0.22em",
        color,
        lineHeight: 1,
      }}
    >
      ARCH<span style={{ color: accent }}>EX</span>
    </span>
  );
}

/** Devs-inspired halo mark — system boundary */
export function HaloMark({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="60" cy="60" r="54" stroke="rgba(214,179,106,0.35)" strokeWidth="1" />
      <circle cx="60" cy="60" r="38" stroke="rgba(214,179,106,0.15)" strokeWidth="1" />
      <circle cx="60" cy="60" r="22" stroke="rgba(240,215,161,0.08)" strokeWidth="1" />
    </svg>
  );
}
