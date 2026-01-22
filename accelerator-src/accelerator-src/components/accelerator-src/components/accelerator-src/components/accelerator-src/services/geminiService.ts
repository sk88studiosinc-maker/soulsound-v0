import { GoogleGenAI, Type } from "@google/genai";
import type { SiteAnalysis, RoyaltyInsight } from "../types";

export const analyzeSiteRevenue = async (
  targetLabel: string,
  apiKey: string,
  context?: string
): Promise<SiteAnalysis> => {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = [
    "You are helping a creator find micro-revenue opportunities.",
    "Do NOT fabricate real-time numbers.",
    "Do NOT claim access to private dashboards or accounts.",
    "",
    `Target: ${targetLabel}`,
    context ? `Context:\n${context}` : "Context: none provided",
    "",
    "Return valid JSON only."
  ].join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    return JSON.parse(response.text || "{}") as SiteAnalysis;
  } catch {
    return {
      healthScore: 0,
      healthBreakdown: [],
      missedRevenue: 0,
      currentCashable: 0,
      potentialCashout: 0,
      opportunities: [],
      businessAdjustments: [],
      suggestedIntegrations: [],
      scalingProjections: [],
      musicMetrics: [],
      lastAuditDate: new Date().toISOString().slice(0, 10),
      trend: "stable"
    };
  }
};

export const analyzeRoyaltyMetadata = async (
  apiKey: string,
  context?: string
): Promise<RoyaltyInsight[]> => {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = [
    "Identify commonly missed royalty sources.",
    "Do NOT claim real-time access.",
    context || "No context provided",
    "Return JSON only."
  ].join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    return JSON.parse(response.text || "[]") as RoyaltyInsight[];
  } catch {
    return [];
  }
};
