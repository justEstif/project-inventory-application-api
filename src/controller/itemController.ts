import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { GetItemInput, PostItemInput } from "../schema/itemSchema";

export const getResponse: RequestHandler = async (_req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json({
      message: "Item",
      response: items,
    });
  } catch (error) {
    res.status(400).json({ message: "Error getting items", error: error });
  }
};

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

export const postResponse: RequestHandler<
  {},
  {},
  PostItemInput["body"]
> = async (req, res) => {
  try {
    const item = await prisma.item.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
        image: req.body.image,
        category: { connect: { id: req.body.categoryId } },
        brand: { connect: { id: req.body.brandId } },
      },
    });
    res.status(201).json({
      message: "Created Item",
      response: item,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating item", error: error });
  }
};
