import Router from "express-promise-router";
import knex from "../db/knex.js";
import { log } from "../log.js";
import isAuth from "../middleware/auth.js";

const router = new Router();

export default router;

router.get("/technicians", isAuth, async (req, res) => {
  try {
    const data = await knex("technicians")
      .select({
        value: "_id",
        label: "_field"
      })
      .offset(1);
    res.status(200).send(data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
});

router.get("/works", isAuth, async (req, res) => {
  try {
    const data = await knex("common_works").select({
      value: "_id",
      label: "_field"
    });
    res.status(200).send(data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
});
