import React, { useState } from "react";
import type { Opportunity } from "../types";

export const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(opportunity.actionCode || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500">
            {opportunity.platform}
          </div>
          <div className="mt-1 text-lg font-semibold">
            {opportunity.title}
          </div>
          <div className="mt-2 text-sm text-slate-300">
            {opportunity.description}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-300">
              Potential: {opportunity.potentialValue}
            </span>
            <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-300">
              Status: {opportunity.status}
            </span>
          </div>
        </div>

        <button
          onClick={copy}
          className="shrink-0 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-200 hover:bg-slate-900/70"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {opportunity.strategyLogic && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/20 p-3 text-xs text-slate-300">
          <div className="font-semibold text-slate-200">
            Strategy Logic
          </div>
          <div className="mt-1">{opportunity.strategyLogic}</div>
        </div>
      )}
    </div>
  );
};
