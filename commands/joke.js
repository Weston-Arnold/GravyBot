const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells a random joke"),
  async execute(interaction) {
    const { data } = await axios({
      method: "GET",
      url: "https://v2.jokeapi.dev/joke/Any",
      params: {
        blacklistFlags: 'nsfw,racist'
      },
    });

    //1 part joke
    if (!!data.joke) {
      await interaction.reply(data.joke);
      return;
    }

    //2 part joke
    await interaction.reply(`${data.setup} \n${data.delivery}`);
  },
};
