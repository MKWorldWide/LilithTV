import { fetchWithRetry } from '../core/api.js';

// Prevent hammering SmartThings with identical commands
const commandCache = new Map();

/**
 * Send a media playback command to SmartThings API with retry/backoff.
 * Throttles duplicate commands for two seconds.
 * @param {string} command
 * @returns {Promise<boolean>}
 */
export async function controlTV(command) {
  const token = process.env.SMARTTHINGS_TOKEN;
  const url = `https://api.smartthings.com/v1/devices/YOUR-TV-ID/commands`;
  const last = commandCache.get(command);
  if (last && Date.now() - last < 2000) return true;
  try {
    await fetchWithRetry(
      url,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: [
            {
              component: 'main',
              capability: 'mediaPlayback',
              command, // e.g., "pause", "play"
            },
          ],
        }),
      },
      { retries: 2 }
    );
    commandCache.set(command, Date.now());
    return true;
  } catch (err) {
    console.error('SmartThings command failed', err);
    return false;
  }
}
