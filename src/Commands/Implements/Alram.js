const Command = require('../Command');

module.exports = class Alarm extends Command{
    static #alarm = new Map();
    static #time = new Map();
    static #minute = new Map();
    static setAlarm(id, v, time, minute) {
        this.#alarm.set(id, v);
        this.#time.set(id, time);
        this.#minute.set(id, minute);
    }

    static getAlarm(id) {
        if (!this.#alarm.has(id)) return null;
        return [this.#alarm.get(id), this.#time.get(id), this.#minute.get(id)];
    }

    constructor(func) {
        super(
          ["Alarm", "alarm", "알람"],
          (id, args) => {
            if (args.length < 2) {
              const alarm = Alarm.getAlarm(id);
              var alarmData = "";
              if(alarm != null){
                alarmData = `현재 알람: ${alarm[1]} : ${alarm[2]}`;
              }
              return `'시간 분' 형태로 입력해주세요.\n${alarmData}`;
            }
            func(id, args[0], args[1]);
            return "알람 설정 됨";
          },
        );
    }
}