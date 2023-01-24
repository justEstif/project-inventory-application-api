import { object, string, TypeOf } from "zod";
import verifyImageUrl from "../utils/verifyImageUrl";

const payload = {
  body: object({
    name: string({
      required_error: "category name is required",
    }),
    image: string({
      required_error: "image is required",
    })
      .url({ message: "image Link must be valid url " })
      .refine(async (url) => await verifyImageUrl(url), {
        message: "image must link to a valid image url",
      }),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

export const getCategorySchema = object({
  ...params,
});

export const postCategorySchema = object({
  ...payload,
});

export const putCategorySchema = object({
  ...params,
  ...payload,
});

export const deleteCategorySchema = object({
  ...params,
});

export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
export type PostCategoryInput = TypeOf<typeof postCategorySchema>;
export type PutCategoryInput = TypeOf<typeof putCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
