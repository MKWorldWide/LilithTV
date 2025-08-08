import 'dotenv/config';
import fetch from 'node-fetch';
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  type Interaction
} from 'discord.js';
import { scheduleNightlyCouncilReport, sendCouncilReport } from './nightlyReport.js';
import { scheduleHandshakes } from './handshake.js';

// Discord client with basic guild + message intents
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Registers slash commands including council report manual trigger
const commands = [
  new SlashCommandBuilder()
    .setName('council')
    .setDescription('ShadowFlower council utilities')
    .addSubcommandGroup((group) =>
      group
        .setName('report')
        .setDescription('Council reporting tools')
        .addSubcommand((sub) => sub.setName('now').setDescription('Send council report immediately'))
    )
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

async function registerCommands() {
  await rest.put(
    Routes.applicationGuildCommands(process.env.OWNER_ID!, process.env.GUILD_ID!),
    { body: commands.map((c) => c.toJSON()) }
  );
}

// Relays raw Discord messages to the VRChat bridge for guardian reactions
async function relayToUnity(from: string, message: string) {
  try {
    await fetch(`${process.env.MCP_URL}/osc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '/lilybear/whisper', value: `${from}:${message}` })
    });
  } catch (e) {
    console.error('relayToUnity error', e);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
  scheduleNightlyCouncilReport(client);
  scheduleHandshakes();
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'council') {
    const group = interaction.options.getSubcommandGroup(false);
    const sub = interaction.options.getSubcommand(false);
    if (group === 'report' && sub === 'now') {
      await interaction.reply({ content: 'Dispatching council report…', ephemeral: true });
      await sendCouncilReport(client);
    }
  }
});

client.on('messageCreate', async (msg) => {
  if (!msg.guild || msg.author.bot) return;
  await relayToUnity(msg.author.username, msg.content);
});

// Bootstrap bot
registerCommands()
  .then(() => client.login(process.env.DISCORD_TOKEN))
  .catch((e) => console.error('startup error', e));
