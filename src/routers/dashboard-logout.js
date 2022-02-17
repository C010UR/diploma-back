import Router from "express-promise-router";
import log from "../logging.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      log(req.ip, "session", error, true);
    }
    log(req.ip, "dashboard", "Successful logout");
    res.redirect("/support/dashboard/login");
  });
});
