import request from "./request.js";
import dashboard from "./main.dashboard.js";
import dashboardAuth from "./auth.dashboard.js";
import dashboardCtrl from "./ctrl.dashboard.js";
import pages from "./pages.js";

const path = "/support/api";

export default function mount(app) {
  app.use(pages);
  app.use(`${path}/request`, request);
  app.use(`${path}/dashboard`, dashboard);
  app.use(`${path}/dashboard/auth`, dashboardAuth);
  app.use(`${path}/dashboard/control`, dashboardCtrl);
}
