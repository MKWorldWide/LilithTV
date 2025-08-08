import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Client } from 'discord.js';

vi.mock('node-fetch', () => ({ default: vi.fn() }));
vi.mock('dotenv/config', () => ({}));
vi.mock('discord.js', () => {
  class EmbedBuilder {
    data: any = {};
    setTitle(t: string) { this.data.title = t; return this; }
    setDescription(d: string) { this.data.description = d; return this; }
    setColor(c: number) { this.data.color = c; return this; }
    addFields(...fields: any[]) { this.data.fields = fields; return this; }
    setFooter(f: any) { this.data.footer = f; return this; }
    setTimestamp(date: Date) { this.data.timestamp = date; return this; }
    toJSON() { return { ...this.data }; }
  }
  return { EmbedBuilder, TextChannel: class {}, Client: class {} };
});
vi.mock('node-cron', () => ({ default: { schedule: vi.fn() }, schedule: vi.fn() }));

// Stub Discord client with minimal channel cache for tests
function createMockClient() {
  const send = vi.fn();
  const channels = { cache: new Map([[process.env.CHN_COUNCIL!, { send }]]) } as any;
  return { channels, __send: send } as unknown as Client & { __send: typeof send };
}

// Helper to prepare environment and mocks before each test
function setupEnv() {
  process.env.MCP_URL = 'https://mcp.example';
  process.env.CHN_COUNCIL = '42';
  process.env.NAV_REPOS = 'owner/repo';
  delete process.env.WH_LILYBEAR;
}

describe('sendCouncilReport', () => {
  let fetchMock: any;

  beforeEach(async () => {
    setupEnv();
    vi.resetModules();
    fetchMock = (await import('node-fetch')).default as any;
    fetchMock.mockReset();
  });

  it('posts an embed to the council channel', async () => {
    fetchMock
      // MCP status
      .mockResolvedValueOnce({ json: async () => ({ response: 'all good' }) })
      // Repo commits
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ sha: 'abcdef0', commit: { message: 'init' } }]
      });

    const { sendCouncilReport } = await import('./nightlyReport.js');
    const client = createMockClient();
    await sendCouncilReport(client);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const sendCalls = (client as any).__send.mock.calls;
    expect(sendCalls.length).toBe(1);
    const payload = sendCalls[0][0];
    expect(payload.embeds[0].data.title).toBe('🌙 Nightly Council Report');
  });
});
