import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Role: true,
        Config: true,
        _count: {
          select: {
            Campaign: true,
            Book: true,
            Whatsapp: true,
          },
        },
      },
    });

    if (!user) {
      res.status(400).json({ message: 'El usuario no existe', status: 'ERROR' });
      return res.status(404).json({ message: 'El usuario no existe', status: 'ERROR' });
    }

    const validPassword = await compare(password, user.password as string);

    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta', status: 'ERROR' });
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role.name,
        picture: user.image,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPass, ...userData } = user;

    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: '/',
      })
    );
    return res.status(200).json({ user: userData, status: 'OK' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al iniciar sesión', status: 'ERROR' });
  }
};
