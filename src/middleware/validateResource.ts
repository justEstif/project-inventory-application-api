import { Request, Response, NextFunction } from "express";
import { ZodError, AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.issues.map((issue) => issue.message);
          res.status(422).json({
            message: messages,
            error: error,
          });
        } else {
          res.status(400).send({
            messsage: "Error",
            error: error,
          });
        }
      }
    };

export default validate;
