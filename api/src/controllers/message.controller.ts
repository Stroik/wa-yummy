import { Request, Response } from 'express';
import { PrismaClient } from '../lib/prisma/';
import { whatsappManager } from '../lib/whatsapp/WhatsappManager';

const prisma = new PrismaClient();

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10, campaignId, status } = req.query;
    const { user } = req;
    const totalMessages = await prisma.message.count({
      where: {
        userId: user?.id,
        campaignId: campaignId ? (campaignId as string) : undefined,
        status: status ? (status as string) : undefined,
      },
    });
    const totalPages = Math.ceil(totalMessages / Number(pageSize));

    const where = {
      userId: status === 'RECEIVED' ? undefined : user?.id,
      campaignId: campaignId ? (campaignId as string) : undefined,
      status: status ? (status as string) : undefined,
    };

    const messages = await prisma.message.findMany({
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const nextPage = Number(page) < totalPages ? Number(page) + 1 : null;
    const prevPage = Number(page) > 1 ? Number(page) - 1 : null;

    const paginationData = {
      totalMessages,
      totalPages,
      currentPage: Number(page),
      nextPage,
      prevPage,
      messages,
    };

    res.status(200).json(paginationData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'ERROR', message: 'Error al obtener los mensajes' });
  }
};

export const validate = async (req: Request, res: Response) => {
  try {
    const { contacts } = req.body;
    const availableWhatsapps = whatsappManager.getWhatsapps().filter((w) => w.status === 'READY');

    if (availableWhatsapps.length === 0) {
      return res.status(404).json({ status: 'ERROR', message: 'No hay whatsapp disponibles' });
    }

    const validContacts = [];

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const whatsappIndex = i % availableWhatsapps.length;

      const whatsapp = availableWhatsapps[whatsappIndex];
      const phone = contact.phone.startsWith('549') ? contact.phone : `549${contact.phone}`;

      const isValid = await whatsapp.validateNumber(phone);
      console.log(`El numero ${contact.phone} ${isValid ? 'es' : 'no es'} valido ${i}`);

      if (isValid) {
        validContacts.push(contact);
      }
    }

    console.log('Contactos válidos', validContacts.length);
    return res.status(200).json({ contacts: validContacts });
  } catch (error) {
    res.status(404).json({ status: 'ERROR', message: 'Error al obtener los mensajes' });
  }
};
