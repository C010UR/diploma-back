/* eslint-disable no-console */
import log4js from "log4js";

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}:${padStr(date.getSeconds())}`;
}

function log(client, headers, text, isError, isHTTP) {
  const logger = log4js.getLogger(headers);
  if (process.env.NODE_ENV === "production") {
    logger.level = "error";
  } else {
    logger.level = "debug";
  }
  if (isHTTP) {
    logger.debug(`${client}\n${text}\n`);
  } else if (isError) {
    logger.error(`${client}\n${text}\n`);
  } else {
    logger.info(`${client}\n${text}\n`);
  }
}

export { dateToStr, log };
