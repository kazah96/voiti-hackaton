import TelegramBot from "node-telegram-bot-api";
import mongoose, { Schema } from "mongoose";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const FASTAPI_HOST = process.env.FASTAPI_HOST;
const FASTAPI_PORT = process.env.FASTAPI_PORT;

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

const fastapiUrl = `http://${FASTAPI_HOST}:${FASTAPI_PORT}`;

const http = axios.create({ baseURL: fastapiUrl });
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

bot.on("photo", async (msg) => {
  if (msg.photo) {
    const file = await bot.getFile(msg.photo[0].file_id);

    if (!file.file_path) {
      return;
    }

    const file_url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    const result = await http.post("/guess_number_by_url", { file_url });

    bot.sendMessage(msg.chat.id, JSON.stringify(result.data));
    bot.sendMessage(msg.chat.id, `Скорее всего это ${result.data[0]}`);
  }
});

bot.onText(/\/add_cat (\w+)/, async (msg, match) => {
  if (!match) {
    return null;
  }

  console.log("sdgdf");
  const name = match[1];
  const cat = new Cat({
    name: match[1],
    age: Math.random() * 100,
    breed: "test breed",
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
