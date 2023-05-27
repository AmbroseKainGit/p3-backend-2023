import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client';
export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.status(200).json({ data: categories, ok: true });
};
