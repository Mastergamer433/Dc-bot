const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports.data = new SlashCommandBuilder()
    .setName("create")
    .setDescription("create something")
    .addSubcommand(subcommand =>
		subcommand
			.setName('role')
			.setDescription('Create\'s a role')
            .addStringOption(option => option.setName('name').setDescription('Enter the name of the new role'))) ;
module.exports.run = async (bot, interaction) => {
    
    interaction.editReply({
        content: "Creating role"
    })
    
    
    if(interaction.options.getSubcommand() === "role"){
        let roleName = await interaction.options.getString("name")
        await guild.roles.create({
            name: roleName,
            color: 'BLACK'
        })
    }
}