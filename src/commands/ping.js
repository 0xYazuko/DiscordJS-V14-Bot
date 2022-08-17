'use strict';
const { Client, Message } = require('discord.js');
const { BaseCommand } = require('../structures/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: 'ping',
            aliases: []
        });
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    execute(client, message) {
        message.channel.send(`**Ping:** ${client.ws.ping}ms.`);
    }
};