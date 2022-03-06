const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const logger = require('../handlers/logger');

module.exports.data = new SlashCommandBuilder()
  .setName('nslookup')
  .setDescription('lookup a domain')
  .addStringOption(
    // eslint-disable-next-line comma-dangle
    (option) => option.setName('domain').setDescription('The domain to lookup').setRequired(true)
    // eslint-disable-next-line function-paren-newline
  );
module.exports.run = async (bot, interaction) => {
  const domain = interaction.options.getString('domain');
  let embed;
  axios
    .get(`http://ip-api.com/json/${domain}`)
    .then((response) => {
      // eslint-disable-next-line no-console, indent
      console.log(response);
      embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('NsLookup')
        .setAuthor({
          name: 'Mastergamer433',
          iconURL: 'https://kimane.se/files/logos/Mastergamer433/discord/Mastergamer433.png',
          url: 'https://kimane.se/',
        })
        .addFields(
          { name: 'Domain looked up', value: domain },
          { name: 'Country', value: response.data.country },
          { name: 'Country Code', value: response.data.countryCode },
          { name: 'Region', value: response.data.region },
          { name: 'Region Name', value: response.data.regionName },
          { name: 'City', value: response.data.city },
          { name: 'Zip', value: response.data.zip },
          { name: 'Latitude', value: response.data.lat.toString() },
          { name: 'Longitude', value: response.data.lon.toString() },
          { name: 'Time Zone', value: response.data.timezone },
          { name: 'ISP', value: response.data.isp },
          { name: 'As', value: response.data.as },
          // eslint-disable-next-line comma-dangle
          { name: 'IP', value: response.data.query }
        )
        .setTimestamp()
        .setFooter({
          text: 'By Mastergmer433',
          iconURL: 'https://kimane.se/files/logos/Mastergamer433/discord/Mastergamer433.png',
        });
      interaction.editReply({ embeds: [embed] });
    })
    .catch((error) => {
      // handle error
      logger.error(error);
    })
    .then(() => {
      // always executed
    });
};
