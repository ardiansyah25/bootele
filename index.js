require('dotenv').config();

const { BOT_TOKEN } = process.env;
const { Telegraf } = require('telegraf')

const bot = new Telegraf(BOT_TOKEN)

bot.hears("location", (ctx) => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?', requestLocationKeyboard);
})

const requestLocationKeyboard = {
  "reply_markup": {
    "one_time_keyboard": true,
    "keyboard": [
      [{
        text: "My location",
        request_location: true,
        one_time_keyboard: true
      }],
      ["Cancel"]
    ]
  }

}

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))