const Discord = require('discord.js')
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
require('dotenv').config()
bot.on('ready', () => {
    console.log("The bot is online!")

    let commands = bot.application.commands

    commands.create({
        name: "sayhello",
        description: "Reply hello to the user",
        options: [{
            name: "user",
            description: "The user u wanna say hello to",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        }
    ]
    })
})

bot.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return

    let name = interaction.commandName
    let options = interaction.options
    if(name=='hello'){
        interaction.reply({
            content: 'hello',
            ephemeral: false
        })
    }
    if(name=='sayhello'){
        let user = options.getUser('user')
        interaction.reply({
            content: `Hello ${user.username}`
        })
    }
})


bot.login(process.env.BOT_TOKEN)