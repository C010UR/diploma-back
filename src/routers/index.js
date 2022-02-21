// eslint-disable-next-line import/no-cycle
import request from "./request.js";
import dashboard from "./dashboard-main.js";
import dashboardAuth from "./dashboard-auth.js";

const path = "/support/api";

export default function mount(app) {
  app.use(`${path}/request`, request);
  app.use(`${path}/dashboard`, dashboard);
  app.use(`${path}/dashboard/auth`, dashboardAuth);
}
