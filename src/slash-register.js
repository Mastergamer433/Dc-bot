// require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// eslint-disable-next-line no-undef
const { token } = __config.bot;
// eslint-disable-next-line import/no-unresolved
const fs = require('node:fs');

const logger = require('./handlers/logger');

const commands = [];
const commandList = new Map();

module.exports = (/* updateCommands */) => {
  const commandFiles = fs
    .readdirSync('./src/commands/')
    .filter((file) => file.endsWith('.js'));

  // eslint-disable-next-line no-restricted-syntax
  for (const file of commandFiles) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    commandList.set(command.data.name, command);
  }

  const rest = new REST({ version: '9' }).setToken(token);

  (async () => {
    try {
      logger.info('Updating commandsStarted refreshing application (/) commands.');

      // await rest.put(
      // eslint-disable-next-line no-tabs
      // 	Routes.applicationCommands(clientId),
      // eslint-disable-next-line no-tabs
      // 	{ body: commands },
      // );

      await rest.put(
        // eslint-disable-next-line no-undef
        Routes.applicationGuildCommands(__config.bot.clientId, __config.bot.devGuildId),
        { body: commands },
      );
      logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
      logger.error(error);
    }
  })();
};

module.exports.commands = commandList;
