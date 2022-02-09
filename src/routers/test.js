import Router from "express-promise-router";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  res.send("Succ");
});
