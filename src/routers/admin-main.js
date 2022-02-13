import Router from "express-promise-router";
import isAuth from "../middleware/auth.js";
import query from "../db/query.js";

const router = new Router();

export default router;

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

router.get("/", isAuth, async (req, res) => {
  const { rows: data } = await query(
    req.ip,
    ` SELECT 
        (urgency._interval + created_at) AS status, cabinets._field AS cabinet, technician, 
        performed_works, client, client_phone, defects, defect_description, created_at, done_at
      FROM requests
      JOIN urgency ON (requests.urgency_id = urgency._id)
      JOIN cabinets ON (requests.cabinet_id = cabinets._id)`
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
    const createdAt = data[i].created_at;
    data[i].created_at =
      `${padStr(createdAt.getFullYear())}-${padStr(createdAt.getMonth())}-${padStr(createdAt.getDate())} ` +
      `${padStr(createdAt.getHours())}:${padStr(createdAt.getMinutes())}`;
    if (data[i].done_at) {
      const doneAt = data[i].done_at;
      data[i].created_at =
        `${padStr(doneAt.getFullYear())}-${padStr(doneAt.getMonth())}-${padStr(doneAt.getDate())} ` +
        `${padStr(doneAt.getHours())}:${padStr(doneAt.getMinutes())}`;
    }
  }

  res.render("admin", {
    request: data
  });
});
