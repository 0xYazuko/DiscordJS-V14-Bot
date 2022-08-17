'use strict';
const { Client, Message, Colors } = require('discord.js');
const { BaseCommand } = require('../structures/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: 'banner',
            aliases: []
        });
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(client, message, args) {
        const user = message.mentions.members.first() || await client.users.fetch(args[0] ? args[0] : message.author.id);
        const bannerLink = user.bannerURL({ size: 4096 });

        if (bannerLink == undefined) {
            return message.reply({ embeds: [{ description: '`❌`┃L’utilisateur **non** a une bannière!', color: Colors.Red }] });
        }

        message.reply({
            embeds: [{
                description: `Clique [ici](${bannerLink}) pour voir l'image`,
                image: { url: `${bannerLink}` },
                color: Colors.DarkRed
            }]
        });
    }
};
