import React, { useMemo, useState } from "react";
import type { SiteAnalysis, RoyaltyInsight } from "./types";
import { analyzeRoyaltyMetadata, analyzeSiteRevenue } from "./services/geminiService";

import { StatCard } from "./components/StatCard";
import { OpportunityCard } from "./components/OpportunityCard";
import { HealthIntelligenceHub } from "./components/HealthIntelligenceHub";

const defaultTarget = "soulsoundworld.world";

/** DEMO DATA: renders visuals even without API calls */
const DEMO_ANALYSIS: SiteAnalysis = {
  healthScore: 78,
  trend: "improving",
  lastAuditDate: new Date().toISOString().slice(0, 10),
  missedRevenue: 125,
  currentCashable: 0,
  potentialCashout: 0,
  healthBreakdown: [
    { label: "Site Signal", score: 82, status: "optimal", impact: "Pages ship fast and stay readable. Good public signal density." },
    { label: "Link Flow", score: 63, status: "warning", impact: "Too many parallel pages. Add 1 hub nav + clear funnels." },
    { label: "Monetization", score: 55, status: "warning", impact: "Missing 1-click conversion lanes (donations, affiliates, packs)." },
  ],
  opportunities: [
    {
      id: "opp-1",
      platform: "SoulSoundWorld",
      title: "Add “Support” + “Affiliate Vault” blocks",
      potentialValue: "$10–$50/day",
      description: "Add a compact support panel + affiliate vault to capture low-friction revenue without interrupting story/music.",
      actionCode: "ADD: /support and /vault links to main hub + hero buttons",
      strategyLogic: "People act when the next step is obvious. Put the money-lane next to the mission-lane.",
      scalingDirective: "Convert 1% of daily visitors with a single action.",
      status: "active",
    },
    {
      id: "opp-2",
      platform: "Content",
      title: "Weekly ‘Open Build’ metric post",
      potentialValue: "$0 → Awareness",
      description: "Publish a weekly growth snapshot (reads, streams, release count). Keeps momentum + attracts collaborators.",
      actionCode: "POST: weekly metric tile + what shipped + what's next",
      strategyLogic: "Trust compounds. Consistency signals stability to fans and future partners.",
      scalingDirective: "One post = one new node in your network graph.",
      status: "new",
    },
  ],
  businessAdjustments: [
    {
      id: "adj-1",
      title: "Unify navigation",
      description: "Centralize all internal tools under one “Tools” hub page.",
      impact: "high",
      effort: "medium",
      projection: "Higher retention + easier conversions.",
    },
  ],
  suggestedIntegrations: [
    "Support panel",
    "Affiliate vault",
    "Weekly metric tiles",
    "Release checklist",
    "Reader → Listener bridge buttons",
  ],
  scalingProjections: [
    { period: "30 days", conservative: 150, aggressive: 650, source: "conversion lanes + posting cadence" },
    { period: "90 days", conservative: 600, aggressive: 2600, source: "compounding traffic + improved funnels" },
  ],
  musicMetrics: [
    { platform: "Spotify", listeners: 0, streams: 0, revenue: 0, trend: "stable" },
    { platform: "Pocket FM", listeners: 0, streams: 0, revenue: 0, trend: "up" },
  ],
};

const DEMO_ROYALTY: RoyaltyInsight[] = [
  {
    id: "r-1",
    source: "Distributor housekeeping",
    amount: "$0–$?? (depends on account)",
    confidence: 0.55,
    description: "Double-check that every track has correct splits, ISRC/UPC, and payout routing.",
    claimAction: "Verify payout method + tax profile + track metadata completeness",
    urgency: "medium",
  },
];

function safeLoad(key: string) {
  try { return localStorage.getItem(key) || ""; } catch { return ""; }
}
function safeSave(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch {}
}
function safeRemove(key: string) {
  try { localStorage.removeItem(key); } catch {}
}

export default function App() {
  const [target, setTarget] = useState(defaultTarget);
  const [apiKey, setApiKey] = useState<string>(() => safeLoad("SSA_GEMINI_API_KEY"));
  const [context, setContext] = useState<string>(() => safeLoad("SSA_CONTEXT"));

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(DEMO_ANALYSIS);
  const [royaltyLeads, setRoyaltyLeads] = useState<RoyaltyInsight[] | null>(DEMO_ROYALTY);
  const [error, setError] = useState<string>("");

  const canRun = useMemo(() => Boolean(apiKey && apiKey.trim().length > 10), [apiKey]);

  const runReal = async () => {
    setError("");
    setLoading(true);

    try {
      if (!canRun) throw new Error("Missing Gemini API Key. Paste key and Save.");
      const a = await analyzeSiteRevenue(target, apiKey.trim(), context.trim());
      setAnalysis(a);

      const r = await analyzeRoyaltyMetadata(apiKey.trim(), context.trim());
      setRoyaltyLeads(r);
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = () => {
    setError("");
    setAnalysis(DEMO_ANALYSIS);
    setRoyaltyLeads(DEMO_ROYALTY);
  };

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <div className="kicker">SoulSound Revenue Accelerator</div>
          <div className="h1">Intelligence Hub</div>
          <p className="p" style={{ maxWidth: 720 }}>
            This is a read-only analysis layer. Demo mode shows visuals immediately. Real mode runs only with your key.
          </p>
        </div>

        <div className="row">
          <button className="btn" onClick={loadDemo}>
            Load Demo Visuals
          </button>
          <button className="btn primary" disabled={!canRun || loading} onClick={runReal}>
            {loading ? "Running…" : "Run Analysis"}
          </button>
        </div>
      </div>

      <hr className="hr" />

      <div className="grid3">
        <div className="card">
          <div className="small">Target</div>
          <input className="input" value={target} onChange={(e) => setTarget(e.target.value)} />
        </div>

        <div className="card">
          <div className="small">Gemini API Key (stored on this device)</div>
          <input className="input" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste your key" />
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn" onClick={() => safeSave("SSA_GEMINI_API_KEY", apiKey)}>Save Key</button>
            <button className="btn" onClick={() => { setApiKey(""); safeRemove("SSA_GEMINI_API_KEY"); }}>Clear</button>
          </div>
          <div className="small" style={{ marginTop: 8 }}>
            Key is never committed to GitHub.
          </div>
        </div>

        <div className="card">
          <div className="small">Context (paste real metrics)</div>
          <textarea
            className="textarea"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            onBlur={() => safeSave("SSA_CONTEXT", context)}
            placeholder="Paste Pocket FM, Spotify, FreshTunes notes, etc."
          />
        </div>
      </div>

      {error ? (
        <div className="card" style={{ borderColor: "rgba(251,113,133,.55)", marginTop: 12 }}>
          <div className="sectionTitle">Error</div>
          <p className="p">{error}</p>
        </div>
      ) : null}

      <div style={{ marginTop: 14 }} className="grid3">
        <StatCard label="Mode" value={canRun ? "Live (Key Ready)" : "Demo (Visuals)"} trend="Safe, read-only display" trendDirection="up" />
        <StatCard label="Security" value="No secrets shipped" trend="BYO key, local-only storage" trendDirection="up" />
        <StatCard label="Workflow" value="Context → Insights" trend="Human executes actions" trendDirection="flat" />
      </div>

      {analysis ? (
        <>
          <HealthIntelligenceHub analysis={analysis} />

          <div style={{ marginTop: 18 }}>
            <div className="card">
              <div className="sectionTitle">Opportunities</div>
              <div className="sectionDesc">
                Copy action blocks and execute manually. Nothing auto-runs.
              </div>

              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                {analysis.opportunities.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} />
                ))}
              </div>
            </div>
          </div>

          {royaltyLeads?.length ? (
            <div style={{ marginTop: 14 }} className="card">
              <div className="sectionTitle">Royalty & Payout Leads</div>
              <div className="sectionDesc">Leads and actions only — not real-time access.</div>

              <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                {royaltyLeads.map((r) => (
                  <div key={r.id} className="card soft">
                    <div style={{ fontWeight: 800 }}>{r.source}</div>
                    <div className="small" style={{ marginTop: 6 }}>Amount: {r.amount}</div>
                    <p className="p">{r.description}</p>
                    <div className="small" style={{ marginTop: 10 }}>
                      <strong style={{ color: "var(--text)" }}>Action:</strong> {r.claimAction}
                    </div>
                    <div className="small" style={{ marginTop: 8 }}>
                      Confidence: {(r.confidence * 100).toFixed(0)}% · Urgency: {r.urgency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <div className="footer">SoulSound World · Intelligence Layer · Demo Mode for visuals</div>
    </div>
  );
  }
