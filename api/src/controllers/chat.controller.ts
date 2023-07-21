import { Request, Response } from 'express';
import { PrismaClient } from '../lib/prisma';
import { whatsappManager } from '../lib/whatsapp/WhatsappManager';

const prisma = new PrismaClient();

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    const contacts = await prisma.contact.findMany({
      where: {
        userId: user?.id,
        visible: true,
      },
      take: pageSize,
      skip: skip,
    });
    if (contacts.length === 0) {
      return res.status(200).json([]);
    }

    const uniqueContacts = contacts.reduce((acc: any[], current) => {
      const x = acc.find((item: any) => item.phone === current.phone);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const sortedContacts = uniqueContacts.sort((a, b) => {
      if (a.name === '' && b.name === '') {
        return 0;
      }
      if (a.name === '') {
        return 1;
      }
      if (b.name === '') {
        return -1;
      }
      return String(a.name).localeCompare(b.name);
    });

    res.status(200).json(sortedContacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los contactos' });
  }
};

export const getAllMessagesOfContact = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { phone } = req.body;
    const messages = await prisma.message.findMany({
      where: { userId: user?.id, OR: [{ from: phone }, { to: phone }] },
      orderBy: { createdAt: 'asc' },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};

export const getAllMessagesOfContactFromTo = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { from, to } = req.body;
    const messages = await prisma.message.findMany({
      where: {
        userId: user?.id,
        OR: [{ AND: [{ from: from }, { to: to }] }, { AND: [{ from: to }, { to: from }] }],
      },
      orderBy: { createdAt: 'asc' },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los mensajes', status: 'ERROR' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { to, message, whatsappId } = req.body;
    const whatsapp = whatsappManager.getWhatsapp(whatsappId);

    if (!whatsapp) {
      return res.status(500).json({
        message: 'Error al enviar el mensaje. El whatsapp no está disponible',
        error: 'ERROR',
      });
    }

    const response = await whatsapp.sendMessage(`${to}@c.us`, message);
    if (!response) {
      return res.status(500).json({ message: 'Error al enviar el mensaje', status: 'ERROR' });
    }
    const messageCreated = await prisma.message.create({
      data: {
        from: String(whatsapp?.info.wid._serialized).split('@')[0],
        to,
        text: message,
        userId: user?.id,
        status: 'SENT',
      },
    });
    res.status(200).json(messageCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al enviar el mensaje', status: 'ERROR' });
  }
};

export const sendMessageInteraction = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { from, to, message, whatsappId } = req.body;
    const whatsapp = whatsappManager.getWhatsapp(whatsappId);

    if (!whatsapp) {
      return res.status(500).json({
        message: 'Error al enviar el mensaje. El whatsapp no está disponible',
        status: 'ERROR',
      });
    }

    const response = await whatsapp.sendMessage(`${to}@c.us`, message);
    if (response) {
      const messageCreated = await prisma.message.create({
        data: {
          from,
          to,
          text: message,
          userId: user?.id,
          status: 'SENT',
        },
      });
      res.status(200).json(messageCreated);
    } else {
      res.status(500).json({ message: 'Error al enviar el mensaje', status: 'ERROR' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
};

export const addContact = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { phone, name, bookId } = req.body;
    const contact = await prisma.contact.create({
      data: {
        phone,
        name,
        bookId,
        userId: user?.id ?? '',
      },
    });
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al agregar el contacto', status: 'ERROR' });
  }
};
