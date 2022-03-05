import Router from "express-promise-router";
import validator from "validator";
import isAuth from "../middleware/auth.js";
import knex from "../db/knex.js";
import { log } from "../log.js";

const router = new Router();

export default router;

function filterBuilder(builder, filters) {
  if (!filters) return;
  filters.forEach((filter) => {
    if (!filter.column || !filter.value) return;
    if (filter.operator) {
      switch (filter.operator.toLowerCase()) {
        case "between":
          builder.whereBetween(filter.column, filter.value);
          break;
        case "like":
          builder.whereILike(filter.column, `%${filter.value}%`);
          break;
        case "contains":
          builder.where(filter.column, "@>", filter.value);
          break;
        case ">":
        case "<":
        case ">=":
        case "<=":
          builder.where(filter.column, filter.operator, filter.value);
          break;
        default:
          builder.where(filter.column, filter.value);
      }
    } else {
      builder.where(filter.column, filter.value);
    }
  });
}

router.post("/table/count", isAuth, async (req, res) => {
  try {
    const data = await knex("view_requests")
      .count()
      .where((builder) => filterBuilder(builder, req.body.filters));
    return res.status(200).send(data[0]);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).send();
  }
});

router.post("/table", isAuth, async (req, res) => {
  const page = req.body.page ?? 1;
  const limit = req.body.limit ?? 50;
  const orderBy =
    req.body.orderBy && req.body.orderBy.toLowerCase() === "status" ? "status" : "created_at";
  const orderDirection =
    req.body.orderDirection && req.body.orderDirection.toLowerCase() === "ascending"
      ? "asc"
      : "desc";
  try {
    const data = await knex("view_requests")
      .select(
        "_id",
        "status",
        "cabinet",
        "technician_id",
        "performed_works",
        "client",
        "client_phone",
        "defects",
        "defect_description",
        "created_at",
        "done_at"
      )
      .where((builder) => filterBuilder(builder, req.body.filters))
      .orderBy(orderBy, orderDirection)
      .paginate({ perPage: limit, currentPage: page });
    return res.status(200).send(data.data);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
});

router.patch("/table", isAuth, async (req, res) => {
  const form = req.body;
  // validate input
  if (
    !(
      form.id &&
      validator.isUUID(form.id, 4) &&
      form.technician_id &&
      validator.isUUID(form.technician_id, 4) &&
      form.performed_works &&
      Array.isArray(form.performed_works)
    )
  ) {
    return res.status(400).end();
  }
  try {
    await knex("requests")
      .update({
        done_at: "NOW()",
        technician_id: form.technician_id,
        performed_works: form.performed_works
      })
      .where("_id", form.id);
    return res.status(200).send(form);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(500).end();
  }
});
