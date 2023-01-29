const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Searches YouTube based on provided search term"),
  // .addStringOption((option) =>
  //   option.setName("search-for").setRequired(true)
  // )
  async execute(interaction) {
    const apiKey = process.env.YOUTUBE_DATA_API_V3;
    if (!apiKey) {
      await interaction.reply("No API key has been configured for this bot");
    }
    // const searchTerm = interaction.options.getString("search-term") ?? "Any";
    const res = await axios({
      method: "GET",
      url: `${ROOT_URL}?key="${apiKey}"&type=video&part=lex-friedman`,
    });

    console.log(res);
  },
};
