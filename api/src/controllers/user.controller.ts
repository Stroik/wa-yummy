import type { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const { isAdmin } = req;
  if (!isAdmin)
    return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });

  try {
    const users = await prisma.user.findMany({
      include: {
        Role: true,
        Plan: true,
        _count: {
          select: {
            Campaign: true,
            Book: true,
            Whatsapp: true,
            Message: true,
          },
        },
      },
    });
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return res.json(usersWithoutPassword);
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { user, isAdmin } = req;
    const { id } = req.params;
    if (!isAdmin && user?.id !== id)
      return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });

    const userDb = await prisma.user.findUnique({
      where: {
        id: id || user?.id,
      },
      include: {
        Role: true,
        Config: true,
        Plan: true,
        _count: {
          select: {
            Campaign: {
              where: {
                visible: true,
              },
            },
            Book: {
              where: {
                available: true,
              },
            },
            Whatsapp: true,
            Message: true,
          },
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userDb!;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'No se pudo obtener el usuario' });
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, plan } = await req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return res.json({ message: 'El usuario ya existe', error: true });
    }

    console.log({ name, email, password, roleId, plan });

    const hashedPassword = await hash(password, 12);

    console.log({ hashedPassword });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId,
        planId: plan,
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'client',
        provider: 'whatsapp',
        providerAccountId: email,
      },
    });

    return res.json({
      error: false,
      message: 'Usuario creado correctamente',
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, roleId, image, password, plan } = req.body;
    if (password && password.length) {
      const hashedPassword = await hash(password, 12);
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          roleId,
          image,
          planId: plan,
          password: hashedPassword,
        },
      });
      res.json(user);
    } else {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          image,
          roleId,
          planId: plan,
        },
      });
      res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
export const getUserRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.log(error);
  }
};
