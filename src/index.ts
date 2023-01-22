import express from "express";
import routes from "./routes";
import env from "./config/env";

const { PORT, NODE_ENV } = env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  if (NODE_ENV !== "production") {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  }
  routes(app);
});
