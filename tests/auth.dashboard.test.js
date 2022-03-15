/* eslint-disable no-undef */
import request from "supertest";
import app from "../src/app.js";
import before from "./fixtures/db.js";

const requestPath = "/support/api/v1/dashboard/auth";

beforeAll(before);

describe("Должен зарегистрировать либо отказать в регистрации администратора", () => {
  it("С достоверными логином, паролем и секретным ключом", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "Color1234",
        secret_key: "1234"
      })
      .expect(201);
  });
  it("С достоверными логином и секретным ключом, слишком простым паролем", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "123",
        secret_key: "1234"
      })
      .expect(400);
  });
  it("С достоверными логином, паролем и недостоверным секретным ключом", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "Color1234",
        secret_key: "1"
      })
      .expect(400);
  });
  it("С достоверными паролем и секретным ключом, уже существующем логином", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test",
        password: "Color1234",
        secret_key: "1234"
      })
      .expect(500);
  });
});

describe("Должен авторизоваться или отказать в авторизации администратора", () => {
  it("С достоверными логином и паролем", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test",
        password: "test"
      })
      .expect(204);
  });
  it("С достоверным логином и недостоверным паролем", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test",
        password: "test0"
      })
      .expect(401);
  });
  it("С недостоверным логином и достоверным паролем", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test0",
        password: "test"
      })
      .expect(401);
  });
  it("С недостоверным логином и паролем", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test0",
        password: "test0"
      })
      .expect(401);
  });
  it("С достоверным логином и без пароля", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test"
      })
      .expect(401);
  });
});

test("Должен удалить сессию", async () => {
  const res = await request(app)
    .post(`${requestPath}/login`)
    .send({
      login: "test",
      password: "test"
    })
    .expect(204);
  const cookie = res.headers["set-cookie"];
  await request(app).post(`${requestPath}/logout`).set("Cookie", cookie).expect(204);
});

describe("Должен проверить, авторизован ли пользователь", () => {
  it("авторизован", async () => {
    const res = await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test",
        password: "test"
      })
      .expect(204);
    const cookie = res.headers["set-cookie"];
    const res2 = await request(app).get(`${requestPath}/check`).set("Cookie", cookie).expect(200);
    expect(res2.body.authorized).toBeTruthy();
  });
  it("не авторизован", async () => {
    const res2 = await request(app).get(`${requestPath}/check`).expect(200);
    expect(res2.body.authorized).toBeFalsy();
  });
});
