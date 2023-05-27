import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client';
export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.status(200).json({ data: categories, ok: true });
};

export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ data: category, ok: true });
};