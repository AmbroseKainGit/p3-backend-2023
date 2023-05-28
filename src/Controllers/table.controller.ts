import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client.js';

export const getAllTables = async (req: Request, res: Response) => {
    const tables = await prisma.table.findMany();
    res.status(200).json({ data: tables, ok: true });
};

export const createTable = async (req: Request, res: Response) => {
    const table = await prisma.table.create({
        data: req.body
    });
    res.status(201).json({ data: table, ok: true });
};

export const getTableById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const table = await prisma.table.findUniqueOrThrow({
        where: { id: parseInt(id) },
    });
    res.status(200).json({ data: table, ok: true });
};

export const updateTable = async (req: Request, res: Response) => {
    const { id } = req.params;
    const table = await prisma.table.update({
        where: { id: parseInt(id) },
        data: req.body,
    });
    res.status(200).json({ data: table, ok: true });
};

export const deleteTable = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.table.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Table deleted successfully", ok: true });
};
