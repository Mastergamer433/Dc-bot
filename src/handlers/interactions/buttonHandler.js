module.exports = (interaction, commands, bot) => {
  const buttonId = interaction.customId;
  const [command, userId, action, id] = buttonId.split('-');
  const { guild } = interaction;
  const member = guild.members.cache.get(id);

  if (member.id !== userId) return;

  const buttonMethod = commands.get(command);
  if (!buttonMethod) return;

  buttonMethod.button(bot, interaction, member, action);
};
