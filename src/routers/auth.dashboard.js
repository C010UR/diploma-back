import Router from "express-promise-router";
import bcrypt from "bcryptjs";
import validator from "validator";
import knex from "../db/knex.js";
import { log } from "../log.js";
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
    await knex("administrators").insert({
      _login: login,
      _pass: hashedPassword
    });
    // await query(req.ip, "INSERT INTO administrators (_login, _pass) VALUES ($1, $2)", [
    //   login,
    //   hashedPassword
    // ]);
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
    const administratorPassword = await knex("administrators")
      .select("_pass")
      .where("_login", login);
    if (
      administratorPassword.length === 0 ||
      !(await bcrypt.compare(password, administratorPassword[0]._pass))
    ) {
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
