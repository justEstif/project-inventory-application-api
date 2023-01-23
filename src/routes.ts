import { Express, Request, Response } from "express";

const routes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => res.sendStatus(200));
  app.get("/checkhealth", (_: Request, res: Response) => res.sendStatus(200));
};

export default routes;
