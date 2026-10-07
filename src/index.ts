import { SimulationModule } from '@rec-labs/sdk';
import { TemplateConfig, TemplateState, TemplateStepLog } from './types';
import { createInitialState, step } from './logic';
import { TemplateVisualization } from './visualization';
import { TemplateControls } from './controls';
import { TEMPLATE_CONTENT } from './content';

export const templateSimulation: SimulationModule<
  TemplateState,
  TemplateConfig,
  TemplateStepLog
> = {
  metadata: {
    id: 'starter-template',
    title: 'Starter Simulation Template',
    shortDescription: 'Minimal reference implementation of the REC Labs Simulation Contract.',
    topicId: 'algorithms',
    category: 'Algorithms',
    tags: ['template', 'starter'],
    difficulty: 'Beginner',
    status: 'beta',
    version: '1.0.0',
    sdkVersion: '0.1.0',
    author: {
      name: 'REC Labs Core Team',
    },
  },
  content: TEMPLATE_CONTENT,
  defaultConfig: {
    stepSize: 2,
    maxLimit: 20,
  },
  createInitialState,
  step,
  reset: createInitialState,
  completionSummary: (state) => ({
    title: 'Simulation Complete',
    description: `Reached target limit with value ${state.currentValue} in ${state.totalSteps} steps.`,
  }),
  Visualization: TemplateVisualization,
  Controls: TemplateControls,
};

export * from './types';
export * from './logic';
export * from './content';

export default templateSimulation;
