import { Bot, Context } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
import { menuKeyboard, choose, interesKeyboard } from "./keyboards.ts"; 
import { getProfile, reviewProfile, setState, getSimularUsers } from "./functions.ts"; 
import { createClient } from "npm:@supabase/supabase-js"; 
import { UserInfo } from "./interfaces.ts";
const supabaseUrl = "https://goscxscwzyizqwwwiyxe.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_KEY") || "";// выпилил
const supabase = createClient(supabaseUrl, supabaseKey);
export const users = supabase.from("users");
export const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");// и это тоже выпилил

export const database = await Deno.openKv();

export const info: UserInfo = {
  id: 0,
  name: "",
  age: 0,
  interests: "",
  coffee: "",
  time: 0,
  done: false,
  state: "",
};
bot.command("start", async (ctx) => { // бот получает команду /start
  info.id = Number(ctx.msg.from?.id);
  if (await getProfile()) {
    await ctx.reply(`Привет, ${info.name}!`, { reply_markup: menuKeyboard });
  } else {
    await users.insert({
      tg_id: info.id,
      state: "setName",
    });
    await ctx.reply(
      "Йоу, чё как?! \nТы тут в первый раз. Тогда поясню. \nЯ бот, который поможет завести новые знакомства, встретиться, пообщатся. Ты не против? \nТогда начнём",
    );
    await ctx.reply(
      "Звать то тебя как? А прозвище то есть?",
    );
    setState("setName"); 
  }
});

bot.command("like", async (ctx) => {
    const userId = ctx.from?.id.toString();
    if (!userId) return;

    // Если собеседника еще не оценивали то создаем запись
    if (!ratings[userId]) {
        ratings[userId] = { likes: 0, dislikes: 0 };
    }

    // Увеличиваем счетчик "нравится"
    ratings[userId].likes += 1;

    await ctx.reply("Спасибо! Тебе понравился собеседник. 👍");
});

// Команда /dislike
bot.command("dislike", async (ctx) => {
    const userId = ctx.from?.id.toString();
    if (!userId) return;

    // Если собеседника еще не оценивали то создаем запись
    if (!ratings[userId]) {
        ratings[userId] = { likes: 0, dislikes: 0 };
    }

   // Увеличиваем счетчик "не нравится"
    ratings[userId].dislikes += 1;

    await ctx.reply("Спасибо! Тебе не нравится собеседник. 👎");
});

// Команда /stats для получения статистики оценок
bot.command("stats", async (ctx) => {
    const userId = ctx.from?.id.toString();
    const userRatings = ratings[userId] || { likes: 0, dislikes: 0 };
    const response = `Статистика: Нравится: ${userRatings.likes}, Не нравится: ${userRatings.dislikes}`;
    await ctx.reply(response);
});

// обработка подтверждения интересов
bot.callbackQuery("interestsDone", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Отлично!");
  await reviewProfile(ctx);
});
bot.callbackQuery("interestsNotDone", async (ctx) => {
  await ctx.deleteMessage();
  info.interests = "";
  await ctx.reply("Напиши увлечения занова!");
  setState("setInterests");
});
bot.callbackQuery("1", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("ВАУ ЭТО любимая кофейня моего создателя! \n Скуратов. 70 лет Октября, 7");
  info.coffee = "Скуратов. 70 лет Октября, 7"
  await ctx.reply(
    "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
  );
  await ctx.reply(
    "PS: напиши только час в 24-часовой системе",
  );
  setState("setTime");
});
bot.callbackQuery("2", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Отлично! Скуратов. Мира, 7А");
  info.coffee = "Скуратов. Мира, 7А"
  await ctx.reply(
    "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
  );
  await ctx.reply(
    "PS: напиши только час в 24-часовой системе",
  );
  setState("setTime");
});
bot.callbackQuery("3", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Отлично! Скуратов. Красный Путь, 63");
  info.coffee = "Скуратов. Красный Путь, 63"
  await ctx.reply(
    "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
  );
  await ctx.reply(
    "PS: напиши только час в 24-часовой системе",
  );
  setState("setTime");
});
bot.callbackQuery("4", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("Отлично! Скуратов. Иртышская Набережная, 30");
  info.coffee = "Скуратов. Иртышская Набережная, 30"
  await ctx.reply(
    "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
  );
  await ctx.reply(
    "PS: напиши только час в 24-часовой системе",
  );
  setState("setTime");
});
bot.callbackQuery("5", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.reply("ХОРОШО! Энитайм. Лобкова, 6/1");
  info.coffee = "Энитайм. Лобкова, 6/1"
  await ctx.reply(
    "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
  );
  await ctx.reply(
    "PS: напиши только час в 24-часовой системе",
  );
  setState("setTime");
});
bot.hears(
  ["профиль", "Профиль", "Мой профиль", "Мой профиль 👤"],
  async (ctx) => {
    setState("setTime");
  },
);

bot.on("message", async (ctx) => {
  if (info.state) { // при непустом info.state
    switch (info.state) {
      case "setName":
        if (
          typeof ctx.msg.text !== "string" ||
          /[0-9_.*^%$#@!]/.test(ctx.msg.text) // регулярное выражение на проверку спец символов
        ) {
          await ctx.reply(
            "Косяк! Имя не должно содержать числа и символы",
          );
          return;
        } else {
          info.name = ctx.msg.text || ""; //сохраняем в переменную
          await ctx.reply("Ну, проходи тогда,  " + info.name + "!");
          await ctx.reply("Сколько лет то тебе?");
          setState("setAge");
        }
        break;

      case "setAge":
        if (isNaN(Number(ctx.msg.text))) {
          await ctx.reply("Напиши возраст циферками)))");
          return;
        }
        info.age = Number(ctx.msg.text);
          await ctx.reply("Выбери кофейню по душе!", { reply_markup: interesKeyboard })//"Круто! напиши свои интересы ЧЕРЕЗ запятую",
        //setState("setCoffee");
        break;
        
        case "setCoffee":
        /*if(isNaN(Number(ctx.msg.text)) || Number(ctx.msg.text) > 5){
          await ctx.reply("Чёт я тебя не понял|-1-|");
          return;
        }
        info.coffee = Number(ctx.msg.text);*/
        await ctx.reply(
          "Хорошо! а теперь скажи мне время в которое тебе удобно",//"Хорошо! Твоя анкета создана! Жди новых сообщений с предложением попить кофейку!",
        );
        await ctx.reply(
          "PS: напиши только час в 24-часовой системе",
        );
        setState("setTime");
        break;

        case "setTime":
        if(isNaN(Number(ctx.msg.text)) || Number(ctx.msg.text) > 24){
          await ctx.reply("Чёт я тебя не понял|-1-|");
          return;
        }
        await ctx.reply("Принял. Только ты не опаздывай) \n тепеь Напиши свои интересы ЧЕРЕЗ ЗАПЯТУЮ");
        setState("setInterests")
        break;


        
        case "setInterests":
        info.interests = ctx.msg.text || "";
        await ctx.reply(
          "Вот это твои интересы:",
        );
        await ctx.reply(
          info.interests,
        );
        await ctx.reply("Интересно конечно. Это всё??", { reply_markup: choose }); // смотри bot.callbackQuery
        break;

      case "review":
        switch (ctx.msg.text) {
          case "Да!":
            info.done = true;
            await ctx.reply("Отлично!");
            const {data, error} = await users.update({
              name: info.name,
              age: info.age,
              time: info.time,
              coffee: info.coffee,
              interests: info.interests,
              done: info.done,
            }).eq("tg_id", info.id).single();
            console.log(data, error)
            await ctx.reply("Жди пока Я найду Тебе собеседники)");
            //setState("searching")
            break;

          case "Нет, хочу изменить":
            setState("setName");
            await ctx.reply("Давайте начнем сначала! Как тебя звать?");
            info.interests = [];
            break;

          default:
            await ctx.reply("что то пошло не так!"); // я не понял
            break;
        }
        break;
        
      default:
        break;
    }
  }
});
// пу пу пу
//скажем что хуйня
/*while (info.state == "searching") {
  setInterval(async ()=>{
    const users = await getSimularUsers()
    if (users.length>0) {
      console.log("ого")
    }
  }, 10000)
}*/
