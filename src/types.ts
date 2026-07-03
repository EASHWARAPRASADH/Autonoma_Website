export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  features: string[];
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  steps: string[];
}

export interface ProjectedMetric {
  metric: string;
  before: string;
  after: string;
  impact: string;
}

export interface ConsultationResponse {
  factoryName: string;
  industry: string;
  analysisSummary: string;
  swot: SWOTAnalysis;
  recommendations: Recommendation[];
  timeline: TimelinePhase[];
  projectedMetrics: ProjectedMetric[];
}
