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
          { name: "Pun", value: "Pun" },
          { name: "Dark", value: "Dark" },
          { name: "Spooky", value: "Spooky" },
          { name: "Christmas", value: "Christmas" }
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("safe-mode")
        .setDescription(
          "[Default ON] Safe Mode attempts to filter out more offensive jokes."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const category =
      interaction.options.getString("category") ?? "No category provided";
    const safeMode = interaction.options.getBoolean("safe-mode") ?? true;

    console.log(safeMode);

    const { data } = await axios({
      method: "GET",
      //Test API: https://v2.jokeapi.dev/
      url: `https://v2.jokeapi.dev/joke/${category}${
        safeMode ? "?safe-mode" : ""
      }`,
      params: {
        flags: {
          nsfw: !safeMode,
          religious: !safeMode,
          political: !safeMode,
          racist: !safeMode,
          sexist: !safeMode,
          explicit: !safeMode,
        },
      },
    });

    if (data.error) {
      console.log(data);
      await interaction.reply(
        `**API ERROR**: ${
          data.message ?? "Unknown Reason"
        } \n\nAddiional Info: ${data.additionalInfo ?? "N/A"}`
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
