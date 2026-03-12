const Setting = require('./SettingCommand');
const Command = require('../Command');
const {DOMParser} = require('xmldom')

module.exports = class GetFood extends Command{
    constructor() {
        super(
            ["급식", "밥", "Food", "food"],
            async (id, args) => {
                const region = Setting.getRegion(id);
                const school = Setting.getSchool(id);
                const serverDate = new Date();
                const date = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000); 
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=${school}&SD_SCHUL_CODE=${region}&MLSV_YMD=${year}${month}${day}`;
                var xmlString = await fetch(url).then((res) => res.text());
                var parser = new DOMParser();
                var xml = parser.parseFromString(xmlString, "text/xml");
                var result = xml.getElementsByTagName('DDISH_NM')[0].textContent;
                result = result.replaceAll('<br/>', '\n');
                console.log(`Result: ${result}`);
                return result;
            }
        )
    }
}