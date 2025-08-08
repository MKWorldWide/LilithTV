# Serafina

Discord router bot powering ShadowFlower council integrations.

## Setup

```bash
cd serafina
npm install
npm run build
npm start
```

Provide configuration via `.env`:

```
DISCORD_TOKEN=...
OWNER_ID=...
GUILD_ID=...
MCP_URL=...
CHN_COUNCIL=...
HANDSHAKE_URLS=https://a.example/handshake,https://b.example/handshake
NAV_REPOS=owner/repo,owner/repo
WH_LILYBEAR=https://discord.com/api/webhooks/... (optional)
```

## Slash Commands

- `/council report now` — immediately generates a council report and posts it.

Raw Discord messages are relayed to the VRChat bridge at `MCP_URL/osc` for guardian reactions.

The optional `HANDSHAKE_URLS` allows Serafina to periodically ping sibling services to maintain a cross-repo mesh.
