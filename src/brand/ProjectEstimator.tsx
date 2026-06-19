import { useState, useEffect, useMemo, useCallback } from "react";
import { AX, TYPO } from "./archex-tokens";

type Need = "validate" | "mvp" | "modernize" | "extend";
type TeamSize = "solo" | "squad" | "team";
type Timeline = "short" | "medium" | "long";
type Complexity = "low" | "medium" | "high";
type StartingPoint = "idea" | "figma" | "codebase";

interface EstimatorState {
  need: Need | null;
  teamSize: TeamSize | null;
  timeline: Timeline | null;
  complexity: Complexity | null;
  startingPoint: StartingPoint | null;
}

const NEED_OPTIONS: { id: Need; label: string; sub: string }[] = [
  { id: "validate", label: "Validate an idea", sub: "Test hypothesis before full build" },
  { id: "mvp", label: "Build an MVP", sub: "Ship a production-ready product" },
  { id: "modernize", label: "Modernize a legacy system", sub: "Refactor without downtime" },
  { id: "extend", label: "Extend my team", sub: "Embedded architecture capacity" },
];

const TEAM_OPTIONS: { id: TeamSize; label: string }[] = [
  { id: "solo", label: "1 engineer" },
  { id: "squad", label: "2–3 engineers" },
  { id: "team", label: "4+ engineers" },
];

const TIMELINE_OPTIONS: { id: Timeline; label: string }[] = [
  { id: "short", label: "< 4 weeks" },
  { id: "medium", label: "1–3 months" },
  { id: "long", label: "3+ months" },
];

const COMPLEXITY_OPTIONS: { id: Complexity; label: string; desc: string }[] = [
  { id: "low", label: "Low", desc: "Standard stack, clear scope" },
  { id: "medium", label: "Medium", desc: "Integrations, custom logic" },
  { id: "high", label: "High", desc: "Distributed systems, compliance" },
];

const START_OPTIONS: { id: StartingPoint; label: string; sub: string }[] = [
  { id: "idea", label: "Idea only", sub: "Concept or brief — no design yet" },
  { id: "figma", label: "Has design (Figma)", sub: "UI/UX ready for implementation" },
  { id: "codebase", label: "Has existing codebase", sub: "Live system or partial build" },
];

const PRODUCT_MAP: Record<Need, string> = {
  validate: "Validation Sprint",
  mvp: "MVP Delivery",
  modernize: "Modernization Program",
  extend: "Engineering Partnership",
};

function computeEstimate(s: EstimatorState) {
  if (!s.need || !s.teamSize || !s.timeline || !s.complexity || !s.startingPoint) return null;

  const base: Record<Need, [number, number]> = {
    validate: [6000, 14000],
    mvp: [22000, 75000],
    modernize: [35000, 110000],
    extend: [10000, 22000],
  };

  const teamMult: Record<TeamSize, number> = { solo: 1, squad: 1.55, team: 2.1 };
  const timelineMult: Record<Timeline, number> = { short: 0.95, medium: 1, long: 1.12 };
  const complexityMult: Record<Complexity, number> = { low: 0.88, medium: 1, high: 1.38 };
  const startMult: Record<StartingPoint, number> = {
    idea: s.need === "validate" ? 1 : 1.12,
    figma: 1,
    codebase: s.need === "modernize" ? 1.08 : 0.94,
  };

  const m = teamMult[s.teamSize] * timelineMult[s.timeline] * complexityMult[s.complexity] * startMult[s.startingPoint];
  const [lo, hi] = base[s.need];
  const priceMin = Math.round((lo * m) / 500) * 500;
  const priceMax = Math.round((hi * m * 1.15) / 500) * 500;

  const weeksMap: Record<Need, Record<Timeline, [number, number]>> = {
    validate: { short: [1, 2], medium: [2, 3], long: [2, 4] },
    mvp: { short: [6, 8], medium: [8, 12], long: [12, 16] },
    modernize: { short: [8, 12], medium: [12, 20], long: [20, 32] },
    extend: { short: [4, 8], medium: [8, 16], long: [16, 52] },
  };

  let [wMin, wMax] = weeksMap[s.need][s.timeline];
  if (s.complexity === "high") { wMin = Math.ceil(wMin * 1.2); wMax = Math.ceil(wMax * 1.25); }
  if (s.startingPoint === "figma" && s.need === "mvp") { wMin = Math.max(4, wMin - 1); }

  return {
    product: PRODUCT_MAP[s.need],
    priceMin,
    priceMax,
    timelineLabel: s.need === "extend"
      ? `${wMin}–${wMax} weeks initial engagement`
      : `${wMin}–${wMax} weeks`,
  };
}

function buildBriefMessage(s: EstimatorState, est: NonNullable<ReturnType<typeof computeEstimate>>) {
  const need = NEED_OPTIONS.find((o) => o.id === s.need)?.label ?? "";
  const team = TEAM_OPTIONS.find((o) => o.id === s.teamSize)?.label ?? "";
  const timeline = TIMELINE_OPTIONS.find((o) => o.id === s.timeline)?.label ?? "";
  const complexity = COMPLEXITY_OPTIONS.find((o) => o.id === s.complexity)?.label ?? "";
  const start = START_OPTIONS.find((o) => o.id === s.startingPoint)?.label ?? "";

  return [
    "Project estimator summary:",
    "",
    `Need: ${need}`,
    `Scope — Team: ${team} · Timeline: ${timeline} · Complexity: ${complexity}`,
    `Starting point: ${start}`,
    "",
    `Recommended: ${est.product}`,
    `Estimate: $${est.priceMin.toLocaleString()} – $${est.priceMax.toLocaleString()} · ${est.timelineLabel}`,
    "",
    "Additional context:",
  ].join("\n");
}

function ProgressBar({ step }: { step: number }) {
  const pct = step >= 4 ? 100 : (step / 3) * 100;
  return (
    <div className="archex-est-progress" aria-hidden>
      <div className="archex-est-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function OptionBtn({ active, onClick, children, className = "" }: {
  active: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={`archex-est-option ${active ? "archex-est-option--active" : ""} ${className}`}>
      {children}
    </button>
  );
}

export default function ProjectEstimator() {
  const [step, setStep] = useState(1);
  const [showContact, setShowContact] = useState(false);
  const [haloPulse, setHaloPulse] = useState(false);
  const [state, setState] = useState<EstimatorState>({
    need: null, teamSize: null, timeline: null, complexity: null, startingPoint: null,
  });
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => (step >= 4 ? computeEstimate(state) : null), [step, state]);

  useEffect(() => {
    if (step === 4 && estimate) {
      setHaloPulse(true);
      const t = setTimeout(() => setHaloPulse(false), 1200);
      return () => clearTimeout(t);
    }
  }, [step, estimate]);

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, 4)), []);
  const goBack = useCallback(() => { setShowContact(false); setStep((s) => Math.max(s - 1, 1)); }, []);
  const restart = useCallback(() => {
    setShowContact(false);
    setSubmitted(false);
    setStep(1);
    setState({ need: null, teamSize: null, timeline: null, complexity: null, startingPoint: null });
  }, []);

  const openContact = useCallback(() => {
    if (!estimate) return;
    setForm((f) => ({ ...f, message: f.message || buildBriefMessage(state, estimate) }));
    setShowContact(true);
  }, [estimate, state]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  const shellPad = { padding: "0 clamp(16px, 4vw, 24px)" };

  return (
    <section id="estimator" className="archex-section-pad">
      <div className="archex-section-halo" aria-hidden />
      <div className="archex-container archex-container--narrow">
        <div className="archex-label" style={{ marginBottom: 20 }}>04 · Project estimator</div>
        <h2 className="archex-heading" style={{ fontSize: "clamp(26px, 4vw, 38px)", margin: "0 0 16px" }}>
          Scope your engagement
        </h2>
        <p className="archex-body" style={{ fontSize: "clamp(14px, 2.5vw, 15px)", margin: "0 0 clamp(32px, 5vw, 48px)" }}>
          Diagnostic tool — not a sales form. Three questions. A product recommendation and scope range.
        </p>

        <div className="archex-est-shell archex-cut-card">
          <div style={{ ...shellPad, paddingTop: 20, paddingBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="archex-mono" style={{ fontSize: 10, color: AX.textSecondary, letterSpacing: "0.12em" }}>
                {showContact ? "CONTACT" : step >= 4 ? "RESULT" : `STEP ${step} / 3`}
              </span>
              {!showContact && step < 4 && (
                <span style={{ fontFamily: TYPO.mono, fontSize: 10, color: AX.gold }}>{Math.round((step / 3) * 100)}%</span>
              )}
            </div>
            {!showContact && <ProgressBar step={step} />}
          </div>

          <div className="archex-est-body" style={{ ...shellPad, paddingBottom: 24, paddingTop: 16 }}>
            {showContact && estimate ? (
              <div key="contact" className="archex-est-step">
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 18, color: AX.text, marginBottom: 8 }}>Brief received</div>
                    <p style={{ fontFamily: TYPO.mono, fontSize: 12, color: AX.textMuted }}>We respond within one business day with scope questions — not a deck.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="archex-est-q">Send your estimate context</h3>
                    <form onSubmit={(e) => { e.preventDefault(); if (form.name && form.email) setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                        <div>
                          <label className="archex-est-field-label" htmlFor="est-name">Name</label>
                          <input id="est-name" required className="archex-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div>
                          <label className="archex-est-field-label" htmlFor="est-email">Email</label>
                          <input id="est-email" type="email" required className="archex-input" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <label className="archex-est-field-label" htmlFor="est-co">Company (optional)</label>
                        <input id="est-co" className="archex-input" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
                      </div>
                      <div>
                        <label className="archex-est-field-label" htmlFor="est-msg">Context</label>
                        <textarea id="est-msg" rows={6} className="archex-input" style={{ resize: "vertical" }} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
                      </div>
                      <div className="archex-est-nav">
                        <button type="button" className="archex-btn-ghost" onClick={() => setShowContact(false)}>Back to result</button>
                        <button type="submit" className="archex-btn-orange">Submit brief</button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            ) : step === 1 ? (
              <div key="s1" className="archex-est-step">
                <h3 className="archex-est-q">What do you need?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {NEED_OPTIONS.map((o) => (
                    <OptionBtn key={o.id} active={state.need === o.id} onClick={() => setState((s) => ({ ...s, need: o.id }))}>
                      <span style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 14, color: AX.text }}>{o.label}</span>
                      <span style={{ fontFamily: TYPO.mono, fontSize: 11, color: AX.textSecondary, marginTop: 2 }}>{o.sub}</span>
                    </OptionBtn>
                  ))}
                </div>
                <div className="archex-est-nav">
                  <span />
                  <button type="button" className="archex-btn-orange" disabled={!state.need} onClick={goNext}>Continue</button>
                </div>
              </div>
            ) : step === 2 ? (
              <div key="s2" className="archex-est-step">
                <h3 className="archex-est-q">What&apos;s the scope?</h3>
                {[
                  { label: "Team size needed", opts: TEAM_OPTIONS, key: "teamSize" as const },
                  { label: "Estimated timeline", opts: TIMELINE_OPTIONS, key: "timeline" as const },
                ].map(({ label, opts, key }) => (
                  <div key={key} style={{ marginBottom: 20 }}>
                    <div className="archex-est-field-label">{label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {opts.map((o) => (
                        <OptionBtn key={o.id} active={state[key] === o.id} onClick={() => setState((s) => ({ ...s, [key]: o.id }))} className="archex-est-chip">
                          {o.label}
                        </OptionBtn>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="archex-est-field-label">Complexity</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                  {COMPLEXITY_OPTIONS.map((o) => (
                    <OptionBtn key={o.id} active={state.complexity === o.id} onClick={() => setState((s) => ({ ...s, complexity: o.id }))}>
                      <span style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 13, color: AX.text }}>{o.label}</span>
                      <span style={{ fontFamily: TYPO.mono, fontSize: 10, color: AX.textSecondary }}>{o.desc}</span>
                    </OptionBtn>
                  ))}
                </div>
                <div className="archex-est-nav">
                  <button type="button" className="archex-btn-ghost" onClick={goBack}>Back</button>
                  <button type="button" className="archex-btn-orange" disabled={!state.teamSize || !state.timeline || !state.complexity} onClick={goNext}>Continue</button>
                </div>
              </div>
            ) : step === 3 ? (
              <div key="s3" className="archex-est-step">
                <h3 className="archex-est-q">Where are you starting from?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {START_OPTIONS.map((o) => (
                    <OptionBtn key={o.id} active={state.startingPoint === o.id} onClick={() => setState((s) => ({ ...s, startingPoint: o.id }))}>
                      <span style={{ fontFamily: TYPO.display, fontWeight: 600, fontSize: 14, color: AX.text }}>{o.label}</span>
                      <span style={{ fontFamily: TYPO.mono, fontSize: 11, color: AX.textSecondary, marginTop: 2 }}>{o.sub}</span>
                    </OptionBtn>
                  ))}
                </div>
                <div className="archex-est-nav">
                  <button type="button" className="archex-btn-ghost" onClick={goBack}>Back</button>
                  <button type="button" className="archex-btn-orange" disabled={!state.startingPoint} onClick={goNext}>Run estimate</button>
                </div>
              </div>
            ) : estimate ? (
              <div key="result" className="archex-est-step archex-est-result">
                <div className="archex-est-field-label" style={{ color: AX.gold }}>Recommended entry</div>
                <div style={{ fontFamily: TYPO.display, fontWeight: 700, fontSize: "clamp(18px, 4vw, 22px)", color: AX.text, marginBottom: 24 }}>{estimate.product}</div>
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", marginBottom: 24 }}>
                  <div className={`archex-est-halo ${haloPulse ? "archex-est-halo--pulse" : ""}`} />
                  <div className="archex-mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: AX.textSecondary, marginBottom: 8, position: "relative" }}>ESTIMATED RANGE</div>
                  <div className="archex-est-price" style={{ fontFamily: TYPO.display, fontWeight: 700, fontSize: "clamp(24px, 5vw, 38px)", color: AX.gold, letterSpacing: "-0.02em", position: "relative" }}>
                    {fmt(estimate.priceMin)} – {fmt(estimate.priceMax)}
                  </div>
                  <div style={{ fontFamily: TYPO.mono, fontSize: 12, color: AX.textMuted, marginTop: 10, position: "relative" }}>{estimate.timelineLabel}</div>
                </div>
                <p style={{ fontFamily: TYPO.mono, fontSize: 11, lineHeight: 1.6, color: AX.textSecondary, margin: "0 0 24px" }}>
                  Orientation only. Final scope and fixed quote confirmed after a 30-minute discovery call.
                </p>
                <div className="archex-est-nav">
                  <button type="button" className="archex-btn-ghost" onClick={restart}>Restart</button>
                  <button type="button" className="archex-btn-orange" onClick={openContact}>Get a detailed quote</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
