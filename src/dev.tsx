import React from 'react';
import ReactDOM from 'react-dom/client';
import { SimulationPreviewHarness } from '@nexora-hrittik/sdk';
import { templateSimulation } from './index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimulationPreviewHarness module={templateSimulation} />
  </React.StrictMode>
);
