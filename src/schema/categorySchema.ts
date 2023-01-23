import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category name is required",
    }),
    image: string({
      required_error: "Category image is required",
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
