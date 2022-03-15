/* eslint-disable no-undef */
import request from "supertest";
import app from "../src/app.js";
import before from "./fixtures/db.js";

const requestPath = "/support/api/v1/dashboard";
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

test("Должен получить счетчик заявок", async () => {
  const res = await request(app)
    .post(`${requestPath}/table/count`)
    .set("Cookie", cookie)
    .expect(200);
  expect(res.body.count).toBe(1);
});

test("Должен получить заявки", async () => {
  const res = await request(app).post(`${requestPath}/table`).set("Cookie", cookie).expect(200);
  expect(res.body.length).toBe(1);
});
