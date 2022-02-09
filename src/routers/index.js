import test from "./test.js";

export default function mount(app) {
  app.use("/test", test);
}
