const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
  .setName('balance')
  .setDescription('check balance of a user')
  .addUserOption(
    (option) =>
      // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
      option.setName('user').setRequired(false).setDescription('User to check the balance of')
    // eslint-disable-next-line function-paren-newline
  );
module.exports.run = async (bot, interaction, options, Economy) => {
  const member = options.getMember('user') || interaction.member;
  let getUser = await Economy.findOne({ where: { id: member.id } });
  if (!getUser) {
    getUser = await Economy.create({ id: member.id, username: member.displayName, balance: 0 });
  }

  const embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Balance`)
    .setDescription(`${getUser.balance} coins`)
    .setColor('AQUA');

  return interaction.editReply({
    embeds: [embed],
  });
};
