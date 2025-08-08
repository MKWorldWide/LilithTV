import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.css';
import { initTelemetry } from './core/telemetry.js';

// Initialize telemetry before bootstrapping the app.
initTelemetry();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
