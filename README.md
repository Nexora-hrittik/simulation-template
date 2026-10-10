# Nexora Simulation Template

Official contributor authoring starter template for building interactive, deterministic simulations for the **Nexora** learning ecosystem.

This repository provides a complete, runnable starter project with a built-in development harness, architectural boundary checks, and automated unit testing.

---

## 1. What the Template Provides

This starter project includes everything needed to develop, test, and package an interactive simulation:

- **Runnable Reference Implementation**: A fully functional discrete state counter satisfying the SDK contract.
- **Standalone Development Harness**: Built-in browser environment (`SimulationPreviewHarness`) powered by Vite with step controls, speed adjustment, state inspection, and live validation reporting.
- **Architectural Boundary Protection**: Pre-configured scanner (`scripts/check-boundary.js`) ensuring zero illegal imports from platform internals.
- **Automated Testing Suite**: Vitest test setup (`tests/logic.test.ts`) for headless testing of pure state transitions and boundary conditions.
- **Type Safety**: Strict TypeScript configuration (`tsconfig.json`) aligned with SDK interfaces.

---

## 2. Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js**: `v18.0.0` or higher (`v20+` or `v22+` LTS recommended).
- **npm**: `v9.0.0` or higher.
- **Git**: `v2.30.0` or higher.

Verify installed versions:

```bash
node -v
npm -v
git --version
```

---

## 3. Setup and Development Commands

Clone the template and start local development with these commands:

```bash
# 1. Clone this template into a new directory for your simulation
git clone https://github.com/Nexora-Hrittik/simulation-template.git my-simulation
cd my-simulation

# 2. Install dependencies
npm install

# 3. Start local development server with the interactive preview harness
npm run dev

# 4. Run automated test suite
npm test

# 5. Verify architectural boundaries (no platform leaks)
npm run check:boundary

# 6. Run TypeScript compiler typechecks
npm run typecheck

# 7. Build production assets
npm run build
```

When you run `npm run dev`, Vite opens a local server at `http://localhost:5173`. The standalone development harness mounts your simulation with playback controls, state inspection, and validation telemetry.

---

## 4. Starter Project Structure

```text
simulation-template/
├── package.json              # Package manifest and scripts
├── package-lock.json
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite bundler configuration
├── index.html                # Entrypoint HTML loading dev harness
├── LICENSE
├── README.md                 # This guide
├── docs/                     # Concept documentation
│   ├── 01-overview.md
│   └── 02-algorithm.md
├── scripts/
│   └── check-boundary.js     # Enforces zero platform shell imports
├── tests/
│   └── logic.test.ts         # Vitest unit tests for algorithmic logic
└── src/
    ├── index.ts              # Primary module export implementing SimulationModule
    ├── types.ts              # State, Config, and StepLog interfaces
    ├── logic.ts              # Pure state transition functions (createInitialState, step)
    ├── visualization.tsx     # React component rendering the visual stage
    ├── controls.tsx          # React component for user configuration inputs
    ├── content.ts            # Educational theory, formulas & references
    ├── dev.tsx               # Harness mount (<SimulationPreviewHarness />)
    ├── index.css             # Base styles and Tailwind imports
    └── env.d.ts              # Vite environment typings
```

---

## 5. Which Files to Modify First

Follow this recommended modification workflow when creating a new simulation:

1. **`src/types.ts`**: Define your domain data models:
   - `YourConfig`: Initial parameters (e.g., array size, target value, learning rate).
   - `YourState`: Complete snapshot of simulation execution state.
   - `YourStepLog`: Optional metadata logged after each step transition.
2. **`src/logic.ts`**: Implement pure functions:
   - `createInitialState(config)`: Constructs the deterministic starting state.
   - `step(state, config)`: Advances state by one step and returns `{ nextState, isComplete, stepLog }`.
3. **`tests/logic.test.ts`**: Write unit tests verifying state initialization, step progression, termination conditions, and edge cases.
4. **`src/visualization.tsx`**: Render your visual representation using the props passed by `SimulationVisualizationProps`.
5. **`src/controls.tsx`**: Add inputs, sliders, and selectors using `SimulationControlsProps` to allow learners to tweak parameters.
6. **`src/content.ts`**: Write rich educational explanations (`introduction`, `theory`, `howItWorks`, and `references`).
7. **`src/index.ts`**: Wire your components together into `SimulationModule` and update metadata (`id`, `title`, `difficulty`, `tags`, `author`).

---

## 6. How the Simulation Contract Works

The template implements the `SimulationModule` interface exported by the SDK. Here is how each part functions:

### Pure State Machine (`src/logic.ts`)

- **Deterministic Initialization**:
  ```typescript
  export function createInitialState(config: MyConfig): MyState {
    return { ... };
  }
  ```
- **Pure Step Transition**:
  ```typescript
  export function step(state: MyState, config: MyConfig): StepResult<MyState, MyStepLog> {
    // Pure function: NEVER mutate state in-place!
    const nextState = { ...state, count: state.count + 1 };
    const isComplete = nextState.count >= config.maxLimit;
    return { nextState, isComplete };
  }
  ```

### Visual Stage (`src/visualization.tsx`)

Receives current `state`, `config`, `isRunning`, `stepCount`, and `speedMs` from the runtime. It renders an accurate visual reflection of the current step:

```typescript
export const MyVisualization: React.FC<SimulationVisualizationProps<MyState, MyConfig>> = ({
  state,
  config,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl">
      {/* Visual stage elements */}
    </div>
  );
};
```

### Parameter Controls (`src/controls.tsx`)

Receives current `config`, `state`, and `onChangeConfig`. Use it to render inputs that allow learners to modify configuration:

```typescript
export const MyControls: React.FC<SimulationControlsProps<MyState, MyConfig>> = ({
  config,
  onChangeConfig,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Parameter inputs */}
    </div>
  );
};
```

### Module Definition (`src/index.ts`)

Ties metadata, educational content, state machine functions, and UI components into a single object:

```typescript
export const mySimulation: SimulationModule<MyState, MyConfig, MyStepLog> = {
  metadata: {
    id: 'my-simulation',
    title: 'My Interactive Simulation',
    shortDescription: 'Clear summary of the concept.',
    topicId: 'algorithms',
    category: 'Algorithms',
    tags: ['algorithm', 'interactive'],
    difficulty: 'Beginner',
    version: '1.0.0',
    sdkVersion: '0.1.0',
    author: { name: 'Your Name', github: 'your-handle' },
  },
  content: MY_CONTENT,
  defaultConfig: { ... },
  createInitialState,
  step,
  reset: createInitialState,
  Visualization: MyVisualization,
  Controls: MyControls,
};
```

---

## 7. Testing and Validation

Validate your simulation using both automated test scripts and visual inspection:

- **Automated Logic Tests**: Run `npm test` to execute Vitest suites. Assert that calculations are exact and state transitions do not cause runtime errors.
- **Architectural Boundary Check**: Run `npm run check:boundary`. This script ensures that no platform shell imports (such as `src/`, `@heroui`, or `../../`) have leaked into your code.
- **Type Checking**: Run `npm run typecheck` to verify that all types conform strictly to SDK definitions.
- **Production Asset Build**: Run `npm run build` to confirm that TypeScript compilation and Vite asset bundling succeed.
- **Visual & Interactive Validation**: Run `npm run dev` and open `http://localhost:5173`. Test interactive sliders, start/pause playback, verify reset behavior, and check responsiveness.

---

## 8. Checking SDK Compatibility

The standalone development harness automatically tests your simulation module against the SDK runtime contract:

1. **Module Validation**: The harness invokes `validateSimulationModule(module)` to ensure required metadata, content sections, and pure functions exist.
2. **Version Compatibility**: The harness calls `checkSDKCompatibility(module.metadata.sdkVersion)`:
   - For pre-1.0 SDK versions (`0.x`), compatibility requires matching minor versions (e.g., SDK `0.1.0` is compatible with simulation requiring `0.1.0`).
   - For `>= 1.0.0`, compatibility requires matching major versions.
3. **Validation Badge**: The harness header renders a live badge (`COMPATIBLE`, `UNKNOWN`, or `INCOMPATIBLE`) along with any errors or warnings.

---

## 9. Turning Your Starter Project into a Contribution

When your simulation is complete and verified:

1. **Verify All Checks Pass**:
   ```bash
   npm test
   npm run check:boundary
   npm run typecheck
   npm run build
   ```
2. **Ensure Unique Metadata**: Ensure `metadata.id` in `src/index.ts` is unique and matches the folder name you intend to use.
3. **Fork the Simulations Catalog**:
   - Fork and clone the official catalog: [Nexora-Hrittik/simulations](https://github.com/Nexora-Hrittik/simulations).
   - Copy your simulation project directory into the catalog under `simulations/<your-simulation-id>/`.
4. **Follow Catalog Contribution Instructions**:
   - Consult the [Simulations Contribution Guide](https://github.com/Nexora-Hrittik/simulations#5-choose-your-contribution-path) for pull request steps.

> [!NOTE]
> **Already Have a Simulation Built Elsewhere?**
> You are **not required** to recreate existing work using this template. As long as your simulation satisfies the SDK `SimulationModule` contract and passes boundary checks, you can contribute it directly following **Path B** in the [Simulations README](https://github.com/Nexora-Hrittik/simulations#path-b-contribute-a-simulation-already-built-elsewhere).

---

## 10. Ecosystem Links

- **Simulations Catalog**: [Nexora-Hrittik/simulations](https://github.com/Nexora-Hrittik/simulations) — Browse existing simulations and contribute new ones.
- **Simulation SDK**: [Nexora-Hrittik/sdk](https://github.com/Nexora-Hrittik/sdk) — Core runtime interfaces, UI primitives, and validation contracts.

---

## License

This template is licensed under the [MIT License](LICENSE).
