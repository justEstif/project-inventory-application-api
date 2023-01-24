import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  DeleteBrandInput,
  GetBrandInput,
  PostBrandInput,
  PutBrandInput,
} from "../schema/brandSchema";

export const getResponse: RequestHandler = async (_, res, next) => {
  try {
    const brands = await prisma.brand.findMany();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

export const getResponseId: RequestHandler<GetBrandInput["params"]> = async (
  req,
  res,
  next
) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.brandId },
      include: { items: true },
    });
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

export const postResponse: RequestHandler<
  {},
  {},
  PostBrandInput["body"]
> = async (req, res, next) => {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: req.body.name,
        image: req.body.image,
      },
    });
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
};

export const putResponseId: RequestHandler<
  PutBrandInput["params"],
  {},
  PutBrandInput["body"]
> = async (req, res, next) => {
  try {
    const brand = await prisma.brand.update({
      where: { id: req.params.brandId },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.image && { image: req.body.image }),
      },
    });
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};
export const deleteResponseId: RequestHandler<
  DeleteBrandInput["params"]
> = async (req, res, next) => {
  try {
    const brand = await prisma.brand.delete({
      where: {
        id: req.params.brandId,
      },
    });
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};
