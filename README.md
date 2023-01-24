# GravyBot

Multi-featured Discord bot

# Getting Started:

For local environment setup steps, see [Discord.js installation and setup guide](https://discordjs.guide/preparations/#installing-node-js).

For instructions on how to add a custom Discord bot in a server, see [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

## Setup

1. Create a .env file at the root directory and fill out the information

```
//Discord Developer Portal > Application > Bot > Add a bot (if you haven't already), copy generated token
CLIENT_TOKEN= <paste here>

//Discord Developer Portal > Application > General Information > APPLICATION ID
APPLICATION_ID= <paste here>

//"Guild" = "Server" in this context
//Server > Server Settings > Widget > Server ID (NOTE: You may need elevated permissions to see this)
GUILD_ID= <paste here>

```

2. At this point, assuming you have properly set the enviromental variables in `.env` and setup your environment correctly, running `node index.js` in the root directory will start the bot locally. At this point, the bot should show as online.

## Adding more Slash (/) Commands

As a good place to start, new commands can be added by adding a new file to `/commands`.

For organizational purposes, it's recommended to have **only one** slash command per file.

While there are examples to base new commands off of, it's important to know what they are doing, and for that, `Discord.js` has [great documentation](https://discordjs.guide/creating-your-bot/slash-commands.html#before-you-continue) on adding new commands.
