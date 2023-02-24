import TelegramBot from "node-telegram-bot-api";
import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
import { exit } from "process";
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const apiKey = process.env.CHATGPT_TOKEN;
const botUsername = process.env.BOT_USERNAME;

if (!token || !apiKey || !botUsername) {
  throw "Your .env variables not found!";
  exit(1)
}

// Initialize Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Initialize OpenAI client
const api = new ChatGPTAPI({
  apiKey: apiKey,
});

const generateResponse = async (msg: string) => {
  if (!msg) return "";
  try {
    const text = msg || "";
    const response = await api.sendMessage(text);
    return response.text;
  } catch (err) {
    return "There is no answer";
  }
};

const removeUsername = (msg: string) => {
  return msg.replace(`${botUsername} `, "");
};

// Handle incoming Telegram messages
bot.on("message", async (msg) => {
  if (msg.chat.type === "private") {
    const chatId = msg.chat.id;
    const response = await generateResponse(msg.text!);
    bot.sendMessage(chatId, response);
  }
});

const regex = new RegExp(botUsername, "g");
bot.onText(regex, async (msg) => {
  const chatId = msg.chat.id;
  const text = removeUsername(msg.text!);
  const response = await generateResponse(text);
  bot.sendMessage(chatId, response);
});
