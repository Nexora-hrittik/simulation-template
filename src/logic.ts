import { TemplateConfig, TemplateState, TemplateStepLog } from './types';
import { StepResult } from '@nexora-hrittik/sdk';

export function createInitialState(_config: TemplateConfig): TemplateState {
  return {
    currentValue: 0,
    totalSteps: 0,
    isComplete: false,
    history: [0],
  };
}

export function step(
  state: TemplateState,
  config: TemplateConfig
): StepResult<TemplateState, TemplateStepLog> {
  if (state.isComplete) {
    return {
      nextState: state,
      isComplete: true,
      stepLog: {
        action: 'NOOP',
        previousValue: state.currentValue,
        newValue: state.currentValue,
        message: 'Simulation already reached terminal state.',
      },
    };
  }

  const nextVal = state.currentValue + config.stepSize;
  const isComplete = nextVal >= config.maxLimit;

  const nextState: TemplateState = {
    currentValue: nextVal,
    totalSteps: state.totalSteps + 1,
    isComplete,
    history: [...state.history, nextVal],
  };

  const stepLog: TemplateStepLog = {
    action: 'INCREMENT',
    previousValue: state.currentValue,
    newValue: nextVal,
    message: `Advanced value by +${config.stepSize} to ${nextVal}.`,
  };

  return {
    nextState,
    isComplete,
    stepLog,
  };
}
