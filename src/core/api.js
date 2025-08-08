const cache = new Map();

/**
 * Fetch wrapper with retry/backoff and optional caching.
 * @param {string} url - request URL
 * @param {RequestInit} options - fetch options
 * @param {object} opts - extra behavior
 * @param {number} opts.retries - number of retries
 * @param {number} opts.backoff - base backoff in ms
 * @param {string} [opts.cacheKey] - key used for in-memory caching
 * @param {number} [opts.ttl] - cache time-to-live in ms
 */
export async function fetchWithRetry(
  url,
  options = {},
  { retries = 3, backoff = 300, cacheKey, ttl = 0 } = {}
) {
  if (cacheKey && cache.has(cacheKey)) {
    const { expiry, data } = cache.get(cacheKey);
    if (!expiry || expiry > Date.now()) {
      return data;
    }
    cache.delete(cacheKey);
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (cacheKey) {
        cache.set(cacheKey, {
          data,
          expiry: ttl ? Date.now() + ttl : 0,
        });
      }
      return data;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, backoff * 2 ** attempt));
    }
  }
}

export function clearCache() {
  cache.clear();
}
