import { Router } from "express";
import * as categoryController from "./controller/categoryController";
import * as itemController from "./controller/itemController";
import validate from "./middleware/validateResource";
import {
  deleteCategorySchema,
  getCategorySchema,
  postCategorySchema,
} from "./schema/categorySchema";
import { getItemSchema } from "./schema/itemSchema";

const router = Router();

router
  .route("/category")
  .get(categoryController.getResponse)
  .post(validate(postCategorySchema), categoryController.postResponse);

router
  .route("/category/:categoryId")
  .get(validate(getCategorySchema), categoryController.getResponseId)
  .delete(validate(deleteCategorySchema), categoryController.deleteResponseId);

router.route("/item").get(itemController.getResponse);

router
  .route("/item/:itemId")
  .get(validate(getItemSchema), itemController.getResponseId);

router.route("/health").get((_, res) => res.sendStatus(200));

export default router;
