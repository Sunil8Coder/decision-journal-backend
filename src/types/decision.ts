export type Emotion =
  | 'confident'
  | 'anxious'
  | 'neutral'
  | 'excited'
  | 'uncertain';

export type Category =
  | 'career'
  | 'relationships'
  | 'finances'
  | 'health';

export interface Decision {
  id: string;
  decision: string;
  reasoning: string;
  emotion: Emotion;
  category: Category;
  expectedOutcome: string;
  createdAt: string;
  reviewedAt?: string;
  actualOutcome?: string;
  biasDetected?: string[];
}

export interface BiasPattern {
  name: string;
  count: number;
  description: string;
}
