import request from "./request.js";
import dashboardMain from "./dashboard-main.js";
import dashboardLogin from "./dashboard-login.js";
import dashboardLogout from "./dashboard-logout.js";
import dashboardRegister from "./dashboard-register.js";

export default function mount(app) {
  app.use("/support", request);
  app.use("/support/dashboard", dashboardMain);
  app.use("/support/dashboard/login", dashboardLogin);
  app.use("/support/dashboard/logout", dashboardLogout);
  app.use("/support/dashboard/register", dashboardRegister);
}
