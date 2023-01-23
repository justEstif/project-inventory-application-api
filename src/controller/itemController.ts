import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { GetItemInput } from "../schema/itemSchema";

export const getResponseId: RequestHandler<GetItemInput["params"]> = async (
  req,
  res
) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.itemId },
    });
    res.status(200).json({
      message: "Item",
      response: item,
    });
  } catch (error) {
    res.status(400).json({ message: "Error getting item", error: error });
  }
};
