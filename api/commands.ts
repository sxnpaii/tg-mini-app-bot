import { Composer, InlineKeyboard, Keyboard } from "grammy";

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

export { commands };
