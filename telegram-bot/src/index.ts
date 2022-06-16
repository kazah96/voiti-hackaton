import TelegramBot from "node-telegram-bot-api";
import mongoose, { Schema } from "mongoose";

const token = process.env.TOKEN;

const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_port = process.env.MONGO_PORT;
const mongo_host = process.env.MONGO_HOST;

if (!(mongo_host && mongo_password && mongo_port && mongo_user)) {
  console.log(mongo_host);
  console.log(mongo_port);
  console.log(mongo_user);
  console.log(mongo_password);
  throw new Error("Mongo settings not enough");
}

const mongoDbConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

if (typeof token !== "string") {
  throw new Error("Token not found");
}

async function connect() {
  await mongoose.connect(mongoDbConnectionString);
}

connect();

const catSchema = new Schema({
  name: String,
  age: Number,
  breed: String,
});

const Cat = mongoose.model("Cat", catSchema);
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/add_cat (\w+)/, async (msg, match) => {
  if (!match) {
    return null;
  }

  const name = match[1];
  const cat = new Cat({
    name: match[1],
    age: Math.random() * 100,
    breed: "fsd",
  });

  const result = await cat.save();
  bot.sendMessage(msg.chat.id, JSON.stringify(result, null, 4));
});

bot.onText(/\/get_cats/, async (msg: any) => {
  const cats = await Cat.find();

  const answer = cats.map((cat) => ({
    name: cat.name,
    age: cat.age,
    breed: cat.breed,
  }));

  bot.sendMessage(msg.chat.id, JSON.stringify(answer, null, 4));
});
