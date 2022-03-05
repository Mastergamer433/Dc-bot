const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports.data = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick the user")
    .addUserOption(option => option.setName("user").setDescription("the user to kick").setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Enter the reason'))
    module.exports.run = (bot, interaction) => {
    let permissions = interaction.member.permissions
    if(permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: 'You do not have permission to do that.'})

    let options = interaction.options

    let member = options.getMember("user")
    let reason = options.getStringOption("reason")

    if(!member) return interaction.editReply({content:"No user provided"})

    interaction.editReply({
        content: "kicking"
    })

    member.kick(reason).then(() => {
        interaction.editReply({content:`The user <@${member.id}> was kicked!`})
    }).catch(error => {
        console.log(error)
        interaction.editReply({content:'An error occured'})
    })
}