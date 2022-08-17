'use strict';
const { Client, Message, Colors } = require('discord.js');
const { BaseCommand } = require('../structures/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: 'serverinfo',
            aliases: ['server']
        });
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(client, message) {
        const Uonline = message.guild?.members.cache.filter(u => u.presence?.status == 'online' && u.user.bot == false).size;
        const Udnd = message.guild?.members.cache.filter(u => u.presence?.status == 'dnd' && u.user.bot == false).size;
        const Uidle = message.guild?.members.cache.filter(u => u.presence?.status == 'idle' && u.user.bot == false).size;
        const Uoffline = message.guild?.members.cache.filter(u => u.presence?.status == null).size;
        const bots = message.guild?.members.cache.filter(u => u.user.bot == true).size;

        return message.channel.send({
            embeds: [{
                fields: [
                    { name: 'Propriétaire:', value: `<@${message.guild?.ownerId}>`, inline: true },
                    { name: 'ID du serveur:', value: `\`${message.guild?.id}\``, inline: true },
                    { name: 'Date de création:', value: `\`${~~(message.guild?.createdTimestamp / 1000)}\`` },
                    { name: 'Channel textuel:', value: `\`${message.guild?.channels.cache.filter(ch => ch.type == 'GUILD_TEXT').size}\``, inline: true },
                    { name: 'Channel vocal:', value: `\`${message.guild?.channels.cache.filter(ch => ch.type == 'GUILD_VOICE').size}\``, inline: true },
                    { name: `Total de membre [${message.guild?.memberCount}]:`, value: `En ligne: ${Uonline}\nNe pas déranger: ${Udnd}\nAbsent: ${Uidle}\nOffline: ${Uoffline}\nBots: ${bots}`, inline: false },
                    { name: 'Roles:', value: `\`${message.guild?.roles.cache.filter(r => r).size}\``, inline: true },
                    { name: 'Emojis:', value: `\`${message.guild?.emojis.cache.size}\``, inline: true },
                    { name: 'Langue:', value: `\`${message.guild?.preferredLocale}\``, inline: true }
                ],
                thumbnail: { url: message.guild.iconURL({ dynamic: true, size: 4096 }) },
                color: Colors.Fuchsia
            }]
        });
    }
};