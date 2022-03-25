import viber from "viber-bot";
import knex from "../db/knex.js";

const websiteLink = "https://mtec-support.herokuapp.com";

const bot = new viber.Bot({
  authToken: process.env.VIBER_API_KEY,
  name: "МТЭК Заявки на ремонт",
  avatar: "http://mtec.by/templates/mtec-3/i/logo.png"
});

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateTimeToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}`;
}

async function sendNewRequestMessage(client) {
  console.log("SUCC");
  const subs = await knex.table("viber_subs").select();
  console.log(subs);
  subs.forEach((sub) => {
    bot.sendMessage(
      { id: sub._id },
      new viber.Message.Text(`${dateTimeToStr(new Date())} Пришла заявка на ремонт от ${client}`)
    );
  });
}

export { bot, sendNewRequestMessage };

function say(response, message) {
  response.send(new viber.Message.Text(message));
}

bot.onSubscribe((response) => {
  say(
    response,
    `Здравствуйте, вы подписались на бота для веб-сайта ${websiteLink} Данный бот будет уведомлять вас о новых заявках на ремонт.`
  );
  knex.table("viber_subs").insert({ _id: response.id });
  console.log(knex.table("viber_subs").insert({ _id: response.id }).toSQL());
});

bot.onUnsubscribe((user) => {
  knex.table("viber_subs").where("_id", user).del();
});
