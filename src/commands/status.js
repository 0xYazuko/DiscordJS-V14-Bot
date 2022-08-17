'use strict';
const { Client, Message, Colors } = require('discord.js');
const { BaseCommand } = require('../structures/BaseCommand');
const { cpus, loadavg, freemem, totalmem } = require('os');
const { readFileSync } = require('fs');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: 'status',
            aliases: ['s']
        });
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    async execute(client, message) {
        function ram() {
            let raminfo;
            try {
                const used = readFileSync(`/sys/fs/cgroup/memory/memory.usage_in_bytes`).toString();
                const total = readFileSync(`/sys/fs/cgroup/memory/memory.limit_in_bytes`).toString();
                return raminfo = `${~~(used / 1024 / 1024)}/${~~(total / 1024 / 1024)}MB`;
            } catch {
                return raminfo = `${~~(totalmem() / 1024 / 1024 - freemem() / 1024 / 1024)}/${~~(totalmem() / 1024 / 1024)}MB`;
            }
        };

        return message.channel.send({
            embeds: [{
                fields: [
                    { name: 'Information', value: `Processeur: **${cpus()[0].model}**\nThreads: **${cpus().length}**` },
                    { name: 'Utilisation', value: `CPU: **${loadavg()[0]}%**\nRAM: **${ram()}**` }
                ],
                thumbnail: { url: client.user?.displayAvatarURL({ size: 4096 }) },
                color: Colors.White
            }]
        });
    }
};