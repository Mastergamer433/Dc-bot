const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('ban the user')
  .addUserOption((option) =>
    option.setName('user').setDescription('the user to kick').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('reason').setDescription('Enter the reason').setRequired(false)
  );

module.exports.run = (bot, interaction) => {
  let permissions = interaction.member.permissions;
  if (!permissions.has('MANAGE_GUILD'))
    return interaction.editReply({ content: 'You do not have permission to do that.' });

  let options = interaction.options;

  let member = options.getMember('user');
  let reason = options.getString('reason');

  if (!member) return interaction.editReply({ content: 'No user provided' });

  interaction.editReply({
    content: 'kicking',
  });

  member
    .ban({ reason: reason, days: 7 })
    .then(() => {
      interaction.editReply({ content: `The user <@${member.id}> was banned!` });
    })
    .catch((error) => {
      console.log(error);
      interaction.editReply({ content: 'An error occured' });
    });
};
