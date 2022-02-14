import Router from "express-promise-router";
import query from "../db/query.js";
import log from "../logging.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  const { rows: urgency } = await query(req.ip, "SELECT _id, _field FROM urgency");
  const { rows: cabinets } = await query(req.ip, "SELECT _id, _field FROM cabinets");

  res.render("index", {
    urgency,
    cabinets
  });
});

router.post("/", async (req, res) => {
  const request = Object.keys(req.body).map((key) => req.body[key]);
  try {
    await query(
      req.ip,
      ` INSERT INTO requests (client, client_phone, urgency_id, cabinet_id, defects, defect_description) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
      request
    );
  } catch (error) {
    log(req.ip, "sql", error, true);
  }
  res.redirect("/support");
});
