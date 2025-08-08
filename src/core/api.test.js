import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWithRetry, clearCache } from './api.js';

describe('fetchWithRetry', () => {
  beforeEach(() => {
    clearCache();
  });

  it('caches responses', async () => {
    const mockData = { ping: 'pong' };
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: () => Promise.resolve(mockData) });
    global.fetch = fetchMock;
    const url = 'https://example.com';
    await fetchWithRetry(url, {}, { cacheKey: 'test', ttl: 1000 });
    await fetchWithRetry(url, {}, { cacheKey: 'test', ttl: 1000 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('retries on failure', async () => {
    const mockData = { ok: true };
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockData) });
    global.fetch = fetchMock;
    const data = await fetchWithRetry('https://example.com', {}, {
      retries: 1,
      backoff: 0,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(data).toEqual(mockData);
  });
});
