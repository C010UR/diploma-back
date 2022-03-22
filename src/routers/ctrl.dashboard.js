import Router from "express-promise-router";
import validator from "validator";
import knex from "../db/knex.js";
import isAuth from "../middleware/auth.js";

const router = new Router();

export default router;

async function getFromTable(req, res, next, table, isUrgency = false) {
  try {
    const select = isUrgency
      ? { value: "_id", label: "_field", interval: knex.raw("_interval::varchar") }
      : { value: "_id", label: "_field" };
    const data = await knex(table).select(select).offset(1);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

async function addRowTable(req, res, next, table, isUrgency = false) {
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
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

async function updateRowTable(req, res, next, table, isUrgency = false) {
  const form = req.body;
  // validate input
  if (!(form.id && validator.isUUID(form.id) && form.field)) {
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
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

async function deleteRowTable(req, res, next, table) {
  // validate input
  if (!(req.body.id && validator.isUUID(req.body.id))) {
    return res.status(400).end();
  }
  try {
    await knex(table).where("_id", req.body.id).del();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

router.get("/technicians", isAuth, async (req, res, next) => {
  await getFromTable(req, res, next, "technicians");
});

router.post("/technicians", isAuth, async (req, res, next) => {
  await addRowTable(req, res, next, "technicians");
});

router.patch("/technicians", isAuth, async (req, res, next) => {
  await updateRowTable(req, res, next, "technicians");
});

router.delete("/technicians", isAuth, async (req, res, next) => {
  await deleteRowTable(req, res, next, "technicians");
});

router.get("/works", isAuth, async (req, res, next) => {
  await getFromTable(req, res, next, "common_works");
});

router.post("/works", isAuth, async (req, res, next) => {
  await addRowTable(req, res, next, "common_works");
});

router.patch("/works", isAuth, async (req, res, next) => {
  await updateRowTable(req, res, next, "common_works");
});

router.delete("/works", isAuth, async (req, res, next) => {
  await deleteRowTable(req, res, next, "common_works");
});

router.get("/defects", isAuth, async (req, res, next) => {
  await getFromTable(req, res, next, "common_defects");
});

router.post("/defects", isAuth, async (req, res, next) => {
  await addRowTable(req, res, next, "common_defects");
});

router.patch("/defects", isAuth, async (req, res, next) => {
  await updateRowTable(req, res, next, "common_defects");
});

router.delete("/defects", isAuth, async (req, res, next) => {
  await deleteRowTable(req, res, next, "common_defects");
});

router.get("/cabinets", isAuth, async (req, res, next) => {
  await getFromTable(req, res, next, "cabinets");
});

router.post("/cabinets", isAuth, async (req, res, next) => {
  await addRowTable(req, res, next, "cabinets");
});

router.patch("/cabinets", isAuth, async (req, res, next) => {
  await updateRowTable(req, res, next, "cabinets");
});

router.delete("/cabinets", isAuth, async (req, res, next) => {
  await deleteRowTable(req, res, next, "cabinets");
});

router.get("/urgency", isAuth, async (req, res, next) => {
  await getFromTable(req, res, next, "urgency", true);
});

router.post("/urgency", isAuth, async (req, res, next) => {
  await addRowTable(req, res, next, "urgency", true);
});

router.patch("/urgency", isAuth, async (req, res, next) => {
  await updateRowTable(req, res, next, "urgency", true);
});

router.delete("/urgency", isAuth, async (req, res, next) => {
  await deleteRowTable(req, res, next, "urgency");
});

router.get("/administrators", isAuth, async (req, res, next) => {
  try {
    const data = await knex("administrators").select({
      value: "_id",
      label: "_login",
      created_at: "created_at"
    });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/administrators", isAuth, async (req, res, next) => {
  // validate input
  if (!(req.body.id && validator.isUUID(req.body.id, 4))) {
    return res.status(400).end();
  }
  try {
    await knex("administrators").where("_id", req.body.id).del();
    await knex("sessions").where(knex.raw("(sess->>'administrator')::uuid"), req.body.id).del();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});
