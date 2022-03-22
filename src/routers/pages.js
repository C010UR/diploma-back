import path from "path";
import Router from "express-promise-router";

const __dirname = path.resolve();

const options = {
  root: path.join(__dirname, "public")
};

const router = new Router();

export default router;

router.get("/support", (req, res, next) => {
  const fileName = "index.html";
  res.sendFile(fileName, options, (error) => {
    if (error) {
      next(error);
    }
  });
});

router.get("*", (req, res, next) => {
  const fileName = "dashboard.html";
  res.sendFile(fileName, options, (error) => {
    if (error) {
      next(error);
    }
  });
});
