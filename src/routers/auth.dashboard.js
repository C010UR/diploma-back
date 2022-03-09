import Router from "express-promise-router";
import bcrypt from "bcryptjs";
import validator from "validator";
import log4js from "log4js";
import knex from "../db/knex.js";
import isAuth from "../middleware/auth.js";

const router = new Router();

export default router;

router.post("/register", async (req, res, next) => {
  const { login, password, secret_key: secretKey } = req.body;
  // validate input
  if (
    !(login && password && secretKey) ||
    secretKey !== process.env.SECRET_KEY ||
    !validator.isStrongPassword(password, { minSymbols: 0 })
  ) {
    return res.status(400).end();
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    await knex("administrators").insert({
      _login: login,
      _pass: hashedPassword
    });
    return res.status(201).send(login);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { login, password } = req.body;
  // validate input
  if (!(login && password)) {
    return res.status(401).end();
  }
  try {
    const administrator = await knex("administrators")
      .select("_pass", "_id")
      .where("_login", login);
    if (administrator.length === 0 || !(await bcrypt.compare(password, administrator[0]._pass))) {
      return res.status(401).end();
    }
    req.session.isAuth = true;
    req.session.administrator = administrator[0]._id;
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

const logger = log4js.getLogger("session");

router.post("/logout", isAuth, async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      logger.error(`[${req.ip}] ${error}`);
      return next(error);
    }
    return res.status(204).end();
  });
});

router.get("/check", async (req, res) => {
  res.status(200).send({ authorized: req.session.isAuth });
});
