# What is this bot about?
Telegram bot for chat based on Node JS using API SimiSimi by [Me](https://github.com/fikiismyname)

![SimiSimi image](https://simsimi.com/_nuxt/img/simsimi_image.4de3919.png)

# How to deploy?
## Installing requirements
* Clone this repo :
```git
git clone https://github.com/fikiismyname/telegram-bot-simisimi.git
cd telegram-bot-simisimi
```
> Make sure NodeJS and npm is installed
* Install required npm packages :
```node
npm install
```
## Setting up config file
* Copy example config as config.js :
`cp example_config.js config.js`

Fill up all the fields. Meaning of each fields are discussed below:
* **TOKEN** : The telegram bot token that you get from [@BotFather](https://t.me/botfather)
* **USER_ID** : Telegram ID of the user you want to use to view the activity log of this bot

# Deploying
* Start the bot by using this command :
`npm start`