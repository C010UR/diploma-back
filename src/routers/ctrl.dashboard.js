import Router from "express-promise-router";
import validator from "validator";
import knex from "../db/knex.js";
import { log } from "../log.js";
import isAuth from "../middleware/auth.js";

const router = new Router();

export default router;

async function getFromTable(req, res, table, isUrgency = false) {
  try {
    const select = isUrgency
      ? { value: "_id", label: "_field", interval: "_interval" }
      : { value: "_id", label: "_field" };
    const data = await knex(table).select(select).offset(1);
    res.status(200).send(data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
}

async function addRowTable(req, res, table, isUrgency = false) {
  // validate input
  if (!req.body.field) {
    return res.status(400).end();
  }
  if (isUrgency && !req.body.interval) {
    return res.status(400).end();
  }
  try {
    const fields = isUrgency
      ? { _field: req.body.field, _interval: req.body.interval }
      : { _field: req.body.field };
    await knex(table).insert(fields);
    return res.status(200).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
}

async function updateRowTable(req, res, table, isUrgency = false) {
  const form = req.body;
  // validate input
  if (!(form.id && validator.isUUID(form.id, 4) && form.field)) {
    return res.status(400).end();
  }
  if (isUrgency && !req.body.interval) {
    return res.status(400).end();
  }
  try {
    const fields = isUrgency
      ? { _field: form.field, _interval: form.interval }
      : { _field: form.field };
    await knex(table).update(fields).where("_id", form.id);
    return res.status(200).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
}

async function deleteRowTable(req, res, table) {
  // validate input
  if (!(req.body.id && validator.isUUID(req.body.id, 4))) {
    return res.status(400).end();
  }
  try {
    await knex(table).where("_id", req.body.id).del();
    return res.status(200).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
}

router.get("/technicians", isAuth, async (req, res) => {
  await getFromTable(req, res, "technicians");
});

router.post("/technicians", isAuth, async (req, res) => {
  await addRowTable(req, res, "technicians");
});

router.patch("/technicians", isAuth, async (req, res) => {
  await updateRowTable(req, res, "technicians");
});

router.delete("/technicians", isAuth, async (req, res) => {
  await deleteRowTable(req, res, "technicians");
});

router.get("/works", isAuth, async (req, res) => {
  await getFromTable(req, res, "common_works");
});

router.post("/works", isAuth, async (req, res) => {
  await addRowTable(req, res, "common_works");
});

router.patch("/works", isAuth, async (req, res) => {
  await updateRowTable(req, res, "common_works");
});

router.delete("/works", isAuth, async (req, res) => {
  await deleteRowTable(req, res, "common_works");
});

router.get("/defects", isAuth, async (req, res) => {
  await getFromTable(req, res, "common_defects");
});

router.post("/defects", isAuth, async (req, res) => {
  await addRowTable(req, res, "common_defects");
});

router.patch("/defects", isAuth, async (req, res) => {
  await updateRowTable(req, res, "common_defects");
});

router.delete("/defects", isAuth, async (req, res) => {
  await deleteRowTable(req, res, "common_defects");
});

router.get("/cabinets", isAuth, async (req, res) => {
  await getFromTable(req, res, "cabinets");
});

router.post("/cabinets", isAuth, async (req, res) => {
  await addRowTable(req, res, "cabinets");
});

router.patch("/cabinets", isAuth, async (req, res) => {
  await updateRowTable(req, res, "cabinets");
});

router.delete("/cabinets", isAuth, async (req, res) => {
  await deleteRowTable(req, res, "cabinets");
});

router.get("/urgency", isAuth, async (req, res) => {
  await getFromTable(req, res, "urgency", true);
});

router.post("/urgency", isAuth, async (req, res) => {
  await addRowTable(req, res, "urgency", true);
});

router.patch("/urgency", isAuth, async (req, res) => {
  await updateRowTable(req, res, "urgency", true);
});

router.delete("/urgency", isAuth, async (req, res) => {
  await deleteRowTable(req, res, "urgency");
});

router.get("/administrators", isAuth, async (req, res) => {
  try {
    const data = await knex("administrators").select({
      id: "_id",
      login: "_login",
      created_at: "created_at"
    });
    res.status(200).send(data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
});

router.delete("/administrators", isAuth, async (req, res) => {
  // validate input
  if (!(req.body.id && validator.isUUID(req.body.id, 4))) {
    return res.status(400).end();
  }
  try {
    await knex("administrators").where("_id", req.body.id).del();
    return res.status(200).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
});
