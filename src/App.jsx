import React, { useEffect, useState } from 'react';
import Overlay from './components/Overlay.jsx';
import { startListening } from './core/voice.js';
import { connectChat } from './core/chat.js';
import { loadPlugins } from './core/plugins.js';

/**
 * Root application component with simple state management.
 */
export default function App() {
  const [overlay, setOverlay] = useState('');
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    // Start voice recognition and display responses on overlay
    startListening((reply) => {
      setOverlay(reply);
      setTimeout(() => setOverlay(''), 10_000);
    });

    let disconnect = () => {};
    async function init() {
      try {
        const res = await fetch('/lilithtv.config.json');
        const cfg = await res.json();
        disconnect = connectChat(cfg.chat_stream_url, (msg) => {
          if (msg?.text) {
            setOverlay(msg.text);
            setTimeout(() => setOverlay(''), 10_000);
          }
        });
        loadPlugins(cfg.plugins).then(setPlugins);
      } catch (err) {
        console.error('Failed to load config', err);
      }
    }
    init();
    return () => disconnect();
  }, []);

  return (
    <div className="app">
      <Overlay message={overlay} />
      {plugins.map((p) => (
        <p.Component key={p.name} />
      ))}
    </div>
  );
}
