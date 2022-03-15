/* eslint-disable no-undef */
import request from "supertest";
import app from "../src/app.js";
import before from "./fixtures/db.js";

const requestPath = "/support/api/v1/dashboard/auth";

beforeAll(before);

describe("Should register or reject new administrator", () => {
  it("With correct login, password and secret", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "Color1234",
        secret_key: "1234"
      })
      .expect(201);
  });
  it("With correct login and secret and easy password", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "123",
        secret_key: "1234"
      })
      .expect(400);
  });
  it("With correct login, password and not correct secret", async () => {
    await request(app)
      .post(`${requestPath}/register`)
      .send({
        login: "test1",
        password: "Color1234",
        secret_key: "1"
      })
      .expect(400);
  });
  it("With correct password and secret and existing login", async () => {
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

describe("Should or should not log in", () => {
  it("With correct login and password", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test",
        password: "test"
      })
      .expect(204);
  });
  it("With correct login and not correct password", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test",
        password: "test0"
      })
      .expect(401);
  });
  it("With not correct login and correct password", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test0",
        password: "test"
      })
      .expect(401);
  });
  it("With not correct login and password", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test0",
        password: "test0"
      })
      .expect(401);
  });
  it("Without password", async () => {
    await request(app)
      .post(`${requestPath}/login`)
      .send({
        login: "test0"
      })
      .expect(401);
  });
});

test("Should log out", async () => {
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

describe("Should check if user is authorized", () => {
  it("is authorized", async () => {
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
  it("is not authorized", async () => {
    const res2 = await request(app).get(`${requestPath}/check`).expect(200);
    expect(res2.body.authorized).toBeFalsy();
  });
});
