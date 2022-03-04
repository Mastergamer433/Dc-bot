const Discord = require('discord.js')
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
require('dotenv').config()
require('./slash-register')()
let commands = require('./slash-register').commands;
let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

bot.on('ready', () => {
    console.log("The bot is online!")
})

bot.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return

    let name = interaction.commandName
    let options = interaction.options
    
    let commandMethod = commands.get(name);
    if(!commandMethod) return

    await interaction.deferReply()
    commandMethod(bot, interaction)
})

bot.login(process.env.BOT_TOKEN)