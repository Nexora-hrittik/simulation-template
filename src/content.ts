import { SimulationContent } from '@nexora-hrittik/sdk';

export const TEMPLATE_CONTENT: SimulationContent = {
  introduction:
    'A discrete accumulator demonstrates iterative state progression where an internal value updates deterministically under constant step increments until reaching a defined upper bound.',
  theory:
    'A discrete accumulator operates as a deterministic transition system defined by the tuple (S, S0, T, F). The state space S represents the non-negative integers with initial state S0 = 0. The transition function T computes St+1 = St + Δ, where Δ is the configured step size. The termination predicate F evaluates to true when St ≥ M, where M is the maximum limit.',
  howItWorks: [
    'Initialize the accumulator register to 0 and establish baseline execution parameters.',
    'Advance state on each step by applying the pure transition function: currentValue ← currentValue + stepSize.',
    'Evaluate the terminal boundary condition and conclude execution once currentValue reaches or exceeds maxLimit.',
  ],
  keyFormulas: [
    {
      label: 'State Progression',
      formula: 'S_{t+1} = S_t + \\Delta',
      explanation: 'Discrete additive transition applying constant step size \\Delta per execution cycle.',
    },
    {
      label: 'Termination Invariant',
      formula: 'S_t \\ge M',
      explanation: 'Stopping predicate satisfied when accumulator value meets or exceeds the maximum limit M.',
    },
  ],
  references: [
    {
      title: 'Finite State Machine Foundations',
      url: 'https://en.wikipedia.org/wiki/Finite-state_machine',
      description: 'Formal mathematical models of deterministic computation and state transitions.',
    },
  ],
};

