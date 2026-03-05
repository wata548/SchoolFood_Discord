module.exports = class {
    constructor(commands, onExecute, reternFormat) {
        this.Commands = commands;
        this.OnExecute = onExecute;
        this.Return = reternFormat;
    }
    async execute(guildId, args){
        await this.OnExecute(guildId, args)
        const result = await this.Return(guildId, args);
        console.log(`Result(${typeof result}): ${result}`);
        return result;
    }
    contains(command){
        for(var element of this.Commands){
            if(element == command)
                return true;
        }
        return false;
    }
}