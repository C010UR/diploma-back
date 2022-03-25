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
  const data = await knex.table("view_requests").select().where("_id", client);
  const request = data[0];
  const subs = await knex.table("viber_subs").select();
  subs.forEach(async (sub) => {
    // prettier-ignore
    await bot.sendMessage(
      { id: sub.val },
      new viber.Message.Text(`${dateTimeToStr(new Date())} Пришла заявка на ремонт от ${request.client} в ${request.cabinet}. Указанные неисправности: ${request.defects}.`)
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
    `Теперь вы подписаны на бота от ${websiteLink} Данный бот будет уведомлять вас о новых заявках на ремонт.`
  );
});

bot.onUnsubscribe(async (user) => {
  await knex.table("viber_subs").where("val", user).del();
});

bot.on(viber.Events.MESSAGE_RECEIVED, (message, response) => {
  say(
    response,
    "Извините, но данный бот служит только для уведомления о новых заявках на ремонт. Он не поддерживает разговор с пользователем"
  );
});
