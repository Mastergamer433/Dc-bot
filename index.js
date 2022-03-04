const Discord = require('discord.js')
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
require('dotenv').config()
bot.on('ready', () => {
    console.log("The bot is online!")

    let commands = bot.application.commands

    commands.create({
        name: "hello",
        description: "replys somthin'"
    })
})

bot.on('interacitonCreate', (interaction) => {
    if(interaction.isCommand()) return
    let name = interaction.commandName
    let options = interaction.options
    if(name=='hello'){
        interaction.reqply({
            content: 'hello',
            ephemeral: true
        })
    }
})


bot.login(process.env.BOT_TOKEN)