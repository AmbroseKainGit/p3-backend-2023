import { Request, Response } from 'express';
import prisma from '../Utils/prisma-client.js';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ data: users, ok: true });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).json({ data: user, ok: true });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: parseInt(id) },
  });
  res.status(200).json({ data: user, ok: true });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: req.body,
  });
  res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json({ message: "User deleted successfully" });
};
