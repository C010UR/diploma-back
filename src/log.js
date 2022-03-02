/* eslint-disable no-console */

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}:${padStr(date.getSeconds())}`;
}

function log(client, headers, text, isError) {
  if (isError) {
    console.error(`[${dateToStr(new Date())}] !ERROR Address - ${client} | ${headers}\n${text}\n`);
  } else {
    console.log(`[${dateToStr(new Date())}] Address - ${client} | ${headers}\n${text}\n`);
  }
}

export { dateToStr, log };
