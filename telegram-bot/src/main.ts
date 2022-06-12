import TelegramBot from "node-telegram-bot-api";

const token = "836083691:AAF2G9x3KC7LgQeXpy8reEvjYZD7utNlP1A";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg: any) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Received your f few werqwer");
});

bot.onText(/\/fwe (\w+) (\w+)/, (msg, match) => {
  if (!match) {
    return null;
  }
});
