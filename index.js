const { MessageActionRow, MessageButton, Client, Intents, MessageEmbed, MessageMentions, Permissions, Message, MessageSelectMenu} = require("discord.js");
const config = require("./config.json");
var mysql = require('mysql');
//const mod = require("./mod.js");
//const mycommans = require("./comm.js");
//const fruits = require("./fruits.js");
//const embd = require("./embed.js");
//const keepAlive = require("./server");
var moment = require('moment');
require('events').EventEmitter.defaultMaxListeners = 10;

client = new Client({ intents: ["GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_INVITES", "GUILD_BANS", "GUILD_PRESENCES", "GUILDS", "GUILD_MEMBERS" ,"GUILD_MESSAGE_REACTIONS"], partials: ['MESSAGE', 'CHANNEL']});

var sql = mysql.createConnection({
  database: 'misc',
  host: "51.83.236.164",
  port: "12400",
  user: "disc0rd",
  password: "aLqE7QzR7jMA"
});

sql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*let arr = [
	{
  	name: "Apple",
    chance: 20
  },
  {
  	name: "Banana",
    chance: 40
  },
  {
  	name: "Knife",
    chance: 40
  }
];

console.log(fillArray(arr)[rand100()]);

function rand100() {
  return Math.floor(Math.random() * Math.floor(100));
}
function fillArray(data) {
	let arr = [];
  data.forEach(el => {
		for (let i = 0; i < el.chance; i++) arr.push(el.name);
	});
  return arr;
}*/

client.on("messageCreate", message => {
  if (message.content === "!res") {
    sql.query(`DELETE FROM Violations`);
  }
  
});
/*client.on("presenceUpdate", async(oldPresence, newPresence) => {
    //if (newPresence.activities == "PandaWoW") {
        if (newPresence.activities[0] === undefined)
            return;

        if (newPresence.activities[0].details === null)
            return;

        const gameActivityemb = {
            color: "RANDOM",
            description: `${newPresence.member.user.username} запустил **__${newPresence.activities[0].name}__**.\nПерсонаж: **${newPresence.activities[0].details}**.`,
            footer: {
                text: `${newPresence.member.id} | ${newPresence.member.user.tag}`
            }
        };
        sql.query(`INSERT INTO Violations (UserID, test) VALUES (${newPresence.member.id}, '${newPresence.activities[0].details}') ON DUPLICATE KEY UPDATE test = test + '${newPresence.activities[0].details}'`);
        client.channels.cache.get(`897911485962010684`).send({ embeds: [gameActivityemb] });
    //}
});*/

client.on("messageCreate", async(message) => {
  if (message.author.bot) return;
    //if (message.channel.id === "939925027086798959") return;
  if (message.channel.type === 'DM') return;
  if (message.content.toLowerCase() === "!try") {
    sql.query(`INSERT INTO User (UserID, Coins) VALUES (${message.author.id}, 1000) ON DUPLICATE KEY UPDATE Coins = Coins +  1000`);
    message.reply(`Добавил 1000 монет.`);
  }
  if (message.content.toLowerCase() === "!proc") {
    sql.query(`SELECT UserID, Coins FROM User WHERE UserID = ${message.author.id} AND Coins >= 1000`, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else if (rows) {
        sql.query(`UPDATE User SET Coins = Coins - 1000 WHERE UserID = ${message.author.id}`);
        message.reply(`Монеты сняты.`);
      } else
      message.reply("Недостаточно монет.");
    });
    }
});

const first = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId("firstmenu")
    //.setPlaceholder("Вы")
    .addOptions([{
      label: "Поддержка.",
      value: "Support",
      description: "Восстановление аккаунтов, смена данных и другое."},
      {
        label: "Баг-трекер.",
        value: "BugTracker",
        description: "Сообщить о неправильной работе чего-либо."},
        {
          label: "PandaWoW Launcher.",
          value: "PandaWoWLauncher",
          description: "Все о корректной работе лаунчера."},
          {
            label: "Правила.",
            value: "Rules",
            description: "Что можно, а что нельзя."
          },])
  );
  
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content === "!dhdooeodpp6373738383+£+£jdhdhdhdjdidjhdhdhdjddhd") {
    if (message.author.id !== "483591282912919553") return;
    message.channel.send({content: `Быстрый поиск нужного раздела на форуме.\n\n<:emoji_16:933462676590432288> https://forum.pandawow.ru\n\n<:emoji_23:967859926468821043> ВАЖНО! Вы должны быть зарегистрированы, чтобы создавать темы.`, components: [first]});
  }
});

client.on("interactionCreate", async (interaction) => {
  const btracker = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId("twomenu")
    //.setPlaceholder("Вы")
    .addOptions([{
      label: "PandaWoW Launcher",
      value: "five",
      description: "Все о зависимостях и работе лаунчера."}])
      );
      
  const two = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId("twomenu")
    //.setPlaceholder("Вы")
    .addOptions([{
      label: "Восстановление аккаунтов и смена данных.",
      value: "AccountRestore",
      description: "Пропажа персонажа, смена пароля, телефона, почты или проблемы с двухфакторной аутентификацией."},
    {
      label: "Пожертвование и операции в ЛК.",
      value: "DonationsAndPurchase",
      description: "Проблемы с бонусами, приобретенными услугами или вещами."},
    {
      label: "Вернуться назад.",
      value: "returnMenu",
      description: "Возвращает главное меню."
      }])
  );
  if (interaction.isSelectMenu()) {
    if (interaction.values[0] == "Support") {
      interaction.reply({ephemeral: true, content: `→ [RU поддержка](https://forum.pandawow.ru/forumdisplay.php?f=307):`, components: [two]});
    }
    if (interaction.values[0] == "returnMenu") {
      interaction.reply({content: `Быстрый поиск нужного раздела на форуме.\n\n→ https://forum.pandawow.ru\n\n❗ ВАЖНО! Вы должны быть зарегистрированы, чтобы создавать темы.`, ephemeral: true, components: [first]});
    }
    
    if (interaction.values[0] == "BugTracker") {
      interaction.reply({ephemeral: true, content: `→ Создавать __[баг-репорты](https://forum.pandawow.ru/forumdisplay.php?f=31)__ необходимо по __[правилам](https://forum.pandawow.ru/showthread.php?t=40)__ тут: [перейти](https://forum.pandawow.ru/forumdisplay.php?f=31).\n\n**1. Название проблемного заклинания/задания/npc и т.п. Обязательно вставить ссылку на __[wowhead](https://ru.wowhead.com)__ или __[wowroad](https://wowroad.info)__.**\n2. Описание проблемы. Опишите, что именно и как работает, в чем конкретно заключается проблема. Приведите доказательства из игры - скриншот, комбат-лог или видео.\n**3. Как должно работать. Обязательно приведите примеры с ссылкой на __[wowhead](https://ru.wowhead.com)__ / __[WoWwiki](https://wowwiki.fandom.com/ru/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F)__ / __[WoWpedia](https://wowpedia.fandom.com/wiki/Wowpedia)__. Подойдут любые доказательства, главное, чтобы это было не вашим мнением, а официальными данными с официального сервера WoW.**\n4. Дата проверки.\n**5. Реалм, на котором вы наблюдали проблему.**\n6. Приоритет проблемы. (1-10)\n\nПример правильного баг-репорта: https://forum.pandawow.ru/showthread.php?t=265082.`});
    }
    if (interaction.values[0] == "AccountRestore") {
      interaction.reply({ephemeral: true, content: `→ __**[Восстановление аккаунтов и смена данных](https://forum.pandawow.ru/forumdisplay.php?f=290)**__.\n\n→ **__[Что делать, если пропали персонажи, не можете войти на аккаунт или заменить почту.](https://forum.pandawow.ru/showthread.php?t=140400)__**\n\n**__Следуйте этому списку, создавая тему__**.\n**1. Логин аккаунта и примерная дата его регистрации (примерный год, может быть месяц).**\n2. Ники персонажей на этом аккаунте и игровой мир, на котором они находятся.\n**3. Эл.почта, на которую был зарегистрирован вышеупомянутый аккаунт (если не помните точно, укажите хотя бы примерные варианты).**\n4.Время вашего последнего посещения игры.\n**5. Ваш IP-адрес, с которого вы заходили на данную уч.запись. Проверить свой IP вы можете с помощью сайтов: <https://whoer.net/ru>, <https://myip.ru>.**\n6.Скриншоты: старые скриншоты с этими персонажами, ссылки на видео/стримы с персонажей, находящихся на этом аккаунте, любая информация, которую мог бы знать только владелец аккаунта.\n**7. Если у вас есть еще аккаунты на нашем сервере, назовите по 1-2 персонажа с них.**\n8. Любая другая информация, которую мог бы знать только владелец аккаунта.\n**9. Подробно опишите причину, почему вы обратились к нам и что случилось (у вас украли персонажей, аккаунт или вам необходимо заменить почту/пароль и опишите действия, которые вы предприняли для решения проблемы самостоятельно, если таковые были).**`});
    }
    if (interaction.values[0] == "DonationsAndPurchase") {
      interaction.reply({ephemeral: true, content: `→ [Пожертвования и операции в личном кабинете](https://forum.pandawow.ru/forumdisplay.php?f=20).\n\n→ **__[Пожертвования: прочтите внимательно перед обращением!](https://forum.pandawow.ru/showthread.php?t=10699)__**\n\n**1. Реалм, ник персонажа и фракция, кому был заказан предмет/услуга. Если предмет был заказан с другого аккаунта, дополнительно укажите ник персонажа с этого аккаунта.**\n2. Ссылка на предмет/название услуги, которые были заказаны в личном кабинетe (используйте ru.wowhead.com или mop.wowroad.info).\n**3. Примерная дата (день), когда это было куплено.**\n4. Описание проблемы. Варианты: не пришел предмет, который купили; не поменялся после смены фракции какой-то предмет; купили предмет, а он не работает; купили смену фракции, а она не меняется и так далее. Опишите все, что случилось.\n**5. Что конкретно вы хотите от администрации. Ссылка на конкретную вещь/бонусы/свой вариант.**\n6. Скриншоты проблемы: \n • a. Скриншот каждого предмета, с которым у вас проблемы (Навести курсор на предмет);\n • b. Скриншот проблемы, какая бы она ни была - скриншот не меняющейся фракции/непризываемого маунта/неработающего спутника/возникающей ошибки и т.п`});
    }
    if (interaction.values[0] == "PandaWoWLauncher") {
      interaction.reply({ephemeral: true, content: `Поддерживаемые операционные системы: **Windows 7, Windows 8, Windows 10**.\n\nДля корректной работы лаунчера у вас должны быть установлены: \n  • [Microsoft .NET Framework 4.5](<https://www.microsoft.com/ru-RU/download/details.aspx?id=30653>) (иначе программа будет закрываться с __[ошибкой](<https://i.imgur.com/P0eBL7F.png>)__).\n  • **Microsoft Visual C++ Update**: __[для х32](<https://aka.ms/vs/16/release/vc_redist.x86.exe>)__ | __[для х64](<https://aka.ms/vs/16/release/vc_redist.x64.exe>)__ систем.\n  • Установлен браузер по умолчанию в настройках вашей операционной системы (для Windows 8.1 и более ранних версий).\n\nВся актуальная информация здесь: __[перейти.](https://forum.pandawow.ru/showthread.php?t=227817)__`});
    }
    if (interaction.values[0] == "Rules") {
      interaction.reply({ephemeral: true, content: `• **__[Правила форума PandaWoW.](https://forum.pandawow.ru/showthread.php?t=5043)__**\n• **__[Критерии наказаний за нарушения в игре на PandaWoW.](https://forum.pandawow.ru/showthread.php?t=1503)__**\n• **__[Discord: правила поведения.](https://forum.pandawow.ru/showthread.php?t=223735)__**\n• **__[Обсуждение и обжалование игровых и форумных наказаний.](https://forum.pandawow.ru/showthread.php?t=246537)__**\n• **__[Правила/требования к составлению жалоб на игроков.](https://forum.pandawow.ru/showthread.php?t=5753)__**\n• **__[Правила игрового сервера PandaWoW.](https://forum.pandawow.ru/showthread.php?t=15)__**\n• **__[Правила групп PandaWoW в социальных сетях.](https://forum.pandawow.ru/showthread.php?t=13)__**`});
    }
   // client.channels.cache.get(`976816535001784441`).send(`${interaction.user.tag} посмотрел меню **${interaction.values[0]}**.`);
  }
});

client.api.applications("897893301653495828").guilds('790275150816870401').commands.post({data: {
    name: 'find',
    description: 'Осуществить поиск по форуму.'
}});

client.on("interactionCreate", async (interaction, message) => {
  if (!interaction.isCommand()) return;
  //const prefix = "!";
  //let args = message.content.substring(prefix.length).toLowerCase().split(" ");
  
  //if (!message.content.startsWith(prefix)) return;
  if (interaction.commandName == "find") {
    interaction.reply({content: `test`, ephemeral: true});
    
      /*if (!args[1]) return interaction.reply("Incorrect arguments.");
      if (args[1] && !args[2] && !args[3]) {
        interaction.reply(`Результат: https://cse.google.com/cse?cx=6533b0c2a63977543&q=${args[1]}&submit.x=0&submit.y=0&ie=UTF-8`);
      }
      if (args[1] && args[2] && !args[3]) {
        interaction.reply(`Результат: https://cse.google.com/cse?cx=6533b0c2a63977543&q=${args[1]}+${args[2]}&submit.x=0&submit.y=0&ie=UTF-8`);
      }
      if (args[1] && args[2] && args[3] && !args[4]) {
        interaction.reply(`Результат: https://cse.google.com/cse?cx=6533b0c2a63977543&q=${args[1]}+${args[2]}+${args[3]}&submit.x=0&submit.y=0&ie=UTF-8`);
      }
      if (args[4]) {
        interaction.reply(`Tоo many arguments.`);
        }*/
  }
});

client.on(`ready`, async () => {
  client.channels.cache.get("871104249176666112").send({content: `<483591282912919553>, запустился.`});
  console.log("Запустился.");
});

//keepAlive();
client.login(config.BOT_TOKEN);