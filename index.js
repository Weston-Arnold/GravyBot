const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

//https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
const commandsDirectoryPath = path.join(__dirname, "commands");
fs.readdirSync(commandsDirectoryPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(commandsDirectoryPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  });

//https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files
const eventsDirectoryPath = path.join(__dirname, "events");
fs.readdirSync(eventsDirectoryPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(eventsDirectoryPath, file);
    const event = require(filePath);

    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args));
  });

client.login(process.env.CLIENT_TOKEN);
