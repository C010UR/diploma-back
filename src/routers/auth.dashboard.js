import Router from "express-promise-router";
import bcrypt from "bcryptjs";
import validator from "validator";
import query from "../db/query.js";
import log from "../logging.js";
import isAuth from "../middleware/auth.js";

const router = new Router();

export default router;

router.post("/register", async (req, res) => {
  const { login, password, secret_key: secretKey } = req.body;
  // validate input
  if (
    !(login && password && secretKey) ||
    secretKey !== process.env.SECRET_KEY ||
    !validator.isStrongPassword(password)
  ) {
    return res.status(400).end();
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    await query(req.ip, "INSERT INTO administrators (_login, _pass) VALUES ($1, $2)", [
      login,
      hashedPassword
    ]);
    log(req.ip, "dashboard", `Successful registration of ${login}`, true);
    return res.status(201).send(login);
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  // validate input
  if (!(login && password)) {
    return res.status(404).end();
  }
  try {
    const { rows: administrator } = await query(
      req.ip,
      "SELECT * FROM administrators WHERE _login = $1",
      [login]
    );
    if (administrator.length === 0 || !(await bcrypt.compare(password, administrator[0]._pass))) {
      return res.status(404).end();
    }
    log(req.ip, "dashboard", "Successful authorization");
    req.session.isAuth = true;
    return res.status(204).end();
  } catch (error) {
    log(req.ip, "sql", error, true);
    return res.status(400).end();
  }
});

router.post("/logout", isAuth, async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      log(req.ip, "session", error, true);
      return res.status(500).end();
    }
    log(req.ip, "dashboard", "Successful logout");
    return res.status(204).end();
  });
});
