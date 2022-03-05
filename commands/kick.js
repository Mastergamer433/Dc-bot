const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports.data = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick the user")
    .addUserOption(option => option.setName("user").setDescription("the user to kick").setRequired(true))
module.exports.run = (bot, interaction) => {
    let permissions = interaction.member.permissions
    if(permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: 'You do not have permission to do that.'})

    let options = interaction.options

    let member = options.getMember("user")

    if(!member) return interaction.editReply({content:"No user provided"})

    interaction.editReply({
        content: "kicking"
    })
}