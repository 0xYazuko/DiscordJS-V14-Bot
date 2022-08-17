'use strict';
const { Client, Message, Colors } = require('discord.js');
const { BaseCommand } = require('../structures/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['av']
        });
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(client, message, args) {
        const user = message.mentions.members.first() || await client.users.fetch(args[0] ? args[0] : message.author.id);
        const avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });

        return message.channel.send({
            embeds: [{
                description: `Clique [ici](${avatar}) pour voir l'image.`,
                image: { url: avatar },
                color: Colors.Gold
            }]
        });
    }
};