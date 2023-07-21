import { Request, Response } from 'express';
import { PrismaClient, Contact } from '../lib/prisma';

const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const books = await prisma.book.findMany({
      where: {
        userId: user?.id,
        available: true,
      },
      include: {
        _count: {
          select: {
            Contact: {
              where: {
                visible: true,
              },
            },
          },
        },
      },
    });
    res.json({ data: books, status: 'OK' });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener la lista de agendas',
      error,
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const book = await prisma.book.findFirst({
      where: {
        id,
        userId: user?.id,
      },
      include: {
        Contact: {
          where: {
            visible: true,
          },
          skip: offset,
          take: pageSize,
        },
      },
    });

    const totalContacts = await prisma.contact.count({
      where: {
        bookId: id,
        visible: true,
      },
    });

    res.json({
      book,
      pagination: {
        total: totalContacts,
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalContacts / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener la agenda',
      error,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { name, description, contacts } = req.body;
    const newBook = await prisma.book.create({
      data: {
        name,
        description,
        userId: user?.id ?? '',
      },
    });

    const successfulContacts = [];
    const failedContacts = [];
    if (contacts) {
      const promises = contacts.map(async (contact: Contact) => {
        return await prisma.contact
          .create({
            data: {
              ...contact,
              bookId: newBook.id,
              userId: user?.id ?? '',
            },
          })
          .then((result) => successfulContacts.push(result))
          .catch((error) => failedContacts.push({ contact, error }));
      });
      await Promise.all(promises);
    }

    res.json({
      status: 'OK',
      message: 'La agenda se creó correctamente',
      data: {
        ...newBook,
        contacts: successfulContacts.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo crear la agenda',
      error,
    });
  }
};

export const addContacts = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, description, contacts } = req.body;
    const book = await prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!book) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'No se encontró la agenda',
      });
    }

    if (contacts.length) {
      contacts.forEach(async (contact: Contact) => {
        await prisma.contact.create({
          data: {
            ...contact,
            bookId: book.id,
            userId: user?.id ?? '',
          },
        });
      });
    }

    await prisma.book.update({
      where: {
        id,
      },
      data: {
        name: name || book.name,
        description: description || book.description,
      },
    });
    return res.json({
      status: 'OK',
      message: 'Los contactos se agregaron correctamente y la agenda fue editada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo agregar los contactos',
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const book = await prisma.book.update({
      where: {
        id,
      },
      data: {
        available: false,
      },
    });
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo eliminar la agenda',
      error,
    });
  }
};

export const deleteContacts = async (req: Request, res: Response) => {
  try {
    const { contacts } = req.body;
    const successfulContacts = [];
    const failedContacts = [];

    if (contacts) {
      const promises = contacts.map(async (contact: Contact) => {
        return await prisma.contact
          .update({
            where: {
              id: contact.id,
            },
            data: {
              visible: false,
            },
          })
          .then((result) => successfulContacts.push(result))
          .catch((error) => failedContacts.push({ contact, error }));
      });
      await Promise.all(promises);
    }

    res.json({
      status: 'OK',
      message: 'Los contactos se eliminaron correctamente',
      data: {
        deleted: successfulContacts.length,
        failed: failedContacts.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo eliminar la agenda',
      error,
    });
  }
};
