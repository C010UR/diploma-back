// eslint-disable-next-line import/no-cycle
import request from "./request.js";
import dashboard from "./main.dashboard.js";
import dashboardAuth from "./auth.dashboard.js";

const path = "/support/api";

export default function mount(app) {
  app.use(`${path}/request`, request);
  app.use(`${path}/dashboard`, dashboard);
  app.use(`${path}/dashboard/auth`, dashboardAuth);
}
