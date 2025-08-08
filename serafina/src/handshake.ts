// Uses global `fetch` provided by Node 20; no extra dependency needed.

// Parses HANDSHAKE_URLS into a clean list. Exposed for testing.
export function getHandshakeTargets(): string[] {
  return (process.env.HANDSHAKE_URLS || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// Sends a minimal handshake payload to each sibling service.
export async function runHandshake(): Promise<void> {
  const targets = getHandshakeTargets();
  await Promise.all(
    targets.map(async (url) => {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Identify this repo so peers know who's calling.
          body: JSON.stringify({ repo: 'Serafina', ts: new Date().toISOString() })
        });
      } catch (err) {
        // Soft fail: log but do not throw to keep the bot alive.
        console.error('handshake error', url, err);
      }
    })
  );
}

// Periodically performs the handshake to maintain a mesh between repos.
export function scheduleHandshakes(): void {
  // Run immediately then every hour to reduce staleness.
  runHandshake();
  setInterval(runHandshake, 60 * 60 * 1000);
}
