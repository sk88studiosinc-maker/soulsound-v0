import React from "react";
import type { SiteAnalysis } from "../types";

export const HealthIntelligenceHub: React.FC<{ analysis: SiteAnalysis }> = ({ analysis }) => {
  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">System Health</div>
          <div className="mt-1 text-2xl font-semibold">
            Score: {analysis.healthScore}/100
          </div>
          <div className="mt-2 text-sm text-slate-300">
            Trend: {analysis.trend}
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Last audit: {analysis.lastAuditDate}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {analysis.healthBreakdown.map((h) => (
          <div
            key={h.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/20 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{h.label}</div>
              <span className="rounded-full border border-slate-800 bg-slate-900/40 px-2 py-0.5 text-xs text-slate-300">
                {h.status}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Score: {h.score}/100
            </div>
            <div className="mt-2 text-sm text-slate-300">
              {h.impact}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
