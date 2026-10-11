import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateSimulationModule,
  checkSDKCompatibility,
  useSimulationRuntime,
  ErrorFallback,
  Slider,
  SimulationPreviewHarness,
} from '@nexora-hrittik/sdk';
import { templateSimulation } from '../src/index';
import { TemplateConfig } from '../src/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('SDK Contract & Simulation Conformance', () => {
  it('exports all required runtime and UI primitives from canonical @nexora-hrittik/sdk', () => {
    expect(typeof useSimulationRuntime).toBe('function');
    expect(typeof ErrorFallback).toBe('function');
    expect(typeof Slider).toBe('function');
    expect(typeof SimulationPreviewHarness).toBe('function');
    expect(typeof validateSimulationModule).toBe('function');
    expect(typeof checkSDKCompatibility).toBe('function');
  });

  it('validates starter simulation successfully against the SDK validator', () => {
    const res = validateSimulationModule(templateSimulation);
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('declares an SDK version that satisfies SDK compatibility checks', () => {
    const compat = checkSDKCompatibility(templateSimulation.metadata.sdkVersion);
    expect(compat.status).toBe('compatible');
  });

  it('implements deterministic state machine lifecycle contract', () => {
    const config: TemplateConfig = {
      stepSize: 3,
      maxLimit: 9,
    };

    // 1. Initial State
    const s0 = templateSimulation.createInitialState(config);
    expect(s0.currentValue).toBe(0);
    expect(s0.totalSteps).toBe(0);
    expect(s0.isComplete).toBe(false);

    // 2. Step 1
    const r1 = templateSimulation.step(s0, config);
    expect(r1.nextState.currentValue).toBe(3);
    expect(r1.isComplete).toBe(false);
    expect(r1.stepLog?.action).toBe('INCREMENT');

    // 3. Step 2
    const r2 = templateSimulation.step(r1.nextState, config);
    expect(r2.nextState.currentValue).toBe(6);
    expect(r2.isComplete).toBe(false);

    // 4. Step 3 (Terminal state)
    const r3 = templateSimulation.step(r2.nextState, config);
    expect(r3.nextState.currentValue).toBe(9);
    expect(r3.isComplete).toBe(true);

    // 5. Post-terminal step (NOOP guard)
    const r4 = templateSimulation.step(r3.nextState, config);
    expect(r4.nextState.currentValue).toBe(9);
    expect(r4.isComplete).toBe(true);
    expect(r4.stepLog?.action).toBe('NOOP');

    // 6. Reset semantics
    if (templateSimulation.reset) {
      const resetState = templateSimulation.reset(config);
      expect(resetState.currentValue).toBe(0);
      expect(resetState.totalSteps).toBe(0);
      expect(resetState.isComplete).toBe(false);
    }

    // 7. Completion summary
    if (templateSimulation.completionSummary) {
      const summary = templateSimulation.completionSummary(r3.nextState, config);
      expect(summary.title).toBeTruthy();
      expect(summary.description).toContain('9');
    }
  });

  it('enforces dependency integrity with no local filesystem or obsolete SDK links', () => {
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    for (const [dep, ver] of Object.entries(allDeps)) {
      expect(ver).not.toMatch(/^file:/);
      expect(ver).not.toMatch(/^link:/);
      expect(dep).not.toBe('@rec-labs/sdk');
      expect(dep).not.toBe('@nexora/sdk');
    }

    expect(pkg.dependencies['@nexora-hrittik/sdk']).toBeDefined();
    expect(pkg.dependencies['@nexora-hrittik/sdk']).toMatch(/^\^0\./);
  });
});
