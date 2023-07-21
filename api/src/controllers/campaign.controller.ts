import { Request, Response } from 'express';
import { PrismaClient } from '../lib/prisma';
import { whatsappManager } from '../lib/whatsapp/WhatsappManager';
import { sendBullyMode, sendSequentialMode } from '../utils/senders';

const prisma = new PrismaClient();

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const campaigns = await prisma.campaign.findMany({
      where: { userId: user?.id, visible: true },
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener la lista de campañas',
      error,
    });
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const campaign = await prisma.campaign.findFirst({
      where: { id, userId: user?.id },
      include: {
        _count: {
          select: {
            WhatsappOnCampaigns: true,
          },
        },
        Book: {
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
        },
      },
    });
    res.json(campaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo obtener la campaña',
      error,
    });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { name, description, bookId, mediaUrl, message, timeout, type, whatsappIds } = req.body;
    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        bookId,
        mediaUrl,
        message,
        type,
        userId: user?.id ?? '',
        timeout,
      },
    });

    if (whatsappIds) {
      whatsappIds.map(async (id: string) => {
        await prisma.whatsappOnCampaigns.create({
          data: {
            campaignId: campaign.id,
            whatsappId: id,
          },
        });
      });
    }

    res.json({
      status: 'OK',
      message: 'Campaña creada exitosamente',
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo crear la campaña',
      error,
    });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const campaign = await prisma.campaign.findFirst({
      where: { id, userId: user?.id },
    });
    if (campaign) {
      await prisma.campaign.update({
        where: { id },
        data: { visible: false },
      });
      res.json({
        status: 'OK',
        message: 'Campaña eliminada exitosamente',
      });
    } else {
      res.json({
        status: 'ERROR',
        message: 'No se encontró la campaña',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo eliminar la campaña',
      error,
    });
  }
};

export const sendCampaign = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { campaignId } = req.params;
    const campaign = await prisma.campaign.findFirst({
      where: { id: campaignId, userId: user?.id },
      include: {
        WhatsappOnCampaigns: true,
        Book: {
          include: {
            Contact: {
              where: {
                visible: true,
              },
            },
          },
        },
      },
    });

    if (!campaign)
      return res.json({
        status: 'ERROR',
        message: 'No se encontró la campaña',
      });

    try {
      await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          status: 'SENDING',
        },
      });

      const allWhatsapp = whatsappManager.getWhatsapps();
      const senders = allWhatsapp.filter((wa) => {
        return campaign.WhatsappOnCampaigns.map((w) => w.whatsappId).includes(wa.id);
      });

      const { timeout, message, mediaUrl } = campaign;

      const book = campaign.Book;

      if (!book)
        return res.json({
          status: 'ERROR',
          message: 'No se encontró la agenda',
        });

      if (campaign.type === 'sequential') {
        sendSequentialMode({
          senders,
          timeout,
          message,
          mediaUrl,
          book,
          userId: user?.id ?? '',
          campaignId: campaign.id,
        });
        return res.json({
          status: 'OK',
          message:
            'La campaña ha iniciado. Revisa el estado de la misma en la parte superior de la pantalla',
        });
      }

      if (campaign.type === 'bully') {
        sendBullyMode({
          senders,
          timeout,
          message,
          mediaUrl,
          book,
          userId: user?.id ?? '',
          campaignId: campaign.id,
        });
        return res.json({
          status: 'OK',
          message:
            'La campaña ha iniciado. Revisa el estado de la misma en la parte superior de la pantalla',
        });
      }
    } catch (error) {
      console.log(error);
      console.log('blue', error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'No se pudo enviar la campaña',
      error,
    });
  }
};
