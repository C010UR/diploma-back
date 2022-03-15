/* eslint-disable no-undef */
import request from "supertest";
import app from "../src/app.js";
import before from "./fixtures/db.js";

const requestPath = "/support/api/v1/dashboard/control";
let cookie;

beforeAll(async () => {
  await before();
  const res = await request(app)
    .post("/support/api/v1/dashboard/auth/login")
    .send({
      login: "test",
      password: "test"
    })
    .expect(204);
  cookie = res.headers["set-cookie"];
});

function crud(table, count, isUrgency) {
  describe(`Должно успешно выполнить CRUD операции для ${table}`, () => {
    it("Чтение всех значений", async () => {
      const res = await request(app)
        .get(requestPath + table)
        .set("Cookie", cookie)
        .expect(200);
      expect(res.body.length).toBe(count);
    });
    it("Запись с достоверными данными", async () => {
      await request(app)
        .post(requestPath + table)
        .set("Cookie", cookie)
        .send({
          field: "test",
          interval: isUrgency ? "0 sec" : ""
        })
        .expect(204);
    });
    it("Забись с недостоверными данными", async () => {
      await request(app)
        .post(requestPath + table)
        .set("Cookie", cookie)
        .send({})
        .expect(400);
    });
    it("Изменение с достоверными данными", async () => {
      const res = await request(app)
        .get(requestPath + table)
        .set("Cookie", cookie)
        .expect(200);
      await request(app)
        .patch(requestPath + table)
        .set("Cookie", cookie)
        .send({
          id: res.body[0].value,
          field: "test",
          interval: isUrgency ? "0 sec" : ""
        })
        .expect(204);
    });
    it("Изменение с недостоверными данными", async () => {
      const res = await request(app)
        .get(requestPath + table)
        .set("Cookie", cookie)
        .expect(200);
      await request(app)
        .patch(requestPath + table)
        .set("Cookie", cookie)
        .send({
          id: res.body[0].value
        })
        .expect(400);
      await request(app)
        .patch(requestPath + table)
        .set("Cookie", cookie)
        .send({
          field: "test",
          interval: isUrgency ? "0 sec" : ""
        })
        .expect(400);
    });
    it("Удаление с достоверными данными", async () => {
      const res = await request(app)
        .get(requestPath + table)
        .set("Cookie", cookie)
        .expect(200);
      await request(app)
        .delete(requestPath + table)
        .set("Cookie", cookie)
        .send({
          id: res.body[0].value
        })
        .expect(204);
    });
    it("Удаление с недостоверными данными", async () => {
      await request(app)
        .delete(requestPath + table)
        .set("Cookie", cookie)
        .send({})
        .expect(400);
    });
  });
}

crud("/technicians", 2);
crud("/works", 5);
crud("/defects", 7);
crud("/cabinets", 33);
crud("/urgency", 5, true);

const admin = "/administrators";
describe(`Должно успешно выполнить CRUD операции для ${admin}`, () => {
  it("Чтение всех значений", async () => {
    const res = await request(app)
      .get(requestPath + admin)
      .set("Cookie", cookie)
      .expect(200);
    expect(res.body.length).toBe(1);
  });
  it("Запись", async () => {
    await request(app)
      .post(requestPath + admin)
      .set("Cookie", cookie)
      .send({
        login: "test123",
        password: "test123ASD"
      })
      .expect(404);
  });
  it("Изменение", async () => {
    const res = await request(app)
      .get(requestPath + admin)
      .set("Cookie", cookie)
      .expect(200);
    await request(app)
      .patch(requestPath + admin)
      .set("Cookie", cookie)
      .send({
        id: res.body[0].value,
        login: "test123",
        password: "test123ASD"
      })
      .expect(404);
  });
  it("Удаление с недостоверными данными", async () => {
    await request(app)
      .delete(requestPath + admin)
      .set("Cookie", cookie)
      .send({})
      .expect(400);
  });
  it("Удаление с достоверными данными", async () => {
    await request(app)
      .post("/support/api/v1/dashboard/auth/register")
      .send({
        login: "test1",
        password: "Color1234",
        secret_key: "1234"
      })
      .expect(201);
    const res2 = await request(app)
      .post("/support/api/v1/dashboard/auth/login")
      .send({
        login: "test1",
        password: "Color1234"
      })
      .expect(204);
    cookie = res2.headers["set-cookie"];
    const res = await request(app)
      .get(requestPath + admin)
      .set("Cookie", cookie)
      .expect(200);
    await request(app)
      .delete(requestPath + admin)
      .set("Cookie", cookie)
      .send({
        id: res.body[1].value
      })
      .expect(204);
  });
});
