import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const botUsername = process.env.BOT_USERNAME;

if (!token || !accessToken || !botUsername) {
  throw "Your .env variables not found!";
}

// Initialize Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Initialize OpenAI client
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: accessToken,
  apiReverseProxyUrl:"https://chat.duti.tech/api/conversation"
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
