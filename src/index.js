'use strict';
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { BaseLoader } = require('./structures/BaseLoader');

const client = new Client({
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildMembers'
    ]
});

client.commands = new Collection();
client.aliases = new Collection();

BaseLoader.loadEvents(client);
BaseLoader.loadCommands(client);

process.on('unhandledRejection', data => {
    console.log(data);
});

client.login(process.env.TOKEN);