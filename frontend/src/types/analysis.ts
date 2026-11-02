export const organs = ["brain", "kidney", "retina"] as const;
export type Organ = (typeof organs)[number];

export interface GatewayAnalysis {
  organ: Organ;
  service: string;
  receivedAt: string;
  result: Record<string, unknown>;
}

export interface AnalysisSnapshot {
  fileName: string;
  imageUrl: string;
  analysis: GatewayAnalysis;
}
