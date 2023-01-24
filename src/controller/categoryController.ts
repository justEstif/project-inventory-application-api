import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  DeleteCategoryInput,
  GetCategoryInput,
  PostCategoryInput,
  PutCategoryInput,
} from "../schema/categorySchema";

export const getResponse: RequestHandler = async (_, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getResponseId: RequestHandler<GetCategoryInput["params"]> = async (
  req,
  res,
  next
) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.categoryId },
      include: { items: true },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const postResponse: RequestHandler<
  {},
  {},
  PostCategoryInput["body"]
> = async (req, res, next) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        image: req.body.image,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const putResponseId: RequestHandler<
  PutCategoryInput["params"],
  {},
  PutCategoryInput["body"]
> = async (req, res, next) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.categoryId },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.image && { image: req.body.image }),
      },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteResponseId: RequestHandler<
  DeleteCategoryInput["params"]
> = async (req, res, next) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: req.params.categoryId,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
