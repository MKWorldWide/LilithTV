import React, { useState } from 'react';
import { controlTV } from '../modules/smartThings.js';

/**
 * Minimal now-playing controller demonstrating reactive media state.
 */
export default function NowPlayingWidget() {
  const [status, setStatus] = useState('stopped');

  const play = async () => {
    const ok = await controlTV('play');
    if (ok) setStatus('playing');
  };
  const pause = async () => {
    const ok = await controlTV('pause');
    if (ok) setStatus('paused');
  };

  return (
    <div className="widget now-playing-widget">
      <div>Playback: {status}</div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}
