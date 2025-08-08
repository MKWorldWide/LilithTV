import { fetchWithRetry } from './api.js';
import { getTracer } from './telemetry.js';

// In-memory cache key prefix to avoid collisions with other API caches
const GEMINI_CACHE_PREFIX = 'gemini:';

/**
 * Ask Gemini model for a text response.
 * Adds retry logic, exponential backoff, and caching.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function askGemini(prompt) {
  const query = String(prompt);
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' +
    process.env.GEMINI_API_KEY;
  const tracer = getTracer();
  const span = tracer.startSpan('askGemini');
  try {
    const data = await fetchWithRetry(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
        }),
      },
      {
        cacheKey: GEMINI_CACHE_PREFIX + query,
        ttl: 60_000, // cache responses for one minute
      }
    );
    span.setAttribute('prompt.length', query.length);
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '[No response]';
  } catch (err) {
    span.recordException(err);
    console.error('Gemini request failed', err);
    return '[Error contacting Gemini]';
  } finally {
    span.end();
  }
}
