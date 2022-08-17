'use strict';
module.exports.BaseCommand = class BaseCommand {
    constructor(params) {
        this.name = params.name;
        this.aliases = params.aliases;
    }
};