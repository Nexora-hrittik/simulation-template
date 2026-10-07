# REC Labs Simulation Template

The official contributor template for creating new interactive, deterministic simulations for **REC Labs**.

---

## Quickstart

```bash
# 1. Clone this template
git clone https://github.com/REC-Labs/simulation-template.git my-simulation
cd my-simulation

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run automated test suite
npm test

# 5. Verify architectural boundaries (no platform leaks)
npm run check:boundary
```

---

## Architectural Rules

1. **Pure State Transitions**:
   - `createInitialState(config)` must be a pure function.
   - `step(state, config)` must be a pure function returning `{ nextState, isComplete, stepLog }`.
   - Never perform side effects or mutate state in-place.
2. **Zero Platform Imports**:
   - Simulations communicate with the platform strictly through `@rec-labs/sdk`.
   - Never import from the platform shell (`src/`, `@heroui`, etc.).
3. **Submitting for Integration**:
   - When ready, open a Pull Request against [REC-Labs/simulations](https://github.com/REC-Labs/simulations) with your simulation placed under `simulations/<name>/`.
