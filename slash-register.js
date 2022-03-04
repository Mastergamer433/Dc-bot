const { REST } = require('@discordjs/rest');
require('dotenv').config();
const { Routes } = require('discord-api-types/v9');
const token = process.env.BOT_TOKEN;
const fs = require('node:fs');
const commands = [];
const commandList = new Map()

module.exports = (updateCommands) => {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	const clientId = process.env.BOT_CLIENT_ID;

 	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
		commands.push(command.data.toJSON());
		commandList.set(command.data.name, command.run)
	}

	const rest = new REST({ version: '9' }).setToken(token);

	if(updateCommands){	
			(async () => {
				try {
					console.log('Started refreshing application (/) commands.');
		
					await rest.put(
						Routes.applicationCommands(clientId),
						{ body: commands },
					);        
					console.log('Successfully reloaded application (/) commands.');
				} catch (error) {
					console.error(error);
				}
			})();
	}
}

module.exports.commands = commandList