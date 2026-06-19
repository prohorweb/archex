/** Single centered Devs halo — one anchor, rotation on inner wrappers */
export default function HeroHalo() {
  return (
    <div className="archex-hero-halo" aria-hidden>
      <div className="archex-hero-halo__anchor">
        <div className="archex-hero-halo__glow" />
        <div className="archex-hero-halo__spin archex-hero-halo__spin--a">
          <div className="archex-hero-halo__ring archex-hero-halo__ring--primary" />
        </div>
        <div className="archex-hero-halo__spin archex-hero-halo__spin--b">
          <div className="archex-hero-halo__ring archex-hero-halo__ring--secondary" />
        </div>
      </div>
    </div>
  );
}
