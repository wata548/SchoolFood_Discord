const Command = require('../Command');
module.exports = class MessageContent extends Command {
    constructor(commands, message){
        super(
            commands,
            () => {},
            () => message
        );
    }
}