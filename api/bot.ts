import { Bot, InlineKeyboard, Keyboard, webhookCallback } from "grammy";
import { commands } from "./commands";
// ! ALWAYS CHECKOUT BEFORE DEPLOY
const botToken = process.env.BOT_TOKEN_PROD || "";
const botUrl = process.env.BOT_URL_PROD || "";

const bot = new Bot(botToken);

bot.on(":location", async (ctx) => {
  const loc = ctx.message?.location;
  if (loc && loc.live_period) {
    await ctx.reply("Live Location Started");
  }
});

bot.on("edit:location", async (ctx) => {
  const loc = ctx.editedMessage?.location;

  if (loc && loc.live_period) {
    ctx.reply(`
  lat: ${loc?.latitude}\n
  long: ${loc?.longitude}
  `);

    //
  }
});
bot.on(":web_app_data", async (ctx) => {
  const web_app_data = ctx.message?.web_app_data.data;
  ctx.reply(`Please send us live location:\n`, {
    reply_markup: new Keyboard().requestLocation("Send Location"),
  });
});

//composers
bot.use(commands);

// * switch on prod
// start
// bot.start();

bot.api.setWebhook(botUrl);
export default webhookCallback(bot, "https");

export { bot };
