import React, { useEffect, useState } from 'react';
import { fetchWithRetry } from '../core/api.js';

/**
 * Shows latest messages from a Discord channel.
 */
export default function DiscordFeedWidget({ channelId = '0' }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchWithRetry(
          `https://discord.com/api/v10/channels/${channelId}/messages`,
          {
            headers: {
              Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
          },
          { cacheKey: `discord:${channelId}`, ttl: 5000 }
        );
        setMessages(data.slice(0, 3));
      } catch (err) {
        console.error('Discord fetch failed', err);
      }
    }
    load();
  }, [channelId]);

  return (
    <div className="widget discord-feed-widget">
      {messages.map((m) => (
        <div key={m.id}>
          {m.author?.username}: {m.content}
        </div>
      ))}
    </div>
  );
}
