import { number, object, string, TypeOf } from "zod";
import verifyImageUrl from "../utils/verifyImageUrl";

const payload = {
  body: object({
    name            : string({ required_error: "name is required" }),
    description     : string({ required_error: "description is required" }),
    price           : number({ required_error: "price is required" }),
    inStock         : number({ required_error: "inStock is required" }),
    image           : string({
      required_error: "image is required",
    })
      .url({ message: "Image Link must be valid url " })
      .refine(async (url) => await verifyImageUrl(url), {
        message     : "Image must link to an image only",
      }),
    categoryId      : string({ required_error: "categoryId is required" }),
    brandId: string({ required_error: "brandId is required" }),
  }),
};

const params = {
  params: object({
    itemId: string({
      required_error: "itemId is required",
    }),
  }),
};

export const getItemSchema = object({
  ...params,
});

export const postItemSchema = object({
  ...params,
  ...payload,
});

export type GetItemInput = TypeOf<typeof getItemSchema>;
export type PostItemInput = TypeOf<typeof postItemSchema>;
