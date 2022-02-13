import pool from "./pool.js";
import log from "../logging.js";

export default async function query(remoteAddr, text, params) {
  log(remoteAddr, "sql", text);
  return pool.query(text, params);
}
