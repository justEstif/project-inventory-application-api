import express from "express";
import routes from "./routes";

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  routes(app);
});
