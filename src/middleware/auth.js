import log from "../logging.js";

export default function isAuth(req, res, next) {
  if (req.session.isAuth) {
    log(req.ip, "dashboard", "Successful authentication");
    next();
  } else {
    log(req.ip, "dashboard", "Unsuccessful attempt to authenticate");
    res.redirect("/support/dashboard/login");
  }
}
