/* eslint-disable no-undef */
import request from "supertest";
import app from "../src/app.js";
import before from "./fixtures/db.js";

const requestPath = "/support/api/v1/request";

beforeAll(before);

test("Should get urgencies", async () => {
  const res = await await request(app).get(`${requestPath}/urgency`).expect(200);
  expect(res.body.length).toBe(5);
});

test("Should get cabinets", async () => {
  const res = await request(app).get(`${requestPath}/cabinets`).expect(200);
  expect(res.body.length).toBe(33);
});

test("Should get common defects", async () => {
  const res = await request(app).get(`${requestPath}/defects`).expect(200);
  expect(res.body.length).toBe(7);
});

describe("Should send or reject support requests", () => {
  test("With all values", async () => {
    await request(app)
      .post(`${requestPath}`)
      .send({
        client_name: "test",
        client_phone: "(11) 123-12-12",
        urgency: "00000000-0000-0000-0000-000000000000",
        cabinet: "00000000-0000-0000-0000-000000000000",
        defects: "test",
        defect_description: "test"
      })
      .expect(201);
  });

  it("Without unnecessary values", async () => {
    await request(app)
      .post(`${requestPath}`)
      .send({
        client_name: "test",
        urgency: "00000000-0000-0000-0000-000000000000",
        cabinet: "00000000-0000-0000-0000-000000000000",
        defects: "test"
      })
      .expect(201);
  });

  it("Without necessary values", async () => {
    await request(app)
      .post(`${requestPath}`)
      .send({
        client_name: "test",
        defects: "test"
      })
      .expect(400);
  });
});
