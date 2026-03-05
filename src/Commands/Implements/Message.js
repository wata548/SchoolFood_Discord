const Command = require('../Command');
module.exports = class MessageCommand extends Command {
    constructor(commands, message){
        super(
            commands,
            () => message
        );
    }
}