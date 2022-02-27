import Router from "express-promise-router";
import validator from "validator";
import isAuth from "../middleware/auth.js";
import query from "../db/query.js";
import log from "../logging.js";

const router = new Router();

export default router;

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}`;
}

router.get("/table/count", isAuth, async (req, res) => {
  try {
    const { rows } = await query(
      req.ip,
      ` SELECT COUNT(*)
        FROM requests`
    );
    return res.status(200).send(rows[0]);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
});

router.get("/table", isAuth, async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 50;
  try {
    const { rows: data } = await query(
      req.ip,
      ` SELECT 
          requests._id, (urgency._interval + created_at) AS status, cabinets._field AS cabinet, technicians._field AS technician, 
          performed_works, client, client_phone, defects, defect_description, created_at, done_at
        FROM requests
        JOIN urgency ON (requests.urgency_id = urgency._id)
        JOIN cabinets ON (requests.cabinet_id = cabinets._id)
        LEFT JOIN technicians ON (requests.technician_id = technicians._id)
        ORDER BY created_at DESC
        LIMIT $2
        OFFSET $1`, // LIMIT OFFSET is bad but i'm too lazy and there will not be millions of rows
      [(page - 1) * limit, limit]
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].technician !== null) {
        data[i].status = "status-completed";
      } else {
        const status = (data[i].status - new Date()) / 3600000; // divide by an hour
        if (status < 0) {
          data[i].status = "status-expired";
        } else if (status <= 1) {
          data[i].status = "status-hour";
        } else if (status <= 24) {
          data[i].status = "status-day";
        } else if (status <= 168) {
          data[i].status = "status-week";
        } else {
          data[i].status = "status-none";
        }
      }
      data[i].created_at = dateToStr(data[i].created_at);
      if (data[i].done_at) {
        data[i].done_at = dateToStr(data[i].done_at);
      }
    }
    return res.status(200).send(data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
});

router.patch("/table", isAuth, async (req, res) => {
  const form = req.body;
  // validate input
  if (
    !(
      form._id &&
      validator.isUUID(form._id, 4) &&
      form.technician_id &&
      validator.isUUID(form.technician_id, 4) &&
      form.performed_works
    )
  ) {
    return res.status(400).end();
  }
  // convert input to an array
  const request = [form._id, form.technician_id, form.performed_works];
  try {
    await query(
      req.ip,
      ` UPDATE requests
        SET done_at = NOW(), technician_id = $2, performed_works = $3
        WHERE _id = $1`,
      request
    );
    return res.status(200).send(form);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
});
