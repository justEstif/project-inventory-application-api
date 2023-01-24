import { object, string, TypeOf } from "zod";
import verifyImageUrl from "../utils/verifyImageUrl";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    image: string({
      required_error: "image is required",
    })
      .url({ message: "image link must be valid url" })
      .refine(async (url) => await verifyImageUrl(url), {
        message: "image must link to a valid image url",
      }),
  }),
};

const partialPayload = { body: payload.body.partial() };

const params = {
  params: object({
    brandId: string({
      required_error: "brandId is required",
    }),
  }),
};

export const getBrandSchema = object({
  ...params,
});

export const postBrandSchema = object({
  ...payload,
});

export const putBrandSchema = object({
  ...params,
  ...partialPayload,
});

export const deleteBrandSchema = object({
  ...params,
});

export type GetBrandInput = TypeOf<typeof getBrandSchema>;
export type PostBrandInput = TypeOf<typeof postBrandSchema>;
export type PutBrandInput = TypeOf<typeof putBrandSchema>;
export type DeleteBrandInput = TypeOf<typeof deleteBrandSchema>;
