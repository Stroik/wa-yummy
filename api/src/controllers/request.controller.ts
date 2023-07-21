import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { createTransport, type TransportOptions } from 'nodemailer';
const prisma = new PrismaClient();

export const createRequest = (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, phone, business, message } = req.body;
    const transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    } as TransportOptions);

    const mailData = {
      from: `WAYummy<${process.env.MAIL_USER}>`,
      to: email,
      subject: 'WAYummy - Solicitud de demo',
      html: `
        <div style="background-color: #f5f5f5; padding: 20px; width: 100%; text-align: center;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="color: #000;">Hola ${firstname}</h1>
                <p style="color: #000;">Gracias por contactarnos, en breve nos pondremos en contacto contigo.</p>
                <p style="color: #000; padding: 0 10px;">Tu solicitud será evaluada por los administradores y se pondrán en contacto</p>
                <p style="color: #000;">Saludos!</p>
            </div>
        </div>
        `,
    };

    return transporter.sendMail(mailData, async (error, info) => {
      if (error) {
        return res.json({
          status: 'ERROR',
          message: 'No se pudo enviar el correo',
          error,
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const savedRequest = await prisma.demoRequest.create({
          data: {
            firstname,
            lastname,
            email,
            phone,
            business,
            message,
          },
        });

        return res.json({ status: 'OK', message: 'Correo enviado', info });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo crear la solicitud',
      error,
    });
  }
};

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.demoRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json({ status: 'OK', requests });
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener las solicitudes',
      error,
    });
  }
};

export const getRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await prisma.demoRequest.findUnique({
      where: {
        id,
      },
    });
    return res.json({ status: 'OK', request });
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener la solicitud',
      error,
    });
  }
};
