import path from "path";
import Router from "express-promise-router";
import { log } from "../log.js";

const __dirname = path.resolve();

const options = {
  root: path.join(__dirname, "public")
};

const router = new Router();

export default router;

router.get("/support", (req, res) => {
  const fileName = "index.html";
  res.sendFile(fileName, options, (err) => {
    if (err) {
      log(req.ip, "HTTP static", err, true);
    } else {
      log(req.ip, "HTTP static", `Sent ${fileName}`);
    }
  });
});

router.get("/dashboard", (req, res) => {
  const fileName = "dashboard.html";
  res.sendFile(fileName, options, (err) => {
    if (err) {
      log(req.ip, "HTTP static", err, true);
    } else {
      log(req.ip, "HTTP static", `Sent ${fileName}`);
    }
  });
});
