import { Bot, InlineKeyboard, Keyboard, webhookCallback } from "grammy";

// ! ALWAYS CHECKOUT BEFORE DEPLOY
const botToken = process.env.BOT_TOKEN_PROD || "";
const miniAppUrl = process.env.WEB_APP_PROD || "";
const bot = new Bot(botToken);

bot.command("start", async (ctx) => {
  await ctx.reply(
    `Welcome to the HaulerHub bot!\n
To use bot, you need to launch Mini App
    `,
    {
      reply_markup: new InlineKeyboard().webApp(
        "Login to Platform",
        miniAppUrl
      ),
    }
  );
});
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
  }
});
bot.on(":web_app_data", (ctx) => {
  const web_app_data = ctx.message?.web_app_data.data;
  ctx.reply(`Please send us live location:\n\n ${web_app_data}`);
});

// * switch on prod
// start
// bot.start();
export default webhookCallback(bot, "https");
