const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
  .setName('manage')
  .setDescription('Manage a user')
  .addUserOption((option) => option.setName('user').setDescription('The user to manage').setRequired(true));
module.exports.run = (bot, interaction) => {
  const { permissions } = interaction.member;
  if (!permissions.has('MANAGE_MESSAGES')) { return interaction.editReply({ content: 'You do not have permission to do that.' }); }

  const member = interaction.options.getMember('user');

  const embed = new MessageEmbed()
    .setTitle(`Manage ${member.user.username}`)
    .setDescription('Click one of the buttons below to manage a user');

  const row = new MessageActionRow().addComponents([
    new MessageButton()
      .setLabel('Ban')
      .setStyle('DANGER')
      .setCustomId(`manage-${interaction.member.id}-ban-${member.id}`),
    new MessageButton()
      .setLabel('Kick')
      .setStyle('DANGER')
      .setCustomId(`manage-${interaction.member.id}-kick-${member.id}`),
  ]);

  return interaction.editReply({
    embeds: [embed],
    components: [row],
  });
};

// eslint-disable-next-line consistent-return
module.exports.button = (bot, interaction, member, action) => {
  if (action === 'ban') {
    member.ban();
    return interaction.editReply({
      content: `The user <@${member.id}> was banned!`,
      empheral: true,
    });
  } if (action === 'kick') {
    member.kick();
    return interaction.editReply({
      content: `The user <@${member.id}> was kicked!`,
      empheral: true,
    });
  }
};
