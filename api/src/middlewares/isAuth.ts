import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string | null;
      name: string | null;
      Role: {
        name: string | null;
      };
      Plan: {
        name: string | null;
        whatsapp: number | null;
      };
    };
    isAdmin?: boolean;
  }
}

const prisma = new PrismaClient();

export const isAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/rest/auth/login') return next();
  if (req.originalUrl === '/rest/files') return next();
  if (req.originalUrl === '/rest/request' && req.method === 'POST') return next();

  if (!req.headers.userid) return res.status(401).json({ message: 'Not authorized' });

  const { userid } = req.headers;
  const user = await prisma.user.findUnique({
    where: {
      id: userid as string,
    },
    select: {
      id: true,
      email: true,
      name: true,
      Role: {
        select: {
          name: true,
        },
      },
      Plan: {
        select: {
          name: true,
          whatsapp: true,
        },
      },
    },
  });

  if (!user) return res.status(401).json({ message: 'Not authorized' });

  const { Role } = user;

  if (Role.name === 'admin') {
    req.isAdmin = true;
  }

  req.user = user;

  next();
};
