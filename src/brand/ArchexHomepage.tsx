import { useState } from "react";
import { AX, TYPO } from "./archex-tokens";
import { IconKeystone, Wordmark } from "./logos";
import ProjectEstimator from "./ProjectEstimator";
import ParallaxBackground from "./ParallaxBackground";
import HeroHalo from "./HeroHalo";

const SERVICES = [
  {
    id: "validation",
    name: "Validation Sprint",
    duration: "1–2 weeks",
    outcome: "Validate before you build",
    desc: "Test your core hypothesis before committing budget. Architecture review, technical risk map, and a go/no-go recommendation — fixed scope, fixed deliverables.",
  },
  {
    id: "mvp",
    name: "MVP Delivery",
    duration: "6–12 weeks",
    outcome: "Launch without hiring a full team",
    desc: "Production-ready product from your design and requirements. Deployment, observability, and handoff documentation built in from day one.",
  },
  {
    id: "modernization",
    name: "Modernization Program",
    duration: "Phased",
    outcome: "Modernize without downtime",
    desc: "Migrate and refactor legacy systems through incremental cutover. No big-bang rewrites. No production surprises.",
  },
  {
    id: "partnership",
    name: "Engineering Partnership",
    duration: "Ongoing",
    outcome: "Senior capacity on demand",
    desc: "Embedded architecture and delivery leadership for teams that need senior engineering depth without permanent hiring overhead.",
  },
];

const PROCESS = [
  { id: "discovery", label: "Discovery", desc: "Scope, constraints, and success criteria defined in writing before any build begins." },
  { id: "architecture", label: "Architecture", desc: "System design, data flows, and integration boundaries documented and agreed." },
  { id: "rules", label: "Engineering Rules", desc: "Standards, review gates, and quality thresholds locked before implementation." },
  { id: "delivery", label: "Controlled Delivery", desc: "Accelerated implementation with human oversight at every merge and release." },
  { id: "production", label: "Production", desc: "Deploy, monitor, hand off. Your codebase — no vendor lock, no dependency." },
];

const CASES = [
  {
    id: "fintech",
    sector: "FINTECH",
    title: "Payment orchestration layer",
    metric: "Zero-downtime migration",
    desc: "Rebuilt transaction pipeline for a Series A startup. Monolith to event-driven architecture without interrupting live payments.",
  },
  {
    id: "saas",
    sector: "B2B SAAS",
    title: "Legacy CRM modernization",
    metric: "Days → minutes deploy",
    desc: "Phased refactor of a six-year codebase. Cut release cycles without interrupting customer workflows or data integrity.",
  },
  {
    id: "agency",
    sector: "AGENCY DELIVERY",
    title: "White-label platform core",
    metric: "4 concurrent clients",
    desc: "Multi-tenant backend architecture for an agency shipping client products. One core, reusable across engagements.",
  },
];

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#estimator", label: "Estimate" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="archex-label" style={{ marginBottom: 20 }}>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="archex-heading"
      style={{ fontSize: "clamp(28px, 4.5vw, 44px)", margin: "0 0 clamp(48px, 7vw, 72px)" }}
    >
      {children}
    </h2>
  );
}

function DiagonalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`archex-cut-card archex-card-accent ${className}`}
      style={{ background: AX.surface, border: `1px solid ${AX.border}` }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(6, 7, 10, 0.88)",
        borderBottom: `1px solid ${AX.border}`,
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="archex-container flex items-center justify-between py-5 gap-4">
        <a href="#top" className="flex items-center gap-3 no-underline min-w-0" onClick={() => setOpen(false)}>
          <IconKeystone color={AX.gold} size={24} />
          <Wordmark accent={AX.gold} color={AX.text} scale={0.72} />
        </a>

        <nav className="archex-nav-desktop hidden md:flex items-center gap-10">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="archex-nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a href="#estimator" className="archex-btn-primary archex-nav-cta-desktop no-underline text-[10px] py-3 px-5">
            Scope project
          </a>
          <button type="button" className="archex-nav-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      <nav className={`archex-nav-drawer ${open ? "archex-nav-drawer--open" : ""}`} aria-hidden={!open}>
        {NAV.map((l) => (
          <a key={l.href} href={l.href} className="archex-nav-link" onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#estimator" className="archex-btn-primary no-underline mt-4 text-center" onClick={() => setOpen(false)}>
          Scope project
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const entries = [
    { label: "For Startups", sub: "Validate before you scale" },
    { label: "For Agencies", sub: "Ship client work on spec" },
    { label: "For Product Teams", sub: "Extend senior capacity" },
  ];

  return (
    <section
      id="top"
      className="archex-hero relative overflow-hidden flex items-center"
      style={{ minHeight: "min(94vh, 900px)" }}
    >
      <HeroHalo />

      <div className="archex-container relative z-[2] py-20 md:py-32 text-center w-full">
        <div className="archex-reveal">
          <SectionLabel>Technical Architecture &amp; Delivery Partner</SectionLabel>
        </div>

        <h1
          className="archex-heading archex-reveal archex-reveal-delay-1"
          style={{
            fontSize: "clamp(36px, 8vw, 80px)",
            fontWeight: 700,
            margin: "0 0 clamp(28px, 4vw, 40px)",
          }}
        >
          Architecture
          <span style={{ color: AX.gold, textShadow: `0 0 64px ${AX.goldHalo}` }}> → </span>
          Execution
        </h1>

        <p
          className="archex-body archex-reveal archex-reveal-delay-2"
          style={{
            fontSize: "clamp(15px, 2.5vw, 18px)",
            maxWidth: 580,
            margin: "0 auto clamp(40px, 6vw, 64px)",
          }}
        >
          We transform ideas, designs, and business requirements into production-ready systems —
          with the architecture defined before a single line of code is written.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto archex-reveal archex-reveal-delay-3">
          {entries.map((e) => (
            <a key={e.label} href="#estimator" className="archex-btn-entry">
              <div style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 15, color: AX.text, marginBottom: 6 }}>
                {e.label}
              </div>
              <div className="archex-mono" style={{ fontSize: 11, color: AX.textSecondary }}>{e.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="archex-section-pad">
      <div className="archex-section-halo" aria-hidden />
      <div className="archex-container">
        <SectionLabel>01 · Service tiers</SectionLabel>
        <SectionTitle>How we reduce risk</SectionTitle>
        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <DiagonalCard key={s.id} className="p-8 md:p-10">
              <div className="archex-service-head">
                <h3 className="archex-heading" style={{ fontSize: "clamp(18px, 3vw, 22px)", margin: 0 }}>
                  {s.name}
                </h3>
                <span
                  className="archex-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: AX.gold,
                    border: `1px solid ${AX.borderGold}`,
                    padding: "6px 12px",
                    background: AX.goldSurface,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.duration}
                </span>
              </div>
              <div className="archex-mono" style={{ fontSize: 11, color: AX.goldLight, marginBottom: 16, letterSpacing: "0.04em" }}>
                {s.outcome}
              </div>
              <p className="archex-body" style={{ fontSize: 14, margin: 0 }}>{s.desc}</p>
            </DiagonalCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="archex-section-pad">
      <div className="archex-section-halo" aria-hidden />
      <div className="archex-container">
        <SectionLabel>02 · Delivery pipeline</SectionLabel>
        <SectionTitle>Deterministic by design</SectionTitle>
        <div className="archex-process-flow">
          {PROCESS.map((step, i) => (
            <div key={step.id} className="archex-process-step">
              <div className="archex-mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: AX.gold, marginBottom: 14 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="archex-heading" style={{ fontSize: 15, marginBottom: 12, lineHeight: 1.25 }}>
                {step.label}
              </div>
              <p className="archex-body" style={{ fontFamily: TYPO.mono, fontSize: 11, lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  return (
    <section id="work" className="archex-section-pad">
      <div className="archex-section-halo" aria-hidden />
      <div className="archex-container">
        <SectionLabel>03 · Selected work</SectionLabel>
        <SectionTitle>Recent engagements</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <DiagonalCard key={c.id} className="flex flex-col h-full">
              <div
                className="px-6 py-5 flex items-center justify-between gap-3"
                style={{ borderBottom: `1px solid ${AX.border}`, background: AX.bg }}
              >
                <span className="archex-mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: AX.textSecondary }}>
                  {c.sector}
                </span>
                <span className="archex-metric" style={{ fontSize: 13 }}>{c.metric}</span>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="archex-heading" style={{ fontSize: 18, margin: "0 0 14px" }}>{c.title}</h3>
                <p className="archex-body" style={{ fontFamily: TYPO.mono, fontSize: 12, lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {c.desc}
                </p>
              </div>
            </DiagonalCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div className="archex-container py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <IconKeystone color={AX.gold} size={20} />
            <Wordmark accent={AX.gold} color={AX.text} scale={0.62} />
          </div>
          <p className="archex-mono" style={{ fontSize: 11, color: AX.textSecondary, letterSpacing: "0.06em", margin: 0 }}>
            Architecture → Execution
          </p>
          <nav className="flex flex-wrap gap-8 justify-center">
            {NAV.map((l) => (
              <a key={l.label} href={l.href} className="archex-nav-link">{l.label}</a>
            ))}
          </nav>
          <span className="archex-mono" style={{ fontSize: 10, color: AX.textSecondary, letterSpacing: "0.08em" }}>
            © 2026 ARCHEX
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function ArchexHomepage() {
  return (
    <div className="archex-site">
      <ParallaxBackground />
      <div className="archex-site-content">
        <Header />
        <main>
          <Hero />
          <ServicesSection />
          <ProcessSection />
          <CasesSection />
          <ProjectEstimator />
        </main>
        <Footer />
      </div>
    </div>
  );
}
