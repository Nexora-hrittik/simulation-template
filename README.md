# Nexora Simulation Template

Official contributor authoring starter template for building interactive, deterministic simulations for the **Nexora** learning ecosystem.

This repository provides a complete, runnable starter project with a built-in standalone development harness, architectural boundary checks, and automated unit testing.

---

## 1. What the Template Provides

This starter project includes everything needed to develop, test, and package an interactive simulation:

- **Runnable Reference Implementation**: A fully functional discrete state counter satisfying the SDK contract.
- **Standalone Development Harness**: Built-in browser environment (`SimulationPreviewHarness`) powered by Vite with step controls, speed adjustment, state inspection, and live validation reporting.
- **Architectural Boundary Protection**: Pre-configured scanner (`scripts/check-boundary.js`) ensuring zero illegal imports from platform internals or unauthorized libraries.
- **Automated Testing Suite**: Vitest test setup (`tests/logic.test.ts`) for headless testing of pure state transitions and boundary conditions.
- **Type Safety**: Strict TypeScript configuration (`tsconfig.json`) aligned directly with `@nexora-hrittik/sdk` interfaces.

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

## 3. Quick Start: One-Time Setup Script

The cleanest approach to initialize your simulation is a single copy-paste setup script that creates the project, installs dependencies, detaches from the template's Git history, initializes your own repository, and runs initial validation.

*(Note: Creating your GitHub repository and opening a pull request still require explicit manual steps).*

### Step 1: Run the Interactive Setup Script

Copy and paste this script into your terminal. It will prompt you for your project name and (optionally) your GitHub username:

```bash
bash -c '
set -e

# 1. Prompt for project name (with default)
printf "Enter simulation project name [binary-search-visualizer]: "
read -r PROJECT_NAME </dev/tty
PROJECT_NAME="${PROJECT_NAME:-binary-search-visualizer}"

if [ -d "$PROJECT_NAME" ]; then
  echo "Error: Directory \"$PROJECT_NAME\" already exists."
  exit 1
fi

# 2. Prompt for optional GitHub username
printf "Enter your GitHub username (optional, press Enter to skip): "
read -r GITHUB_USERNAME </dev/tty

# 3. Check prerequisites
for cmd in git node npm; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "Error: \"$cmd\" is not installed or not in PATH."
    exit 1
  }
done

# 4. Clone template and detach from template history
git clone \
  https://github.com/Nexora-Hrittik/simulation-template.git \
  "$PROJECT_NAME"

cd "$PROJECT_NAME"
rm -rf .git

# 5. Initialize fresh git repository
git init
git branch -M main

# 6. Install dependencies and run baseline validation
npm install
npm run check:boundary
npm run typecheck
npm test
npm run build

# 7. Configure remote origin if GitHub username was provided
if [ -n "$GITHUB_USERNAME" ]; then
  git remote add origin "https://github.com/${GITHUB_USERNAME}/${PROJECT_NAME}.git"
fi

# 8. Create initial commit
git add .
git commit -m "chore: initialize simulation project"

echo
echo "============================================================"
echo "  Simulation project initialized successfully!"
echo "  Location: $(pwd)"
echo "============================================================"
echo
echo "Next steps:"
echo "1. Start local development:"
echo "   cd $PROJECT_NAME"
echo "   npm run dev"
echo
if [ -n "$GITHUB_USERNAME" ]; then
  echo "2. Create an empty repository named \"$PROJECT_NAME\" on GitHub:"
  echo "   https://github.com/new"
  echo
  echo "3. Push your initial commit to GitHub:"
  echo "   git push -u origin main"
else
  echo "2. (Optional) Connect to GitHub when ready:"
  echo "   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/$PROJECT_NAME.git"
  echo "   git push -u origin main"
fi
'
```

> [!TIP]
> This setup script immediately runs the boundary checks, typechecks, vitest suite, and build. It stops deterministically if any step fails instead of proceeding silently.

### Step 2: Connect the Project to Your GitHub Account

1. Create an empty repository named after your project (e.g., `binary-search-visualizer`) on your GitHub account via [github.com/new](https://github.com/new). Do not initialize it with a README, license, or `.gitignore`, as the template already supplies them.
2. Push your initial commit:
   - **If you entered your GitHub username in the script**, `origin` is already configured:
     ```bash
     cd <your-project-name>
     git push -u origin main
     ```
   - **If you skipped entering your GitHub username**, add the remote origin first:
     ```bash
     cd <your-project-name>
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/<your-project-name>.git
     git push -u origin main
     ```

*(Authenticate via GitHub CLI `gh auth login` or standard Git credentials if prompted).*

---

## 4. Development Workflow

Start local development by launching the interactive standalone harness:

```bash
npm run dev
```

Open `http://localhost:5173`. Keep the development server running while editing your simulation. The built-in preview harness mounts your simulation with live playback controls, state inspection, and validation telemetry.

### Typical Development Cycle

1. **State & Logic (`src/types.ts` & `src/logic.ts`)**: Define data models and implement deterministic, pure state transitions (`createInitialState`, `step`).
2. **Visual Stage (`src/visualization.tsx`)**: Render your visual representation using props supplied by `SimulationVisualizationProps`.
3. **Controls & Theory (`src/controls.tsx` & `src/content.ts`)**: Add input controls for interactive tweaking and write pedagogical explanations.
4. **Unit Testing (`tests/logic.test.ts`)**: Write and run Vitest tests covering edge cases and completion criteria.
5. **Commit Progress**:
   ```bash
   git add .
   git commit -m "feat: implement simulation step logic"
   git push
   ```

---

## 5. Starter Project Structure

```text
simulation-template/
├── package.json              # Package manifest and scripts (@nexora-hrittik/simulation-template)
├── package-lock.json
├── tsconfig.json             # Strict TypeScript compiler configuration
├── vite.config.ts            # Vite bundler configuration
├── index.html                # Entrypoint HTML loading the standalone dev harness
├── LICENSE                   # MIT License
├── README.md                 # This guide
├── docs/                     # Concept documentation
│   ├── 01-overview.md
│   └── 02-algorithm.md
├── scripts/
│   ├── check-boundary.js     # Enforces zero platform shell imports & local dependency boundaries
│   └── validate-metadata.js  # Validates simulation metadata and canonical topic taxonomy
├── tests/
│   ├── contract.test.ts      # Automated SDK contract, API, and boundary tests
│   ├── harness.test.tsx      # Standalone preview harness visual & DOM invariants
│   └── logic.test.ts         # Vitest unit tests for algorithmic logic
└── src/
    ├── index.ts              # Primary module export implementing SimulationModule
    ├── types.ts              # State, Config, and StepLog interfaces
    ├── logic.ts              # Pure state transition functions (createInitialState, step)
    ├── visualization.tsx     # React component rendering the visual stage
    ├── controls.tsx          # React component for user configuration inputs
    ├── content.ts            # Educational theory, formulas & references
    ├── dev.tsx               # Harness mount (<SimulationPreviewHarness />)
    ├── index.css             # Base styles, Tailwind imports, and typography tokens
    └── env.d.ts              # Vite environment typings
```

---

## 6. How the Simulation Contract Works

The template implements the `SimulationModule` interface exported by `@nexora-hrittik/sdk`. Here is how each part functions:

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

### Module Definition & Canonical Topic Taxonomy (`src/index.ts`)

Ties metadata, educational content, state machine functions, and UI components into a single export:

```typescript
export const mySimulation: SimulationModule<MyState, MyConfig, MyStepLog> = {
  metadata: {
    id: 'my-simulation',
    title: 'My Interactive Simulation',
    shortDescription: 'Clear summary of the concept.',
    topicId: 'algorithms',        // Canonical topic identifier (see taxonomy below)
    category: 'Algorithms',       // Derived display title
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

#### Canonical Topic Taxonomy

REC Labs enforces an authoritative taxonomy of official topic identifiers. Your `metadata.topicId` must be one of:

| `topicId` (Machine Identifier) | Display Category | Focus Discipline |
| :--- | :--- | :--- |
| `algorithms` | **Algorithms** | Sorting, searching, pathfinding, dynamic programming, complexity |
| `machine-learning` | **Machine Learning** | Perceptrons, gradient descent, neural models, decision spaces |
| `data-structures` | **Data Structures** | Trees, graphs, heaps, stacks, balanced hierarchies |
| `computer-systems` | **Computer Systems** | CPU scheduling, virtual memory paging, cache hierarchies |
| `networking` | **Computer Networks** | Packet routing, TCP flow control, socket handshakes, subnets |

> [!IMPORTANT]
> **Predefined Taxonomy & Automated Categorization**:
> - `topicId` is the single source of truth for categorization. The catalog discovery engine automatically associates your simulation with its human-readable category and updates category counts dynamically.
> - Contributors **never edit central category lists, arrays, or registries**.
> - Contributors cannot invent arbitrary new official topic IDs. Adding a new topic is an intentional, maintainer-governed change.

---

## 7. Mandatory Validation Checks

Before submitting your simulation, verify that all validation checks pass:

```bash
# 1. Validate simulation metadata and canonical topic conformance
npm run validate:metadata

# 2. Run automated unit tests for state logic and harness invariants
npm test

# 3. Verify zero platform leaks escape the package boundary
npm run check:boundary

# 4. Strict TypeScript compiler verification
npm run typecheck

# 5. Build standalone production assets
npm run build
```

### What Each Check Verifies

- **`npm run validate:metadata`**: Verifies that `metadata` in `src/index.ts` contains all required fields (`id`, `title`, `shortDescription`, `topicId`, `difficulty`, `version`, `tags`) and uses an authoritative canonical topic ID.
- **`npm test`**: Executes Vitest test suites, asserting algorithmic correctness, state immutability, step counting, and harness accessibility invariants.
- **`npm run check:boundary`**: Scans all source files (`.ts`, `.tsx`, `.js`, `.jsx`) with `scripts/check-boundary.js` to ensure no illegal imports escape the simulation boundary (e.g., zero imports from `@heroui/*` or platform internals).
- **`npm run typecheck`**: Runs `tsc --noEmit` against `tsconfig.json` to guarantee strict type safety against the `@nexora-hrittik/sdk` interfaces.
- **`npm run build`**: Compiles TypeScript and runs Vite production bundling to verify that standalone assets build cleanly.

> [!NOTE]
> All checks must pass with exit code `0`. These checks prove that the simulation runs properly as an isolated, standalone module ready for automated catalog intake.

---

## 8. Checking SDK Compatibility

The standalone development harness automatically verifies your simulation module against the SDK runtime contract:

1. **Module Validation**: The harness invokes `validateSimulationModule(module)` to ensure required metadata, content sections, and pure functions exist.
2. **Version Compatibility**: The harness calls `checkSDKCompatibility(module.metadata.sdkVersion)`:
   - For pre-1.0 SDK versions (`0.x`), compatibility requires matching minor versions (e.g., SDK `0.1.0` is compatible with simulation requiring `0.1.0`).
   - For `>= 1.0.0`, compatibility requires matching major versions.
3. **Validation Badge**: The harness header renders a live badge (`COMPATIBLE`, `UNKNOWN`, or `INCOMPATIBLE`) along with any errors or warnings.

---

## 9. Common Installation and Import Troubleshooting

| Symptom / Error | Root Cause | Solution |
| :--- | :--- | :--- |
| `Cannot find module '@rec-labs/sdk'` or `'@nexora/sdk'` | Obsolete package scope. The official package scope is `@nexora-hrittik/sdk`. | Replace obsolete import paths with `@nexora-hrittik/sdk`. |
| `Cannot find module .../sdk` or broken `file:` dependency | Sibling repository dependency (`file:../sdk`). | The template is independently installable. Ensure `package.json` specifies `"@nexora-hrittik/sdk": "^0.1.0"` and run `npm install`. |
| `npm ci` fails due to lockfile mismatch | `package-lock.json` out of sync with `package.json`. | Run `npm install` to update `package-lock.json` deterministically, then verify with `npm ci`. |
| `[BOUNDARY VIOLATION]` during `npm run check:boundary` | Direct import from platform internals (`@heroui`, `../../src`, `@rec-labs/*`). | Use standard SDK components and primitives from `@nexora-hrittik/sdk` or local template utilities. |
| Incompatible SDK version warning | Simulation specifies an `sdkVersion` incompatible with installed SDK. | Ensure `metadata.sdkVersion` matches the installed major/minor version (e.g. `"0.1.0"`). |

---

## 10. Contributor vs. Maintainer Responsibilities

| Responsibility Area | Contributor Scope | Maintainer Scope |
| :--- | :--- | :--- |
| **SDK Development** | Consumes published `@nexora-hrittik/sdk` package; reports contract bugs. | Authors, versions, tests, and publishes official `@nexora-hrittik/sdk` releases to npm. |
| **Simulation Authoring** | Implements simulation logic, visualization, parameters, and metadata against template. | Establishes pedagogical guidelines, visual design specifications, and taxonomy definitions. |
| **Quality Verification** | Runs and passes `npm test`, `npm run check:boundary`, `npm run typecheck`, and `npm run build`. | Reviews pull requests and enforces CI conformance across the entire catalog. |
| **Catalog Integration** | Copies verified simulation directory to `simulations/<id>` and submits PR. | Approves PR, tags catalog releases, and deploys to the official REC Labs platform. |

---

## 11. Submitting Your Simulation to REC Labs

When your simulation is completed and verified:

1. **Fork the Official Catalog**:
   - Go to [Nexora-Hrittik/simulations](https://github.com/Nexora-Hrittik/simulations) on GitHub and click **Fork**.
2. **Clone Your Fork and Create a Feature Branch**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/simulations.git
   cd simulations
   git checkout -b add-my-simulation
   ```
3. **Copy Your Simulation into the Catalog**:
   - Copy your completed project folder into `simulations/<your-simulation-id>/`.
   - Ensure `metadata.id` in `src/index.ts` matches the directory name `<your-simulation-id>`.
4. **Preserve Protected Simulation Directories**:
   - Do **not** modify or overwrite existing simulation directories (`binary-search`, `counter`, `perceptron`).
5. **Run Catalog-Wide Validation**:
   ```bash
   npm install
   npm test
   npm run check:boundary
   npm run typecheck
   npm run build
   ```
6. **Push and Open a Pull Request**:
   ```bash
   git add simulations/<your-simulation-id>
   git commit -m "feat(simulations): add <your-simulation-id> simulation"
   git push -u origin add-my-simulation
   ```
   Open a pull request against `Nexora-Hrittik/simulations`.
7. **Maintainer Review & Upstream Release**:
   - Merging accepts your simulation into the catalog.
   - Upstream platform packaging and registry publishing are managed by platform maintainers during scheduled releases.

---

## 12. Future Roadmap: Single-Command Scaffolding

While the setup script in [Section 3](#3-quick-start-one-time-setup-script) automates local initialization today, the planned long-term developer experience is a single command:

```bash
npx create-rec-labs-simulation binary-search-visualizer
```

This utility will scaffold the directory, install dependencies, configure Git remotes, prompt for simulation metadata, and integrate directly with automated catalog submission pipelines once upstream catalog integration mechanics are finalized.

---

## 13. Ecosystem Links

- **Simulations Catalog**: [Nexora-Hrittik/simulations](https://github.com/Nexora-Hrittik/simulations) — Browse existing simulations and contribute new ones.
- **Simulation SDK**: [Nexora-Hrittik/sdk](https://github.com/Nexora-Hrittik/sdk) — Core runtime interfaces, UI primitives, and validation contracts.

---

## License

This template is licensed under the [MIT License](LICENSE).
