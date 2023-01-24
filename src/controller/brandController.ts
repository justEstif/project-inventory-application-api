import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  DeleteBrandInput,
  GetBrandInput,
  PostBrandInput,
  PutBrandInput,
} from "../schema/brandSchema";

export const getResponse: RequestHandler = async (_, res) => {
  try {
    const brands = await prisma.brand.findMany();
    res.status(200).json({ message: "Brand", response: brands });
  } catch (error) {
    res.status(400).json({ message: "Error getting brands", error: error });
  }
};

export const getResponseId: RequestHandler<GetBrandInput["params"]> = async (
  req,
  res
) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.brandId },
      include: { items: true },
    });
    res.status(200).json({ message: "Brand with items", response: brand });
  } catch (error) {
    res.status(400).json({ message: "Error getting brand", error: error });
  }
};

export const postResponse: RequestHandler<
  {},
  {},
  PostBrandInput["body"]
> = async (req, res) => {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: req.body.name,
        image: req.body.image,
      },
    });
    res.status(201).json({ message: "Created brand", response: brand });
  } catch (error) {
    res.status(400).json({ message: "Error creating brand", error: error });
  }
};

export const putResponseId: RequestHandler<
  PutBrandInput["params"],
  {},
  PutBrandInput["body"]
> = async (req, res) => {
  try {
    const brand = await prisma.brand.update({
      where: { id: req.params.brandId },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.image && { image: req.body.image }),
      },
    });
    res.status(200).json({ message: "Updated brand", response: brand });
  } catch (error) {
    res.status(400).json({ message: "Error updating brand", error: error });
  }
};
export const deleteResponseId: RequestHandler<
  DeleteBrandInput["params"]
> = async (req, res) => {
  try {
    const brand = await prisma.brand.delete({
      where: {
        id: req.params.brandId,
      },
    });
    res.status(200).json({
      message: "Deleted brand",
      response: brand,
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting brand", error: error });
  }
};
