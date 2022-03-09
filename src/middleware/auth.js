import log4js from "log4js";

const logger = log4js.getLogger("auth");

export default function isAuth(req, res, next) {
  if (req.session.isAuth) {
    logger.info(`[${req.ip}] Successful authentication`);
    next();
  } else {
    logger.warn(`[${req.ip}] Unsuccessful attempt to authenticate`);
    res.status(401).end();
  }
}
