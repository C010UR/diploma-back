import log from "../logging.js";

export default function isAuth(req, res, next) {
  if (req.session.isAuth) {
    log(req.ip, "administrator", "Successful authentication");
    next();
  } else {
    log(req.ip, "administrator", "Unsuccessful attempt to authenticate");
    res.redirect("/support/admin/login");
  }
}
