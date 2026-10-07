import { SimulationContent } from '@rec-labs/sdk';

export const TEMPLATE_CONTENT: SimulationContent = {
  introduction:
    'This is a clean starter simulation demonstrating pure deterministic state transitions under the REC Labs Simulation Contract.',
  theory:
    'A state machine is defined by a tuple (S, S0, T, F), where S is the set of valid states, S0 is the initial state, T is the transition function mapping (S, Config) -> S, and F is the terminal predicate.',
  howItWorks: [
    'The simulation initializes state with currentValue = 0.',
    'Each step applies the pure transition function: currentValue ← currentValue + stepSize.',
    'When currentValue >= maxLimit, the completion invariant is met and execution concludes.',
  ],
  keyFormulas: [
    {
      label: 'State Progression',
      formula: 'S_{t+1} = S_t + \\Delta',
      explanation: 'Deterministic accumulation under constant step size.',
    },
  ],
  references: [
    {
      title: 'REC Labs Simulation Contract Specification',
      url: 'https://github.com/REC-Labs/rec-labs',
      description: 'Official architectural contract requirements.',
    },
  ],
};
