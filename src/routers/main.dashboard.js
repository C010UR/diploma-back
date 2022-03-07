import Router from "express-promise-router";
import multer from "multer";
import validator from "validator";
import ExcelJS from "exceljs";
import isAuth from "../middleware/auth.js";
import knex from "../db/knex.js";
import { log } from "../log.js";

const upload = multer();

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
          builder.whereILike(filter.column, `%${filter.value.toLowerCase()}%`);
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
  const orderBy = req.body.orderBy ? req.body.orderBy : "created_at";
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

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())} ${padStr(date.getHours())}:${padStr(date.getMinutes())}`;
}

function createTextRule(text, color) {
  return {
    type: "containsText",
    operator: "containsText",
    text,
    style: {
      fill: { type: "pattern", pattern: "solid", bgColor: { argb: color } },
      font: {
        italic: true,
        color: { argb: "ffffff" }
      }
    }
  };
}

router.get("/report", [upload.array(), isAuth], async (req, res) => {
  try {
    const params = JSON.parse(req.query.filters);
    const orderBy = params.orderBy ? params.orderBy : "created_at";
    const orderDirection =
      params.orderDirection && params.orderDirection.toLowerCase() === "ascending" ? "asc" : "desc";
    const data = await knex("view_requests")
      .select(
        "created_at",
        "done_at",
        "status",
        "technician",
        "performed_works",
        "cabinet",
        "client",
        "client_phone",
        "defects"
      )
      .where((builder) => filterBuilder(builder, params.filters))
      .orderBy(orderBy, orderDirection);
    if (data.length === 0) {
      return res.status(400).end();
    }
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "MTEC";
    workbook.lastModifiedBy = "MTEC";
    workbook.created = new Date();
    workbook.modified = new Date();
    const sheet = workbook.addWorksheet("Отчет", {
      properties: {
        tabColor: "6d81a2"
      },
      pageSetup: {
        paperSize: 9,
        orientation: "portrait"
      },
      headerFooter: {
        firstHeader: `Отчет по заявкам на ремонт. &IОтчет был сгенерирован ${dateToStr(new Date())}`
      }
    });
    sheet.columns = [
      {
        header: "Создано в",
        key: "created_at",
        width: 18
      },
      {
        header: "Выполнено в",
        key: "done_at",
        width: 18
      },
      { header: "Статус", key: "status", width: 15 },
      { header: "Мастер", key: "technician", width: 40 },
      { header: "Проделанные работы", key: "performed_works", width: 60 },
      { header: "Кабинет", key: "cabinet", width: 40 },
      { header: "Заказчик", key: "client", width: 40 },
      { header: "Телефон", key: "client_phone", width: 16 },
      { header: "Неисправности", key: "defects", width: 60 }
    ];
    sheet.addConditionalFormatting({
      ref: "C1:C9999",
      rules: [
        createTextRule("Выполнено", "67c23a"),
        createTextRule("Просрочено", "f56c6c"),
        createTextRule("Меньше часа", "e6a23c"),
        createTextRule("Меньше часа", "6d81a2"),
        createTextRule("Меньше недели", "909399"),
        createTextRule("Больше недели", "909399")
      ]
    });
    data.forEach((row) => {
      let status = "";
      switch (row.status) {
        case "6:completed":
          status = "Выполнено";
          break;
        case "1:expired":
          status = "Просрочено";
          break;
        case "2:hour":
          status = "Меньше часа";
          break;
        case "3:day":
          status = "Меньше дня";
          break;
        case "4:week":
          status = "Меньше недели";
          break;
        case "5:none":
          status = "Больше недели";
          break;
        default:
          status = "Неизвестно";
      }
      sheet.addRow({
        created_at: new Date(row.created_at),
        done_at: row.done_at ? new Date(row.done_at) : "",
        status,
        technician: row.technician ?? "",
        performed_works: row.performed_works ? row.performed_works.join("; ") : "",
        cabinet: row.cabinet,
        client: row.client,
        client_phone: row.client_phone ?? "",
        defects: row.defects
      });
    });
    sheet.getRow(1).font = { name: "Consolas", size: 14, bold: true };
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
    await workbook.xlsx.write(res);
    return res.status(200).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
});
