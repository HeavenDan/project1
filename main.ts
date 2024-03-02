import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';

const CLIENT_ID:string="738073415948304407"
const TOKEN:string="NzM4MDczNDE1OTQ4MzA0NDA3.GA4bqV.Tr4Xcy3HcLQJdDFiGn2xqHIX_bOSCa_TbiTvX0";
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const main = async () => {

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    
    try {
      console.log('Started refreshing application (/) commands.');
    
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    client.on('ready', () => {
      console.log(`Logged in as ${client.user!.tag}!`);
    });
    
    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
    
      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });
    client.login(TOKEN);
}

main()