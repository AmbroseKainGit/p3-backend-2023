import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client.js'

export const getAllOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        include: {
            table: true,
            waiter: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
    });
    res.status(200).json({ data: orders, ok: true });
};

export const createOrder = async (req: Request, res: Response) => {
    const { status, waiterId, tableId } = req.body;
    const order = await prisma.order.create({
        data: {
            status,
            waiter: { connect: { id: waiterId } },
            table: { connect: { id: tableId } },
        },
        include: {
            table: true,
            waiter: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    res.status(201).json({ data: order, ok: true });
};

export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await prisma.order.findUniqueOrThrow({
        where: { id: parseInt(id) },
        include: {
            waiter: {
                select: {
                    id: true,
                    name: true
                }
            },
            table: true,
        },
    });
    res.status(200).json({ data: order, ok: true });
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await prisma.order.update({
        where: { id: parseInt(id) },
        data:  req.body,
        include: {
            waiter: {
                select: {
                    id: true,
                    name: true
                }
            },
            table: true,
        },
    });
    res.status(200).json({ data: order, ok: true });
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.order.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Order deleted successfully", ok: true });
};
