require('dotenv').config();
const Message = require('./Commands/Implements/MessageModel');
const Setting = require('./Commands/Implements/SettingCommand');
const FoodInfo = require('./Commands/Implements/GetFood');
const AlramCommand = require('./Commands/Implements/Alram');
const cron = require('node-cron');
const Prefix = '!';
var Commands = [
    new Message(["Ping"], "Pong"),
    new Message(["정보"], `[학교정보](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=1)에서 정보 확인 후
!설정 (시도교육청코드) (행정표준코드)`),
    new Setting(),
    new FoodInfo(),
    new AlramCommand(Alram)
];

const {
    Client,
    GatewayIntentBits,
} = require('discord.js');
const GetFood = require('./Commands/Implements/GetFood');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

async function find(id, targetText, args) {
    for(var command of Commands){
        if(!command.contains(targetText))
            continue;

        var result = await command.execute(id, args);
        return result;
    }
    return null;
}

async function Alram(id, time, minute){
    var alram = cron.schedule(`0 ${minute} ${time} * * *`, async () => {
        console.log("Alram executed");
        const channel = await client.channels.fetch(id);
        var result = await find(id, "Food", []);
        if(result != null){
            channel.send(result);
        }
    }, {timezone:"Asia/Seoul"});
}


client.once('clientReady', () => {
    console.log(`log in as ${client.user.tag}`);
})

client.on('messageCreate', async (message) => {
    if(message.author.bot)
        return;

    var content = message.content;
    if(!content.startsWith(Prefix))
        return;

    content = content.slice(Prefix.length);
    
    var temp = content.split(' ');
    var command = temp[0];
    var args = temp.slice(1);

    var result = await find(message.channel.id, command, args);
    if(result != null){
        message.reply(result);
    }
})

client.login(process.env.BOT_TOKEN);