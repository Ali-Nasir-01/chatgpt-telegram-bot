
# ChatGPT Telegram Bot

This is a Telegram bot for interacting with a large language model trained by OpenAI. It enables users to interact with the ChatGPT AI in natural language and receive responses in real time.

The idea of this bot is to provide an easy to use interface for people who want to experiment with conversational AI. With this bot, you can ask any question that you have in mind and get an answer.

Also, this bot can join telegram groups and if mentioned answer your questions.

## Features
- Real-time responding
- Send messages completely free and without any limitations throughtout the day
- Add bot to the telegram groups
- Based on [npm chatgpt package](https://www.npmjs.com/package/chatgpt)
## Usage

### Our Pre-Installed Bot

If you just want to use ChatGPT you can search for ```@TextChatGPTBot``` in telegram and start to use it.

### Your Own Bot
If you want to have your own bot easily you can clone this project and add a ```.env``` file with these states on it:

    TELEGRAM_TOKEN="Your telegram bot token"
    BOT_USERNAME="@your_bot_username"
    ACCESS_TOKEN="Your OpenAI access token"

And after that just run ```npm i``` and ```npm start``` in your command line.

you can manually get an accessToken by logging in to the ChatGPT webapp and then opening ```https://chat.openai.com/api/auth/session```, which will return a JSON object containing your ```accessToken``` string.

## TODO
- Use both ProxyAPI and API with options specified in the configuration file
- Add bot commands

## Contribution
Thank you for considering contributing! If you find an issue or have a better way to do something, feel free to open an issue or a PR.

## License
This repository is open-sourced software licensed under the Apache License 2.0.
