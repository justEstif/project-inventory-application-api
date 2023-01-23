import { object, string, TypeOf } from "zod";

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

export type GetItemInput = TypeOf<typeof getItemSchema>;
