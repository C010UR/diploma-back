import Router from "express-promise-router";
import isUUID from "validator/lib/isUUID";
import query from "../db/query.js";
import log from "../logging.js";
// eslint-disable-next-line import/no-cycle
import { io } from "../app.js";

const router = new Router();

export default router;

router.get("/urgency", async (req, res) => {
  try {
    const { rows: urgency } = await query(req.ip, "SELECT _id, _field FROM urgency");
    res.status(200).send(urgency);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
});

router.get("/cabinets", async (req, res) => {
  try {
    const { rows: cabinets } = await query(req.ip, "SELECT _id, _field FROM cabinets");
    res.status(200).send(cabinets);
  } catch (error) {
    log(req.ip, "sql", error, true);
    res.status(500).end();
  }
});

router.post("/", async (req, res) => {
  const form = req.body;
  // validate input
  if (
    !(
      form.client_name &&
      form.urgency &&
      isUUID(form.urgency, 4) &&
      form.cabinet &&
      isUUID(form.cabinet, 4) &&
      form.defects
    )
  ) {
    return res.status(400).end();
  }
  // convert input to an array
  const request = [
    form.client_name,
    form.client_phone ?? "",
    form.urgency,
    form.cabinet,
    form.defects,
    form.defect_description ?? ""
  ];

  try {
    await query(
      req.ip,
      ` INSERT INTO requests (client, client_phone, urgency_id, cabinet_id, defects, defect_description) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING _id`,
      request
    );
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
  io.to("dashboard").emit("row:new", true);
  return res.status(201).send(form);
});
