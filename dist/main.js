var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TelegramBot from "node-telegram-bot-api";
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
});
const generateResponse = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg)
        return "";
    try {
        const text = msg || "";
        const response = yield api.sendMessage(text);
        return response.text;
    }
    catch (err) {
        console.log('err', err);
        return "There is no answer";
    }
});
const removeUsername = (msg) => {
    return msg.replace(`${botUsername} `, "");
};
// Handle incoming Telegram messages
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.chat.type === "private") {
        const chatId = msg.chat.id;
        const response = yield generateResponse(msg.text);
        bot.sendMessage(chatId, response);
    }
}));
const regex = new RegExp(botUsername, "g");
bot.onText(regex, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const text = removeUsername(msg.text);
    const response = yield generateResponse(text);
    bot.sendMessage(chatId, response);
}));
