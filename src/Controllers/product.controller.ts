import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client.js';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  });
  res.status(200).json({ data: products, ok: true });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).json({ data: product, ok: true });
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
    include: {
      category: true
    }
  });
  res.json({ data: product, ok: true });
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = await prisma.product.update({
    where: { id: productId },
    data: req.body,
  });
  res.json({ data: product, ok: true });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  await prisma.product.delete({ where: { id: productId } });
  res.json({ message: 'Product deleted successfully', ok: true });
};
