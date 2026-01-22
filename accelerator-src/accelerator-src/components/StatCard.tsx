import React from "react";

type StatCardProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "flat";
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, trendDirection }) => {
  const trendClass =
    trendDirection === "up" ? "text-emerald-400" :
    trendDirection === "down" ? "text-red-400" :
    "text-slate-300";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
          {trend ? <div className={`mt-2 text-xs ${trendClass}`}>{trend}</div> : null}
        </div>
        {icon ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-slate-200">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
};
