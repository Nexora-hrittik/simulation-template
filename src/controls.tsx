import type { FC } from 'react';
import type { SimulationControlsProps } from '@nexora-hrittik/sdk';
import type { TemplateConfig, TemplateState } from './types';

interface CompactSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (val: number) => void;
}

const CompactSlider: FC<CompactSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  disabled = false,
  onChange,
}) => (
  <div className="flex flex-col gap-1.5 text-xs">
    <div className="flex justify-between items-center text-zinc-700">
      <label className="font-medium text-xs text-zinc-700 select-none">{label}</label>
      <span className="font-mono text-[11px] font-bold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 shadow-2xs min-w-6 text-center">
        {value}
      </span>
    </div>
    <div className="flex items-center pt-0.5">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 transition-all"
      />
    </div>
  </div>
);

export const TemplateControls: FC<SimulationControlsProps<TemplateState, TemplateConfig>> = ({
  config,
  onChangeConfig,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-3.5">
      <CompactSlider
        label="Step Increment"
        value={config.stepSize}
        min={1}
        max={10}
        step={1}
        disabled={disabled}
        onChange={(val) => onChangeConfig({ stepSize: val })}
      />
      <CompactSlider
        label="Maximum Limit"
        value={config.maxLimit}
        min={10}
        max={100}
        step={10}
        disabled={disabled}
        onChange={(val) => onChangeConfig({ maxLimit: val })}
      />
    </div>
  );
};
