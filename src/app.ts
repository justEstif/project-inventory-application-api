import express from "express";
import routes from "./routes";
import env from "./config/env";

const { PORT } = env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  routes(app);
});
