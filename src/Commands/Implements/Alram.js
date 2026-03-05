const Command = require('../Command');

module.exports = class Alram extends Command{
    static #settedId = Map;
    static setAlram(id, v) {
        this.#settedId.set(id, v);
    }

    static getRegion(id) {
        if (!this.#settedId.has(id)) return null;
        return this.#settedId.get(id);
    }

    constructor(func) {
        super(
            ["Alram", "alram", "알람"],
            (id, args) => {
                if(args.length < 2){
                    func(id, 8, 0);
                }
                func(id, args[0], args[1])
            },
            () => "알람 설정 됨"
        )
    }
}