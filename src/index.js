const Discord = require('discord.js');

const bot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS],
});
// require('dotenv').config()
// eslint-disable-next-line no-undef
__basedir = __dirname;
// eslint-disable-next-line no-undef
__config = require('../config.json');
require('./healthCheckServer')();
// const readline = require('readline');
const { Economy, Cooldown } = require('./database');

const logger = require('./handlers/logger');

require('./slash-register')();
const buttonHandler = require('./handlers/interactions/buttonHandler');

const { commands } = require('./slash-register');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

bot.on('ready', async () => {
  Economy.sync();
  Cooldown.sync();
  // eslint-disable-next-line no-console
  logger.info('The bot is online!');
});

bot.on('interactionCreate', async (interaction) => {
  await interaction.deferReply();
  if (interaction.isCommand()) {
    const name = interaction.commandName;
    const { options } = interaction;

    const commandMethod = commands.get(name);
    if (!commandMethod) return;

    commandMethod.run(bot, interaction, options, Economy, Cooldown);
  } else if (interaction.isButton()) {
    buttonHandler(interaction, commands, bot);
    // if (command == 'ban') {
    //   member.ban();
    //   return interaction.editReply({
    //     content: `The user <@${member.id}> was banned!`,
    //     ephemeral: true,
    //   });
    // } else if (command == 'kick') {
    //   member.kick();
    //   return interaction.editReply({
    //     content: `The user <@${member.id}> was kicked!`,
    //     ephemeral: true,
    //   });
    // }
  }
});

// eslint-disable-next-line no-undef
bot.login(__config.bot.token);
