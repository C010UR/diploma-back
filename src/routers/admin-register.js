import Router from "express-promise-router";
import bcrypt from "bcryptjs";
import query from "../db/query.js";
import log from "../logging.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  res.render("register", {});
});

router.post("/", async (req, res) => {
  const { login, password, secret_key: secretKey } = req.body;
  if (secretKey === process.env.SECRET_KEY) {
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
      await query(req.ip, "INSERT INTO administrators (_login, _pass) VALUES ($1, $2)", [login, hashedPassword]);
    } catch (error) {
      log(req.ip, "sql", error, true);
      return res.status(400).end();
    }
    log(req.ip, "administrator", `Successful registration of ${login}`, true);
    return res.redirect("/support/dashboard/login");
  }
  return res.redirect("/support/dashboard/register");
});
