import Router from "express-promise-router";
import validator from "validator";
import knex from "../db/knex.js";

const router = new Router();

export default router;

router.get("/urgency", async (req, res, next) => {
  try {
    const data = await knex("urgency")
      .select({
        value: "_id",
        label: "_field"
      })
      .offset(1);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/cabinets", async (req, res, next) => {
  try {
    const data = await knex("cabinets")
      .select({
        value: "_id",
        label: "_field"
      })
      .offset(1);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/defects", async (req, res, next) => {
  try {
    const data = await knex("common_defects").select("_field").offset(1);
    const result = data.map((obj) => obj._field);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const form = req.body;
  // validate input
  if (
    !(
      form.client_name &&
      form.urgency &&
      validator.isUUID(form.urgency) &&
      form.cabinet &&
      validator.isUUID(form.cabinet) &&
      form.defects
    )
  ) {
    return res.status(400).end();
  }

  try {
    await knex("requests").insert({
      client: form.client_name,
      client_phone: form.client_phone,
      urgency_id: form.urgency,
      cabinet_id: form.cabinet,
      defects: form.defects,
      defect_description: form.defect_description
    });
  } catch (error) {
    next(error);
  }
  return res.status(201).send(form);
});
