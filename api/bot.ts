import {
  Bot,
  Composer,
  InlineKeyboard,
  Keyboard,
  webhookCallback,
} from "grammy";
// ! ALWAYS CHECKOUT BEFORE DEPLOY
const botToken = process.env.BOT_TOKEN_PROD || "";
const botUrl = process.env.BOT_URL_PROD || "";

const bot = new Bot(botToken);

const miniAppUrl = process.env.WEB_APP_PROD || "";

const commands = new Composer();

commands.command("start", async (ctx) => {
  await ctx.reply(
    `Welcome to the HaulerHub bot!\n
To use bot, you need to launch Mini App
    `,
    {
      reply_parameters: { message_id: ctx.msgId },

      reply_markup: new InlineKeyboard().webApp("Open App", miniAppUrl),
    }
  );
});

commands.command(`showtrip`, async (ctx) => {
  await ctx.reply("You can open app by pressing 'Show Trip' button", {
    reply_parameters: { message_id: ctx.msgId },
    reply_markup: new Keyboard().webApp(
      `Show Trip`,
      `${miniAppUrl}/driver/current_trip`
    ),
  });
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

// export { bot };
