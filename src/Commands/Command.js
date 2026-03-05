module.exports = class {
    constructor(commands, reternFormat) {
        this.Commands = commands;
        this.Return = reternFormat;
    }
    async execute(channelId, args){
        return await this.Return(channelId, args);
    }
    contains(command){
        for(var element of this.Commands){
            if(element == command)
                return true;
        }
        return false;
    }
}