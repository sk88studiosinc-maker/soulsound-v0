import React from "react";

type StatCardProps = {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "flat";
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendDirection }) => {
  const trendColor =
    trendDirection === "up"
      ? "var(--good)"
      : trendDirection === "down"
      ? "var(--bad)"
      : "var(--muted)";

  return (
    <div className="card">
      <div className="small">{label}</div>
      <div style={{ marginTop: 6, fontSize: 22, fontWeight: 900 }}>{value}</div>
      {trend ? <div className="small" style={{ marginTop: 8, color: trendColor }}>{trend}</div> : null}
    </div>
  );
};
