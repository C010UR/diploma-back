import Router from "express-promise-router";
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

router.get("/table", isAuth, async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 50;
  try {
    const { rows: data } = await query(
      req.ip,
      ` SELECT 
          requests._id, (urgency._interval + created_at) AS status, cabinets._field AS cabinet, technician, 
          performed_works, client, client_phone, defects, defect_description, created_at, done_at
        FROM requests
        JOIN urgency ON (requests.urgency_id = urgency._id)
        JOIN cabinets ON (requests.cabinet_id = cabinets._id)
        ORDER BY created_at DESC
        LIMIT $2
        OFFSET $1`, // LIMIT OFFSET is bad but i'm too lazy and there will not be millions of rows
      [(page - 1) * limit, limit]
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].technician !== null) {
        data[i].status = "Выполнено";
        data[i].statusClass = "status-completed";
      } else {
        const status = (data[i].status - new Date()) / 3600000; // divide by an hour
        if (status < 0) {
          data[i].status = "Просрочено";
          data[i].statusClass = "status-expired";
        } else if (status <= 1) {
          data[i].status = "< часа";
          data[i].statusClass = "status-hour";
        } else if (status <= 24) {
          data[i].status = "< дня";
          data[i].statusClass = "status-day";
        } else if (status <= 168) {
          data[i].status = "< недели";
          data[i].statusClass = "status-week";
        } else {
          data[i].status = "> недели";
          data[i].statusClass = "status-none";
        }
      }
      data[i].created_at = dateToStr(data[i].created_at);
      if (data[i].done_at) {
        data[i].done_at = dateToStr(data[i].created_at);
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
  if (!(form.id && form.technician && form.performed_works)) {
    return res.status(400).end();
  }
  const request = [form.id, form.technician, form.performed_works];
  try {
    await query(
      req.ip,
      ` UPDATE requests
        SET done_at = NOW(), technician = $2, performed_works = $3
        WHERE _id = $1`,
      request
    );
    return res.status(200).send(form);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
});
