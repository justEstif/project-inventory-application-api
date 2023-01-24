import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  DeleteCategoryInput,
  GetCategoryInput,
  PostCategoryInput,
  PutCategoryInput,
} from "../schema/categorySchema";

export const getResponse: RequestHandler = async (_, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ message: "Categories ", response: categories });
  } catch (error) {
    res.status(400).json({ message: "Error getting categories", error: error });
  }
};

export const getResponseId: RequestHandler<GetCategoryInput["params"]> = async (
  req,
  res
) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.categoryId },
      include: { items: true },
    });
    res
      .status(200)
      .json({ message: "Category with items", response: category });
  } catch (error) {
    res.status(400).json({ message: "Error getting categories", error: error });
  }
};

export const postResponse: RequestHandler<
  {},
  {},
  PostCategoryInput["body"]
> = async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        image: req.body.image,
      },
    });
    res.status(201).json({ message: "Created category ", response: category });
  } catch (error) {
    res.status(400).json({ message: "Error creating category", error: error });
  }
};

export const putResponseId: RequestHandler<
  PutCategoryInput["params"],
  {},
  PutCategoryInput["body"]
> = async (req, res) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.categoryId },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.image && { image: req.body.image }),
      },
    });
    res.status(200).json({ message: "Updated category", response: category });
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error: error });
  }
};
export const deleteResponseId: RequestHandler<
  DeleteCategoryInput["params"]
> = async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: req.params.categoryId,
      },
    });
    res.status(200).json({
      message: "Deleted category",
      response: category,
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting category", error: error });
  }
};
