import { Request, Response } from 'express';
import { whatsappManager } from '../lib/whatsapp/WhatsappManager';
import { PrismaClient } from '../lib/prisma';

const prisma = new PrismaClient();

export const getWhatsapps = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const whatsapps = await prisma.whatsapp.findMany({
      where: {
        userId: user!.id,
      },
    });
    res.json({ status: 'OK', data: whatsapps });
  } catch (error) {
    console.log('GET_WHATSAPPS', error);
    res.status(500).json({ status: 'ERROR', message: 'Error al obtener los whatsapps' });
  }
};

export const addWhatsapp = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { name } = req.body;

    const userWhatsapps = user!.Plan.whatsapp;
    const availableWhatsapps = await prisma.whatsapp.count({
      where: {
        userId: user!.id,
      },
    });

    if (availableWhatsapps >= userWhatsapps!)
      return res.status(403).json({
        status: 'ERROR',
        message: 'No tienes whatsapps disponibles. Cambia tu plan para agregar más Whatsapps',
      });

    const whatsappCreated = await prisma.whatsapp.create({
      data: { name, userId: user!.id },
    });
    const whatsapp = await whatsappManager.addWhatsapp(whatsappCreated.id);

    whatsapp.init();
    whatsapp.qrCode();

    res.json({ status: 'OK', message: 'Whatsapp creado', id: whatsappCreated.id });
  } catch (error) {
    console.log('ADD_WHATSAPP', error);
    res.status(500).json({ status: 'ERROR', message: 'Error al agregar el whatsapp' });
  }
};

export const delWhatsapp = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const whatsapp = whatsappManager.getWhatsapp(id);
    if (whatsapp) {
      whatsapp.remove();
      whatsappManager.delWhatsapp(id);
    }
    await prisma.whatsappOnCampaigns.deleteMany({
      where: {
        whatsappId: id,
      },
    });

    await prisma.whatsapp.delete({
      where: {
        id: id,
      },
    });

    res.json({ message: 'Whatsapp eliminado', status: 'OK' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error al eliminar whatsapp', status: 'ERROR' });
  }
};

export const qrCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const whatsapp = whatsappManager.getWhatsapp(id);

    if (!whatsapp) throw new Error('QR_CODE_ERROR_WHATSAPP_NOT_FOUND');

    whatsapp.qrCode();
    res.json({ message: 'Codigo QR obtenido', status: 'OK' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error al obtener el codigo QR', status: 'ERROR' });
  }
};

export const loginWhatsapp = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    console.log(id);
    const whatsapp = await prisma.whatsapp.findUnique({
      where: {
        id: id,
      },
    });
    if (!whatsapp) throw new Error('LOGIN_ERROR_WHATSAPP_NOT_FOUND');

    whatsappManager.register(whatsapp.id);

    res.json({ message: `${whatsapp.name} está iniciando sesión`, status: 'OK' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error al iniciar sesion', status: 'ERROR' });
  }
};
