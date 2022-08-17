'use strict';
const { Client, ActivityType } = require('discord.js');
const { BaseEvent } = require('../structures/BaseEvent');


module.exports = class extends BaseEvent {
    /**
     * @param {Client} client
     */

    execute(client) {
        client.user?.setActivity('Je suis prêt!', { type: ActivityType.Watching });

        console.clear();
        console.log(`[+] Connecté sur ${client.user?.tag}`);
    }
};