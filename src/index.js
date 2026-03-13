require('dotenv').config();
const Message = require('./Commands/Implements/Message');
const Setting = require('./Commands/Implements/SettingCommand');
const FoodInfo = require('./Commands/Implements/GetFood');
const AlarmCommand = require('./Commands/Implements/Alram');
const cron = require('node-cron');
const Prefix = '!';
var Commands = [
    new Message(["Ping"], "Pong"),
    new Message(["Info", "info", "Help", "help", "도움", "정보"], `눈치껏 알아서 써보세요.`),
    new Setting(),
    new FoodInfo(),
    new AlarmCommand(Alarm)
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

async function Alarm(id, time, minute) {
    try {
        var alarm = cron.schedule(`0 ${minute} ${time} * * *`, async () => {
            console.log("Alarm executed");
            const channel = await client.channels.fetch(id);
            if (!channel) {
                console.log(`${id}canel can't find`);
                return;
            }
            var result = await find(id, "Food", []);
            if (result != null) {
                channel.send(result);
            }
            else
                channel.send("정보에 오류가 있습니다. 급식 정보를 받아올 수 없습니다.")
        }, { timezone: "Asia/Seoul" });
        if (alarm) {
            const data = AlarmCommand.getAlarm(id);
            if (data != null)
                data[0].destroy();
            AlarmCommand.setAlarm(id, alarm, time, minute);
        }
    }
    catch(e){
        console.log(e);
    }
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

    try{
        var result = await find(message.channel.id, command, args);
        message.reply(result);
    }
    catch(e){
        message.reply(`어이쿠 ${e.message}`);
    }
    
})

client.login(process.env.BOT_TOKEN);