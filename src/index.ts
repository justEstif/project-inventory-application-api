import express from "express";
import env from "./config/env";
import router from "./routes";

const { PORT, NODE_ENV } = env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(PORT, () => {
  if (NODE_ENV !== "production") {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  }
});
