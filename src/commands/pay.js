const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
  .setName('pay')
  .setDescription('Pay another user')
  .addUserOption((option) => option.setName('user').setDescription('User to pay').setRequired(true))
  .addIntegerOption((option) =>
    // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
    option.setName('amount').setRequired(true).setDescription('Amount to pay')
  // eslint-disable-next-line function-paren-newline
  );
module.exports.run = async (bot, interaction, options, Economy) => {
  const amount = options.getInteger('amount');
  const member = options.getMember('user');

  if (amount < 1) return interaction.editReply({ content: 'You cannot pay 0 or less coins.' });

  let getUser = await Economy.findOne({ where: { id: interaction.member.id } });
  if (!getUser) {
    getUser = await Economy.create({
      id: member.id,
      username: member.displayName,
      balance: 0,
    });
  }

  if (getUser.balance < amount) {
    return interaction.editReply({ content: 'You do not have enough coins to pay that' });
  }

  let memberBalance = await Economy.findOne({ where: { id: member.id } });
  if (!memberBalance) {
    memberBalance = await Economy.create({
      id: member.id,
      username: member.displayName,
      balance: 0,
    });
  }

  await Economy.update({ balance: memberBalance.balance + amount }, { where: { id: member.id } });
  await Economy.update(
    { balance: getUser.balance - amount },
    // eslint-disable-next-line comma-dangle
    { where: { id: interaction.member.id } }
  );

  const embed = new MessageEmbed()
    .setTitle('Money transfer complete')
    .setDescription(
      // eslint-disable-next-line comma-dangle
      `**${interaction.member.displayName}** has sent **${amount}** coins to **${member.displayName}**`
    )
    .setColor('GREEN');

  return interaction.editReply({ embeds: [embed] });
  // member.send(`${interaction.member.displayName} has sent ${amount} coins to you!`);
};
