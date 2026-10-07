import React from 'react';
import { SimulationControlsProps, Slider } from '@rec-labs/sdk';
import { TemplateConfig, TemplateState } from './types';

export const TemplateControls: React.FC<SimulationControlsProps<TemplateState, TemplateConfig>> = ({
  config,
  onChangeConfig,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-zinc-200">
      <Slider
        label="Step Increment"
        value={config.stepSize}
        min={1}
        max={10}
        step={1}
        unit=""
        disabled={disabled}
        onChange={(val) => onChangeConfig({ stepSize: val })}
      />
      <Slider
        label="Maximum Limit"
        value={config.maxLimit}
        min={10}
        max={100}
        step={10}
        unit=""
        disabled={disabled}
        onChange={(val) => onChangeConfig({ maxLimit: val })}
      />
    </div>
  );
};
