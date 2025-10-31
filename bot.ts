import { Bot, Keyboard } from "grammy";

const botToken = process.env.BOT_TOKEN_PROD || "";
const miniAppUrl = process.env.WEB_APP_PROD || "";
const bot = new Bot(botToken);

bot.command("start", async (ctx) => {
  await ctx.reply("Assalomu aleykum", {
    reply_markup: new Keyboard().webApp("Open Web APP", miniAppUrl),
  });
});
bot.on(":location", async (ctx) => {
  const loc = ctx.message?.location;
  if (loc && loc.live_period) {
    await ctx.reply("Live Location Started");
  }
});

bot.on("edit:location", (ctx) => {
  const loc = ctx.editedMessage?.location;
  if (loc && loc.live_period) {
    ctx.reply(`
  lat: ${loc?.latitude}\n
  long: ${loc?.longitude}
  `);
  }
});
bot.on(":web_app_data", (ctx) => {
  ctx.reply("Please send us live location");
});

// start
bot.start();
