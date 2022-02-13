import Router from "express-promise-router";
import log from "../logging.js";

const router = new Router();

export default router;

router.post("/", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      log(req.ip, "session", error, true);
    }
    log(req.ip, "administrator", "Successful logout");
    res.redirect("/support/dashboard/login");
  });
});
