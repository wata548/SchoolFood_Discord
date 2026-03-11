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
        if(args.length < 2){

          var curSetting = "";
          if(SettingCommand.getSchool(id) == null){
            curSetting = `현재 설정: ${SettingCommand.getSchool(id)}, ${SettingCommand.getRegion(id)}`;
          }
          return `입력이 잘못되었습니다.
[학교정보](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=1)에서 정보 확인 후
!설정 (시도교육청코드) (행정표준코드)
${curSetting}`;
        }

        SettingCommand.setRegion(id, args[0]);
        SettingCommand.setSchool(id, args[1]);
        return "설정되었습니다.";
      },
    );
  }
};
