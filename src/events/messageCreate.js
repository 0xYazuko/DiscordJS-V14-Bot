'use strict';
const { Client, Message, ChannelType } = require('discord.js');
const { BaseEvent } = require('../structures/BaseEvent');


module.exports = class extends BaseEvent {
    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(client, message) {
        if (message.author.bot || message.channel.type == ChannelType.DM || !message.content.toLowerCase().startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();
        const exec = client.commands.get(command) || client.aliases.get(command);
        if (!exec) return;

        try {
            exec.execute(client, message, args);
        } catch (err) {
            console.log(`Une erreur s’est produite à la commande ${command}`);
            console.error(err);
        }
    }
};