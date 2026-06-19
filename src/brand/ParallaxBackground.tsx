import { useEffect, useRef, useCallback } from "react";

const LAYERS = [
  { id: "sky", speed: 0.04, depth: 0 },
  { id: "far", speed: 0.1, depth: 1 },
  { id: "mid", speed: 0.22, depth: 2 },
  { id: "near", speed: 0.38, depth: 3 },
] as const;

function MountainFar() {
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="archex-mountain-svg" aria-hidden>
      <defs>
        <linearGradient id="ax-far-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121722" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06070a" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polygon fill="url(#ax-far-fill)" points="0,420 0,280 180,180 320,240 480,120 640,200 820,90 980,170 1140,60 1280,140 1440,80 1440,420" />
      <polyline fill="none" stroke="rgba(214,179,106,0.12)" strokeWidth="1" points="180,180 320,240 480,120 640,200 820,90 980,170 1140,60 1280,140" />
    </svg>
  );
}

function MountainMid() {
  return (
    <svg viewBox="0 0 1440 520" preserveAspectRatio="none" className="archex-mountain-svg" aria-hidden>
      <defs>
        <linearGradient id="ax-mid-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1016" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#06070a" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polygon fill="url(#ax-mid-fill)" points="0,520 0,340 240,220 420,300 580,160 720,260 900,140 1080,240 1240,180 1440,280 1440,520" />
      <polyline fill="none" stroke="rgba(214,179,106,0.18)" strokeWidth="1.25" points="240,220 420,300 580,160 720,260 900,140 1080,240 1240,180" />
      {/* Structural facets — Koenigsegg exposed geometry */}
      <line x1="580" y1="160" x2="650" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="900" y1="140" x2="960" y2="240" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    </svg>
  );
}

function MountainNear() {
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="none" className="archex-mountain-svg archex-mountain-near" aria-hidden>
      <defs>
        <linearGradient id="ax-near-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121722" />
          <stop offset="55%" stopColor="#0a0c12" />
          <stop offset="100%" stopColor="#06070a" />
        </linearGradient>
        <linearGradient id="ax-near-ridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(214,179,106,0)" />
          <stop offset="50%" stopColor="rgba(214,179,106,0.35)" />
          <stop offset="100%" stopColor="rgba(214,179,106,0)" />
        </linearGradient>
      </defs>
      <polygon fill="url(#ax-near-fill)" points="0,640 0,420 360,280 520,380 720,200 920,360 1080,260 1440,400 1440,640" />
      <polyline fill="none" stroke="url(#ax-near-ridge)" strokeWidth="1.5" points="360,280 520,380 720,200 920,360 1080,260" />
      <polygon fill="rgba(214,179,106,0.04)" points="720,200 780,320 660,320" />
      <polygon fill="rgba(214,179,106,0.03)" points="520,380 580,480 460,480" />
    </svg>
  );
}

function SkyGrid() {
  return (
    <div className="archex-parallax-sky">
      <div className="archex-parallax-grid" />
      <div className="archex-parallax-horizon" />
    </div>
  );
}

export default function ParallaxBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const applyTransforms = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const y = scrollRef.current;
    const { x: mx, y: my } = mouseRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.querySelectorAll<HTMLElement>("[data-parallax-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallaxSpeed ?? "0");
      const depth = parseFloat(el.dataset.parallaxDepth ?? "0");
      const mouseFactor = depth > 2 ? 0 : depth * 0.012;

      if (reduced) {
        el.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const ty = y * speed * -1;
      const tx = mx * mouseFactor;
      const mty = my * mouseFactor * 0.6;
      el.style.transform = `translate3d(${tx}px, ${ty + mty}px, 0)`;
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyTransforms);
    };

    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyTransforms);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyTransforms]);

  return (
    <div ref={rootRef} className="archex-parallax-root" aria-hidden>
      {LAYERS.map(({ id, speed, depth }) => (
        <div
          key={id}
          className={`archex-parallax-layer archex-parallax-layer--${id}`}
          data-parallax-speed={speed}
          data-parallax-depth={depth}
        >
          {id === "sky" && <SkyGrid />}
          {id === "far" && <MountainFar />}
          {id === "mid" && <MountainMid />}
          {id === "near" && <MountainNear />}
        </div>
      ))}
      <div className="archex-parallax-vignette" />
    </div>
  );
}
