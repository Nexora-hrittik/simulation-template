import { describe, it, expect } from 'vitest';
import { createInitialState, step } from '../src/logic';
import { TemplateConfig } from '../src/types';

describe('Template Simulation State Machine', () => {
  const config: TemplateConfig = {
    stepSize: 5,
    maxLimit: 15,
  };

  it('creates clean initial state', () => {
    const state = createInitialState(config);
    expect(state.currentValue).toBe(0);
    expect(state.totalSteps).toBe(0);
    expect(state.isComplete).toBe(false);
  });

  it('advances state deterministically through step cycles to completion', () => {
    let state = createInitialState(config);

    const step1 = step(state, config);
    expect(step1.nextState.currentValue).toBe(5);
    expect(step1.isComplete).toBe(false);
    state = step1.nextState;

    const step2 = step(state, config);
    expect(step2.nextState.currentValue).toBe(10);
    expect(step2.isComplete).toBe(false);
    state = step2.nextState;

    const step3 = step(state, config);
    expect(step3.nextState.currentValue).toBe(15);
    expect(step3.isComplete).toBe(true);
  });
});
