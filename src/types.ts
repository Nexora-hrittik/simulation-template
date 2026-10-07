export interface TemplateConfig {
  stepSize: number;
  maxLimit: number;
}

export interface TemplateState {
  currentValue: number;
  totalSteps: number;
  isComplete: boolean;
  history: number[];
}

export interface TemplateStepLog {
  action: string;
  previousValue: number;
  newValue: number;
  message: string;
}
