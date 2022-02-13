import request from "./request.js";
import adminMain from "./admin-main.js";
import adminLogin from "./admin-login.js";
import adminLogout from "./admin-logout.js";
import adminRegister from "./admin-register.js";

export default function mount(app) {
  app.use("/support", request);
  app.use("/support/dashboard", adminMain);
  app.use("/support/dashboard/login", adminLogin);
  app.use("/support/dashboard/logout", adminLogout);
  app.use("/support/dashboard/register", adminRegister);
}
