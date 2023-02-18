import TelegramBot from "node-telegram-bot-api";
import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

const token = process.env.TELEGRAM_TOKEN;
const apiKey = process.env.CHATGPT_TOKEN;

// Initialize Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Initialize OpenAI client
const api = new ChatGPTAPI({
  apiKey: apiKey,
});

const generateResponse = async (msg) => {
  if (!msg) {
    return "";
  }
  const text = msg || "";
  const response = await api.sendMessage(text);
  return response.text;
};

// Handle incoming Telegram messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const response = await generateResponse(text);
  bot.sendMessage(chatId, response);
});
