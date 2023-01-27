const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
require("dotenv").config();

//Get a list of .js files inside of /commands
const commands = [];
fs.readdirSync("./commands")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  });

const rest = new REST().setToken(process.env.CLIENT_TOKEN);
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    //https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID,
        //https://discordjs.guide/creating-your-bot/command-deployment.html#global-commands
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
