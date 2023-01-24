import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  DeleteItemInput,
  GetItemInput,
  PostItemInput,
  PutItemInput,
} from "../schema/itemSchema";

export const getResponse: RequestHandler = async (_req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getResponseId: RequestHandler<GetItemInput["params"]> = async (
  req,
  res,
  next
) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.itemId },
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const postResponse: RequestHandler<
  {},
  {},
  PostItemInput["body"]
> = async (req, res, next) => {
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
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const putResponseId: RequestHandler<
  PutItemInput["params"],
  {},
  PutItemInput["body"]
> = async (req, res, next) => {
  try {
    const item = await prisma.item.update({
      where: {
        id: req.params.itemId,
      },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.price && { price: req.body.price }),
        ...(req.body.inStock && { inStock: req.body.inStock }),
        ...(req.body.image && { image: req.body.image }),
        ...(req.body.categoryId && {
          category: { connect: { id: req.body.categoryId } },
        }),
        ...(req.body.brandId && {
          brand: { connect: { id: req.body.brandId } },
        }),
      },
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteResponseId: RequestHandler<
  DeleteItemInput["params"]
> = async (req, res, next) => {
  try {
    const item = await prisma.item.delete({
      where: { id: req.params.itemId },
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};
