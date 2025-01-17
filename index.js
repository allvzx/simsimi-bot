process.env["NTBA_FIX_319"] = 1;

/**
 * Node.js Telegram Bot API
 * https://github.com/yagop/node-telegram-bot-api
 */
const TelegramBot = require("node-telegram-bot-api");

/**
 * Configuration file
 */
const config = require("dotenv").config();

/**
 * Promise based HTTP client for the browser and node.js
 * https://github.com/axios/axios
 */
const axios = require("axios");

/**
 * Moment Timezone
 * https://github.com/moment/moment-timezone
 */
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.BOT_TIMEZONE).locale(process.env.BOT_LANG);

/**
 * Create a bot that uses 'polling' to fetch new updates
 */
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

/**
 * Listen for any kind of message. There are different kinds of
 * messages.
 */
bot.on("message", (msg) => {
  /**
   * Retrieving Message ID
   */
  const chatId = msg.chat.id;

  /**
   * Retrieve incoming messages
   */
  const pesanMasuk = msg.text;

  /**
   * Take a name
   */
  const firstName = msg.from.first_name;

  /**
   * Retrieve the user's username
   */
  const username = msg.from.username;

  /**
   * Retrieve the date when the user sent the message
   */
  const chatDate = moment(msg.date * 1000).format("DD/MM/YY HH:mm:ss");

  /**
   * Fetching data from SimSimi API
   */
  axios({
    url: `${process.env.API_URL}?text=${pesanMasuk}&lc=${process.env.BOT_LANG}&cf=true`,
    method: "GET",
  })
    .then((resp) => {
      resp.data.messages.map((el) => {
        /**
         * Display data from api
         */
        const pesanTerkirim = el.text;

        /**
         * Sending messages to users
         */
        bot.sendMessage(chatId, pesanTerkirim.replace(/simi(?!\w)/g, "fiki"));

        /**
         * Retrieve activity log
         */
        console.log(
          `\n--------------------\nID: ${msg.from.id}\nNAME: ${msg.from.first_name}\nUSERNAME: ${msg.from.username}\n\nCHAT: ${msg.text}\nREPLY: ${pesanTerkirim}\nDATE: ${chatDate}\n--------------------\n`
        );
      });
    })

    /**
     * Display error message and send to user
     */
    .catch(function (error) {
      bot.sendMessage(chatId, "BOT Sedang Maintence");
    });
});
