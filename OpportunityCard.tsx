import React from "react";

type Opportunity = {
  title: string;
  description: string;
  impact: "Low" | "Medium" | "High";
};

const impactColors: Record<Opportunity["impact"], string> = {
  Low: "#6b7280",
  Medium: "#f59e0b",
  High: "#10b981",
};

export default function OpportunityCard({ title, description, impact }: Opportunity) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>

      <span
        style={{
          marginTop: "0.5rem",
          display: "inline-block",
          padding: "0.25rem 0.5rem",
          borderRadius: "999px",
          background: impactColors[impact],
          color: "#fff",
          fontSize: "0.75rem",
        }}
      >
        Impact: {impact}
      </span>
    </div>
  );
}
