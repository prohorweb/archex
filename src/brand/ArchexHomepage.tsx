import { useState } from "react";
import { AX, TYPO } from "./archex-tokens";
import { IconKeystone, Wordmark } from "./logos";
import ProjectEstimator from "./ProjectEstimator";

const SERVICES = [
  {
    id: "validation",
    name: "Validation Sprint",
    duration: "1–2 weeks",
    desc: "Test your core hypothesis before committing budget. Scoped architecture review, technical risk map, and a go/no-go recommendation with fixed deliverables.",
  },
  {
    id: "mvp",
    name: "MVP Delivery",
    duration: "6–12 weeks",
    desc: "Production-ready product from your design and idea. Full stack delivery with deployment, observability, and handoff documentation built in.",
  },
  {
    id: "modernization",
    name: "Modernization Program",
    duration: "Phased",
    desc: "Migrate and refactor legacy systems without downtime. Incremental cutover strategy — no big-bang rewrites, no production surprises.",
  },
  {
    id: "partnership",
    name: "Engineering Partnership",
    duration: "Ongoing",
    desc: "Continuous architecture and delivery support. Embedded technical leadership for teams that need senior engineering capacity without hiring overhead.",
  },
];

const PROCESS = [
  { id: "discovery", label: "Discovery", desc: "Scope, constraints, and success criteria defined in writing." },
  { id: "architecture", label: "Architecture", desc: "System design, data flows, and integration boundaries documented." },
  { id: "rules", label: "Engineering Rules", desc: "Standards, review gates, and quality thresholds locked before build." },
  { id: "ai-delivery", label: "AI-Assisted Delivery", desc: "Accelerated implementation with human oversight at every merge." },
  { id: "production", label: "Production", desc: "Deploy, monitor, hand off. Codebase yours — no vendor lock." },
];

const CASES = [
  {
    id: "fintech",
    sector: "FINTECH",
    title: "Payment orchestration layer",
    metric: "3.2× throughput",
    desc: "Rebuilt transaction pipeline for a Series A startup. Zero-downtime migration from monolith to event-driven architecture.",
    stack: ["Node.js", "PostgreSQL", "Kafka"],
  },
  {
    id: "saas",
    sector: "B2B SAAS",
    title: "Legacy CRM modernization",
    metric: "−40% infra cost",
    desc: "Phased refactor of a 6-year-old codebase. Cut deployment time from days to minutes without interrupting customer workflows.",
    stack: ["React", "NestJS", "AWS"],
  },
  {
    id: "agency",
    sector: "AGENCY DELIVERY",
    title: "White-label platform core",
    metric: "8-week MVP",
    desc: "Architecture and build of a multi-tenant backend for an agency shipping client products. Reusable across 4 concurrent engagements.",
    stack: ["Next.js", "tRPC", "Prisma"],
  },
];

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#estimator", label: "Estimate" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: TYPO.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: AX.gold, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: TYPO.display, fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", color: AX.white, margin: "0 0 clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

function DiagonalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`archex-cut-card ${className}`} style={{ background: AX.elevated, border: `1px solid ${AX.gridStrong}` }}>
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: "rgba(10,10,11,0.92)", borderBottom: `1px solid ${AX.gridStrong}`, backdropFilter: "blur(14px)" }}>
      <div className="archex-container flex items-center justify-between py-3.5 gap-3">
        <a href="#top" className="flex items-center gap-2.5 no-underline min-w-0" onClick={() => setOpen(false)}>
          <IconKeystone color={AX.gold} size={26} />
          <Wordmark accent={AX.gold} color={AX.white} scale={0.75} />
        </a>

        <nav className="archex-nav-desktop hidden md:flex items-center gap-6">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="archex-nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a href="#estimator" className="archex-btn-orange archex-nav-cta-desktop no-underline text-[10px] py-2.5 px-4">
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
        <a href="#estimator" className="archex-btn-orange no-underline mt-2 text-center" onClick={() => setOpen(false)}>Scope project</a>
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
    <section id="top" className="relative overflow-hidden flex items-center" style={{ minHeight: "min(88vh, 780px)" }}>
      <div className="absolute inset-0 archex-diamond-grid opacity-80" />
      <div className="archex-halo-ring" style={{ width: "min(480px, 85vw)", height: "min(480px, 85vw)", top: "50%", left: "50%", transform: "translate(-50%, -52%)" }} />

      <div className="archex-container relative z-[1] py-16 md:py-28 text-center w-full">
        <SectionLabel>Technical Architecture &amp; Delivery Partner</SectionLabel>

        <h1 style={{ fontFamily: TYPO.display, fontWeight: 700, fontSize: "clamp(32px, 7vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: AX.white, margin: "0 0 24px" }}>
          Architecture
          <span style={{ color: AX.gold, textShadow: `0 0 48px ${AX.goldHalo}` }}> → </span>
          Execution
        </h1>

        <p style={{ fontFamily: TYPO.mono, fontSize: "clamp(13px, 2.5vw, 16px)", lineHeight: 1.7, color: AX.whiteMuted, maxWidth: 560, margin: "0 auto clamp(28px, 5vw, 48px)" }}>
          We turn product ideas and designs into production-ready systems through architecture-first engineering.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {entries.map((e) => (
            <a key={e.label} href="#estimator" className="archex-btn-entry">
              <div style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 14, color: AX.white, marginBottom: 4 }}>{e.label}</div>
              <div style={{ fontFamily: TYPO.mono, fontSize: 10, color: AX.metalLight }}>{e.sub}</div>
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
      <div className="archex-container">
        <SectionLabel>// SERVICE.TIERS</SectionLabel>
        <SectionTitle>How we engage</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <DiagonalCard key={s.id} className="p-6 md:p-8">
              <div className="archex-service-head">
                <h3 style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: "clamp(17px, 3vw, 20px)", color: AX.white, margin: 0 }}>{s.name}</h3>
                <span style={{ fontFamily: TYPO.mono, fontSize: 10, letterSpacing: "0.08em", color: AX.gold, border: `1px solid ${AX.goldRing}`, padding: "5px 10px", background: AX.goldSurface, whiteSpace: "nowrap" }}>
                  {s.duration}
                </span>
              </div>
              <p style={{ fontFamily: TYPO.mono, fontSize: 12.5, lineHeight: 1.65, color: AX.whiteMuted, margin: 0 }}>{s.desc}</p>
            </DiagonalCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="archex-section-pad" style={{ background: AX.elevated }}>
      <div className="archex-container">
        <SectionLabel>// PIPELINE</SectionLabel>
        <SectionTitle>How ARCHEX works</SectionTitle>
        <div className="archex-process-flow">
          {PROCESS.map((step, i) => (
            <div key={step.id} className="archex-process-step">
              <div style={{ fontFamily: TYPO.mono, fontSize: 10, letterSpacing: "0.12em", color: AX.gold, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 14, color: AX.white, marginBottom: 8, lineHeight: 1.25 }}>{step.label}</div>
              <p style={{ fontFamily: TYPO.mono, fontSize: 11, lineHeight: 1.55, color: AX.metalLight, margin: 0 }}>{step.desc}</p>
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
      <div className="archex-container">
        <SectionLabel>// SELECTED.WORK</SectionLabel>
        <SectionTitle>Recent engagements</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <DiagonalCard key={c.id} className="flex flex-col h-full">
              <div className="archex-diamond-grid px-4 py-3.5 flex items-center justify-between gap-2" style={{ borderBottom: `1px solid ${AX.gridStrong}` }}>
                <span style={{ fontFamily: TYPO.mono, fontSize: 10, letterSpacing: "0.1em", color: AX.metal }}>{c.sector}</span>
                <span style={{ fontFamily: TYPO.display, fontWeight: 700, fontSize: 15, color: AX.gold }}>{c.metric}</span>
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 17, color: AX.white, margin: "0 0 10px" }}>{c.title}</h3>
                <p style={{ fontFamily: TYPO.mono, fontSize: 12, lineHeight: 1.6, color: AX.whiteMuted, margin: "0 0 16px", flex: 1 }}>{c.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: `1px solid ${AX.gridStrong}` }}>
                  {c.stack.map((t) => (
                    <span key={t} style={{ fontFamily: TYPO.mono, fontSize: 10, color: AX.metalLight, border: `1px solid ${AX.gridStrong}`, padding: "4px 8px" }}>{t}</span>
                  ))}
                </div>
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
    <footer id="contact" style={{ background: AX.base, borderTop: `1px solid ${AX.gridStrong}` }}>
      <div className="archex-container py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <IconKeystone color={AX.gold} size={22} />
            <Wordmark accent={AX.gold} color={AX.white} scale={0.65} />
          </div>
          <nav className="flex flex-wrap gap-5 justify-center">
            {NAV.map((l) => (
              <a key={l.label} href={l.href} className="archex-nav-link">{l.label}</a>
            ))}
          </nav>
          <span style={{ fontFamily: TYPO.mono, fontSize: 10, color: AX.metal, letterSpacing: "0.08em" }}>© 2026 ARCHEX</span>
        </div>
      </div>
    </footer>
  );
}

export default function ArchexHomepage() {
  return (
    <div className="archex-site">
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
  );
}
