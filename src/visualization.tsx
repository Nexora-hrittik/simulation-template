import React from 'react';
import { SimulationVisualizationProps } from '@rec-labs/sdk';
import { TemplateConfig, TemplateState, TemplateStepLog } from './types';

export const TemplateVisualization: React.FC<
  SimulationVisualizationProps<TemplateState, TemplateConfig, TemplateStepLog>
> = ({ state, config }) => {
  const progressPercent = Math.min(100, Math.round((state.currentValue / config.maxLimit) * 100));

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-xl border border-zinc-200">
      <div className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-2">
        Accumulator State Value
      </div>
      <div className="text-5xl font-mono font-bold text-zinc-900 mb-6">
        {state.currentValue}
      </div>

      <div className="w-full max-w-md bg-zinc-200 rounded-full h-3 overflow-hidden border border-zinc-300">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between w-full max-w-md mt-2 text-xs font-mono text-zinc-500">
        <span>0</span>
        <span>{progressPercent}% (Limit: {config.maxLimit})</span>
      </div>
    </div>
  );
};
