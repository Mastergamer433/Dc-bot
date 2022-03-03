const Discord = require('discord.js')
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
require('dotenv').config()
bot.on('ready', () => {
    console.log("The bot is online!")
})


bot.login(process.env.BOT_TOKEN)