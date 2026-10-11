import type { FC } from 'react';
import type { SimulationVisualizationProps } from '@nexora-hrittik/sdk';
import type { TemplateConfig, TemplateState, TemplateStepLog } from './types';

export const TemplateVisualization: FC<
  SimulationVisualizationProps<TemplateState, TemplateConfig, TemplateStepLog>
> = ({ state, config }) => {
  const progressPercent = Math.min(100, Math.round((state.currentValue / config.maxLimit) * 100));

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center p-3 sm:p-4">
      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
        Accumulator State Value
      </div>
      <div className="text-6xl sm:text-7xl font-mono font-bold text-zinc-950 tracking-tight mb-6">
        {state.currentValue}
      </div>

      <div className="w-full max-w-md bg-zinc-100 rounded-full h-3.5 overflow-hidden border border-zinc-200/90 p-0.5 shadow-2xs">
        <div
          className="bg-zinc-900 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between w-full max-w-md mt-3 text-xs font-mono text-zinc-500 font-medium">
        <span>0</span>
        <span className="font-bold text-zinc-900">{progressPercent}%</span>
        <span>Limit: {config.maxLimit}</span>
      </div>
    </div>
  );
};
