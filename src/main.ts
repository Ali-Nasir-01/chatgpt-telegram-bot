import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
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
let messagesArray: MsgDetail[] = [];
// Initialize OpenAI client
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: accessToken,
});

const checkMessages = async () => {
  if (messagesArray.length > 0 && messagesArray.find(({sended}) => sended === false)) {
    for (let message of messagesArray) {
      if (!message.sended) {
        message.response = await generateResponse(message.message);
        message.sended = true;
        sendMessage(message);
      }
    }
  } else {
    messagesArray = [];
  }
}

cron.schedule('*/5 * * * * *', () => {
  checkMessages();
});

const generateResponse = async (msg: string) => {
  if (!msg) return "";
  try {
    const text = msg || "";
    const response = await api.sendMessage(text);
    return response.text;
  } catch (err) {
    console.log('err', err);
    return "There is no answer";
  }
};

const removeUsername = (msg: string) => {
  return msg.replace(`${botUsername} `, "");
};

interface MsgDetail {
  chatId: number,
  message: string,
  response: string | null,
  sended: boolean
}

const newMessage = (msgDetails: MsgDetail) => {
  messagesArray.push(msgDetails);
}

const sendMessage = (msgDetails: MsgDetail) => {
  bot.sendMessage(msgDetails.chatId, msgDetails.response!);
}

// Handle incoming Telegram messages
bot.on("message", async (msg) => {
  if (msg.chat.type === "private") {
    newMessage({
      chatId: msg.chat.id,
      message: msg.text!,
      response: null,
      sended:false
    });
  }
});

const regex = new RegExp(botUsername, "g");
bot.onText(regex, async (msg) => {
  const text = removeUsername(msg.text!);
  newMessage({
      chatId: msg.chat.id,
      message: text!,
      response: null,
      sended:false
    });
});
