import TelegramBot from "node-telegram-bot-api";
import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const apiKey = process.env.CHATGPT_TOKEN;
const botUsername = process.env.BOT_USERNAME;

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
  try {
    const response = await api.sendMessage(text);
    return response.text;
  } catch (err) {
    return "There is no answer";
  }
};

const removeUsername = (msg) => {
  return msg.replace(`${botUsername} `, "");
};

// Handle incoming Telegram messages
bot.on("message", async (msg) => {
  if (msg.chat.type === "private") {
    const chatId = msg.chat.id;
    const text = msg.text;
    const response = await generateResponse(text);
    bot.sendMessage(chatId, response);
  }
});

const regex = new RegExp(botUsername, "g");
bot.onText(regex, async (msg) => {
  const chatId = msg.chat.id;
  const text = removeUsername(msg.text);
  const response = await generateResponse(text);
  bot.sendMessage(chatId, response);
});
