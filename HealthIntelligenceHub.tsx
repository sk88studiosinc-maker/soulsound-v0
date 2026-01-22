import React from "react";

type HealthMetric = {
  label: string;
  value: number;
  status: "Optimal" | "Warning" | "Critical";
};

const statusColors: Record<HealthMetric["status"], string> = {
  Optimal: "#10b981",
  Warning: "#f59e0b",
  Critical: "#ef4444",
};

export default function HealthIntelligenceHub() {
  const metrics: HealthMetric[] = [
    { label: "Site Integrity", value: 92, status: "Optimal" },
    { label: "Revenue Efficiency", value: 76, status: "Warning" },
    { label: "Growth Momentum", value: 88, status: "Optimal" },
    { label: "Risk Exposure", value: 41, status: "Critical" },
  ];

  return (
    <div className="card">
      <h2>System Health</h2>

      {metrics.map((metric) => (
        <div key={metric.label} style={{ marginBottom: "0.75rem" }}>
          <strong>{metric.label}</strong>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.85rem",
            }}
          >
            <span>{metric.value}%</span>
            <span style={{ color: statusColors[metric.status] }}>
              {metric.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
