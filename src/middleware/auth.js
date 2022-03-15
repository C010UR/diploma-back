import log4js from "log4js";

const logger = log4js.getLogger("auth");

export default function isAuth(req, res, next) {
  if (req.session.isAuth) {
    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${req.ip}] Successful authentication`);
    }
    next();
  } else {
    if (process.env.NODE_ENV !== "test") {
      logger.warn(`[${req.ip}] Unsuccessful attempt to authenticate`);
    }
    res.status(401).end();
  }
}
