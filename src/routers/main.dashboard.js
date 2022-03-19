import Router from "express-promise-router";
import multer from "multer";
import validator from "validator";
import ExcelJS from "exceljs";
import isAuth from "../middleware/auth.js";
import knex from "../db/knex.js";

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

router.post("/table/count", isAuth, async (req, res, next) => {
  try {
    const data = await knex("view_requests")
      .count()
      .where((builder) => filterBuilder(builder, req.body.filters));
    return res.status(200).send({ count: parseInt(data[0].count, 10) });
  } catch (error) {
    return next();
  }
});

router.post("/table", isAuth, async (req, res, next) => {
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
    return next();
  }
});

router.patch("/table", isAuth, async (req, res, next) => {
  const form = req.body;
  // validate input
  if (
    !(
      form.id &&
      validator.isUUID(form.id) &&
      form.technician_id &&
      validator.isUUID(form.technician_id) &&
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
    return res.status(204).send();
  } catch (error) {
    return next();
  }
});

function padStr(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

function dateToStr(date) {
  // prettier-ignore
  return `${padStr(date.getFullYear())}-${padStr(date.getMonth())}-${padStr(date.getDate())}`;
}

function timeToStr(date) {
  // prettier-ignore
  return `${padStr(date.getHours())}:${padStr(date.getMinutes())}`;
}

function dateTimeToStr(date) {
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
      font: { color: { argb: "ffffff" } }
    }
  };
}

function convertHeaderFooter(str) {
  const words = str.split(":");
  return words
    .map((el) => {
      switch (el.toLowerCase()) {
        case "date":
          return dateToStr(new Date());
        case "time":
          return timeToStr(new Date());
        case "datetime":
          return dateTimeToStr(new Date());
        case "colon":
          return ":";
        default:
          return el;
      }
    })
    .join("");
}

router.get("/report", [upload.array(), isAuth], async (req, res, next) => {
  try {
    let params = {};
    let columns = {};
    try {
      params = JSON.parse(req.query.filters);
    } catch (error) {
      params = {};
    }
    try {
      columns = JSON.parse(req.query.columns);
      if (!Object.keys(columns).some((key) => columns[key])) {
        throw new Error("No columns provided");
      }
    } catch (error) {
      res.status(400).end();
    }
    const orderBy = params.orderBy ? params.orderBy : "created_at";
    const orderDirection =
      params.orderDirection && params.orderDirection.toLowerCase() === "ascending" ? "asc" : "desc";

    const defaultFont = {
      name: "Times New Roman",
      family: 1,
      size: 12
    };
    const sheetColumns = [];
    const selectColumns = [];
    Object.keys(columns).forEach((key) => {
      if (columns[key]) {
        selectColumns.push(key);
        switch (key) {
          case "created_at":
            sheetColumns.push({
              header: "Создано в",
              key: "created_at",
              width: 18,
              style: { font: defaultFont, numFmt: "dd.mm.yyyy hh:MM" }
            });
            break;
          case "done_at":
            sheetColumns.push({
              header: "Выполнено в",
              key: "done_at",
              width: 18,
              style: { font: defaultFont, numFmt: "dd.mm.yyyy hh:MM" }
            });
            break;
          case "status":
            sheetColumns.push({
              header: "Статус",
              key: "status",
              width: 15,
              style: { font: defaultFont }
            });
            break;
          case "technician":
            sheetColumns.push({
              header: "Исполнитель",
              key: "technician",
              width: 40,
              style: { font: defaultFont }
            });
            break;
          case "performed_works":
            sheetColumns.push({
              header: "Проделанные работы",
              key: "performed_works",
              width: 60,
              style: { font: defaultFont }
            });
            break;
          case "cabinet":
            sheetColumns.push({
              header: "Кабинет",
              key: "cabinet",
              width: 40,
              style: { font: defaultFont }
            });
            break;
          case "client":
            sheetColumns.push({
              header: "Заказчик",
              key: "client",
              width: 40,
              style: { font: defaultFont }
            });
            break;
          case "client_phone":
            sheetColumns.push({
              header: "Телефон",
              key: "client_phone",
              width: 16,
              style: { font: defaultFont }
            });
            break;
          case "defects":
            sheetColumns.push({
              header: "Неисправности",
              key: "defects",
              width: 60,
              style: { font: defaultFont }
            });
            break;
          default:
        }
      }
    });

    const data = await knex("view_requests")
      .columns(selectColumns)
      .select()
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
      }
    });
    sheet.columns = sheetColumns;
    data.forEach((row) => {
      let status = "";
      if (columns.status) {
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
      }
      sheet.addRow({
        created_at: row.created_at ? new Date(row.created_at) : "",
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
    if (columns.status) {
      const statusColumn = sheet.getColumn("status").letter;
      sheet.addConditionalFormatting({
        ref: `${statusColumn}1:${statusColumn}${sheet.rowCount + 1}`,
        rules: [
          createTextRule("Выполнено", "67c23a"),
          createTextRule("Просрочено", "f56c6c"),
          createTextRule("Меньше часа", "e6a23c"),
          createTextRule("Меньше дня", "6d81a2"),
          createTextRule("Меньше недели", "909399"),
          createTextRule("Больше недели", "909399")
        ]
      });
    }
    sheet.spliceRows(1, 0, "Отчет");
    sheet.getRow(1).values = [convertHeaderFooter(process.env.EXCEL_HEADER)];
    sheet.mergeCells("A1:I1");
    sheet.getRow(2).font = { bold: true };
    sheet.getRow(sheet.rowCount + 1).values = [convertHeaderFooter(process.env.EXCEL_FOOTER)];
    sheet.mergeCells(`A${sheet.rowCount}:I${sheet.rowCount}`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
    await workbook.xlsx.write(res);
    return res.status(200).end();
  } catch (error) {
    return next();
  }
});
