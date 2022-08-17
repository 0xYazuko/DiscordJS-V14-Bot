'use strict';
const { readdirSync } = require('fs');

module.exports.BaseLoader = class BaseLoader {
    static loadEvents(client) {
        const events = readdirSync('src/events/');
        for (const files of events) {
            const eventName = files.split('.')[0];
            const eventFile = require(`../events/${files}`);
            const Event = new eventFile(eventName);

            client.on(eventName, Event.execute.bind(Event, client));
        }
    }

    static loadCommands(client) {
        const commands = readdirSync('src/commands/');
        for (const files of commands) {
            const commandFile = require(`../commands/${files}`);
            const Command = new commandFile();

            client.commands.set(Command.name, Command);
            for (const alias of Command.aliases) {
                client.aliases.set(alias, Command);
            }
        }
    }
};