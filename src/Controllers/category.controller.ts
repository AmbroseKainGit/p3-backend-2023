import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client.js';
export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        orderBy: [
            {
                id: 'asc',
            },
        ],
    });
    res.status(200).json({ data: categories, ok: true });
};

export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUniqueOrThrow({ where: { id: categoryId } });
    res.json({ data: category, ok: true });
};

export const createCategory = async (req: Request, res: Response) => {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json({ data: category, ok: true });
};

export const updateCategory = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.update({
        where: { id: categoryId },
        data: req.body
    });
    res.json({ data: category, ok: true });
};

export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    await prisma.category.delete({ where: { id: categoryId } });
    res.json({ message: 'Category deleted successfully', ok: true });
};