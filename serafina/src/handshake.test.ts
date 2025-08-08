import { describe, expect, it } from 'vitest';
import { getHandshakeTargets } from './handshake.js';

describe('getHandshakeTargets', () => {
  it('splits and trims URLs', () => {
    process.env.HANDSHAKE_URLS = ' https://a.com ,https://b.com, ';
    expect(getHandshakeTargets()).toEqual(['https://a.com', 'https://b.com']);
  });
});
