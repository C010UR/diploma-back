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
  return `${padStr(date.getDate())}/${padStr(date.getMonth())}/${padStr(date.getFullYear())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}`;
}

async function sendNewRequestMessage(client) {
  const subs = await knex.table("viber_subs").select();
  subs.forEach(async (sub) => {
    await bot.sendMessage(
      { id: sub.val },
      new viber.Message.Text(`${dateTimeToStr(new Date())} Пришла заявка на ремонт от ${client}`)
    );
  });
}

export { bot, sendNewRequestMessage };

function say(response, message) {
  response.send(new viber.Message.Text(message));
}

bot.onSubscribe(async (response) => {
  await knex.table("viber_subs").insert({ val: response.userProfile.id });
  say(
    response,
    `Здравствуйте, вы подписались на бота для веб-сайта ${websiteLink} Данный бот будет уведомлять вас о новых заявках на ремонт.`
  );
  console.log("HERE");
});

bot.onUnsubscribe(async (user) => {
  await knex.table("viber_subs").where("val", user).del();
});
