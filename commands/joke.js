const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Replies with a joke")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category of the joke")
        .setRequired(true)
        .addChoices(
          { name: "Any", value: "Any" },
          { name: "Programming", value: "Programming" },
          //To enabled this, "safe-mode" must be removed from the endpoint below
          // { name: "Dark (NSFW)", value: "Dark"}
          { name: "Pun", value: "Pun" },
          { name: "Spooky", value: "Spooky" },
          { name: "Christmas", value: "Christmas" }
        )
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category") ?? "Any";
    const { data } = await axios({
      method: "GET",
      //Test API: https://v2.jokeapi.dev/
      url: `https://v2.jokeapi.dev/joke/${category}?safe-mode`,
    });

    if (data.error) {
      await interaction.reply(
        `**API ERROR**: ${
          data.message ?? "Unknown Reason"
        } \n\nAdditional Info: ${data.additionalInfo ?? "N/A"}`
      );
      return;
    }

    //1 part joke
    if (!!data.joke) {
      await interaction.reply(data.joke);
      return;
    }

    //2 part joke
    await interaction.reply(`${data.setup} \n${data.delivery}`);
  },
};
