import { Router } from "express";
import * as categoryController from "./controller/categoryController";
import * as brandController from "./controller/brandController";
import * as itemController from "./controller/itemController";
import validate from "./middleware/validateResource";
import {
  deleteBrandSchema,
  getBrandSchema,
  postBrandSchema,
  putBrandSchema,
} from "./schema/brandSchema";
import {
  deleteCategorySchema,
  getCategorySchema,
  postCategorySchema,
  putCategorySchema,
} from "./schema/categorySchema";
import {
  deleteItemSchema,
  getItemSchema,
  postItemSchema,
  putItemSchema,
} from "./schema/itemSchema";

const router = Router();

router
  .route("/category")
  .get(categoryController.getResponse)
  .post(validate(postCategorySchema), categoryController.postResponse);

router
  .route("/category/:categoryId")
  .get(validate(getCategorySchema), categoryController.getResponseId)
  .put(validate(putCategorySchema), categoryController.putResponseId)
  .delete(validate(deleteCategorySchema), categoryController.deleteResponseId);

router
  .route("/brand")
  .get(brandController.getResponse)
  .post(validate(postBrandSchema), brandController.postResponse);

router
  .route("/brand/:brandId")
  .get(validate(getBrandSchema), brandController.getResponseId)
  .put(validate(putBrandSchema), brandController.putResponseId)
  .delete(validate(deleteBrandSchema), brandController.deleteResponseId);

router
  .route("/item")
  .get(itemController.getResponse)
  .post(validate(postItemSchema), itemController.postResponse);

router
  .route("/item/:itemId")
  .get(validate(getItemSchema), itemController.getResponseId)
  .put(validate(putItemSchema), itemController.putResponseId)
  .delete(validate(deleteItemSchema), itemController.deleteResponseId);

router.route("/health").get((_, res) => res.sendStatus(200));

export default router;
