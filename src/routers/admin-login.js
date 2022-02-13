import Router from "express-promise-router";
import bcrypt from "bcryptjs";
import query from "../db/query.js";
import log from "../logging.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  res.render("login", {});
});

router.post("/", async (req, res) => {
  const { login, password } = req.body;
  const { rows: administrator } = await query(req.ip, "SELECT * FROM administrators WHERE _login = $1", [login]);
  if (administrator.length === 0) {
    return res.redirect("/support/admin/register");
  }
  if (!(await bcrypt.compare(password, administrator[0]._pass))) {
    return res.redirect("/support/admin/login");
  }
  log(req.ip, "administrator", "Successful authorization");
  req.session.isAuth = true;
  return res.redirect("/support/admin");
});
