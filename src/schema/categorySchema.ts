import { object, string, TypeOf } from "zod";
import verifyImageUrl from "../utils/verifyImageUrl";

const payload = {
  body: object({
    name: string({
      required_error: "Category name is required",
    }),
    image: string({
      required_error: "Image is required",
    })
      .url({ message: "Image Link must be valid url " })
      .refine(async (url) => await verifyImageUrl(url), {
        message: "Image must link to an image only",
      }),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "Category id is required",
    }),
  }),
};

export const getCategorySchema = object({
  ...params,
});

export const postCategorySchema = object({
  ...payload,
});

export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
export type PostCategoryInput = TypeOf<typeof postCategorySchema>;
