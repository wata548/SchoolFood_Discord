const Command = require("../Command");

module.exports = class SettingCommand extends Command {
  static #region = new Map();
  static #school = new Map();

  static setRegion(id, v) {
    this.#region.set(id, v);
  }
  static getRegion(id) {
    if (!this.#region.has(id)) return null;
    return this.#region.get(id);
  }
  static setSchool(id, v) {
    this.#school.set(id, v);
  }
  static getSchool(id) {
    if (!this.#school.has(id)) return null;
    return this.#school.get(id);
  }

  constructor() {
    super(
      ["설정", "Setting", "setting"],
      (id, args) => {
        if(args.length < 2)
          return "입력이 잘못되었습니다."

        SettingCommand.setRegion(id, args[0]);
        SettingCommand.setSchool(id, args[1]);
        return "설정되었습니다.";
      },
    );
  }
};
