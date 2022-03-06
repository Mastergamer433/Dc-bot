const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports.data = new SlashCommandBuilder().setName('work').setDescription('Work for coins');
module.exports.run = async (bot, interaction, options, Economy, Cooldown) => {
  const coinsEarned = Math.floor(Math.random() * 15);
  const { member } = interaction;
  const getCooldown = await Cooldown.findOne({ where: { id: member.id, command: 'work' } });
  const cooldownTime = getCooldown?.expiry;
  // eslint-disable-next-line keyword-spacing
  if(getCooldown && cooldownTime > new Date().getTime()) {
    return interaction.editReply({ content: `You still under cooldown! Please wait ${ms(cooldownTime - new Date().getTime())}` });
  } if (getCooldown) {
    getCooldown.destroy({ where: { id: member.id, command: 'work' } });
  }

  let getUser = await Economy.findOne({ where: { id: member.id } });
  if (!getUser) {
    getUser = await Economy.create({
      id: member.id,
      username: member.displayName,
      balance: 0,
    });
  }

  await Economy.update({ balance: getUser.balance + coinsEarned }, { where: { id: member.id } });
  Cooldown.create({
    id: member.id,
    expiry: new Date().getTime() + (60000 * 0.25),
    command: 'work',
  });

  return interaction.editReply({ content: `You have earned ${coinsEarned} coins!` });
};
