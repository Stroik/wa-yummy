import { Contact } from '@prisma/client';
import Whatsapp from '../lib/whatsapp/Whatsapp';
import { timer } from './timer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SenderVoid {
  senders: Whatsapp[];
  timeout: number;
  message: string;
  mediaUrl?: string | null;
  book: any;
  userId: string;
  campaignId: string;
}

export const parseMessages = (contacts: any[], message: string) => {
  try {
    const data = [];

    for (const contact of contacts) {
      const { id, phone, info } = contact;
      if (!id || !phone) {
        console.error(`Contacto inválido: ${JSON.stringify(contact)}`);
        continue;
      }

      let interpolatedMessage = message;
      const varRegex = /\${(.*?)}/g;
      let match;
      while ((match = varRegex.exec(message))) {
        const [fullMatch, varName] = match;
        let varValue = contact[varName];
        if (varValue === undefined && info) {
          try {
            const infoObj = JSON.parse(info);
            varValue = infoObj[varName];
          } catch (e) {
            console.error(`Error al analizar el objeto JSON en "info" de contacto ${id}: ${e}`);
          }
        }
        if (varValue !== undefined) {
          interpolatedMessage = interpolatedMessage.replace(fullMatch, varValue);
        }
      }
      data.push({ phone, message: interpolatedMessage });
    }

    return data;
  } catch (error) {
    return [];
  }
};

export const sendSequentialMode = async ({
  senders,
  timeout,
  message,
  mediaUrl,
  book,
  userId,
  campaignId,
}: SenderVoid) => {
  try {
    const contacts = book.Contact as Contact[];
    const parsedData = parseMessages(contacts, message);
    const totalSenders = senders.length;

    if (totalSenders === 0) {
      console.log(
        'red',
        'No hay whatsapp disponibles. Recuerda iniciar sesión con los Whatsapp que deseas utilizar'
      );
      return {
        status: 'ERROR',
        message:
          'No hay whatsapp disponibles. Recuerda iniciar sesión con los Whatsapp que deseas utilizar',
      };
    }

    let senderIndex = 0;
    let i = 0;
    let continueSending = true;

    while (continueSending) {
      for (let j = 0; j < totalSenders; j++) {
        const currentSender = j;

        if (i >= parsedData.length) {
          break;
        }
        if (senders[currentSender].status !== 'READY') {
          continue;
        }

        const msg = parsedData[i];

        await senders[currentSender].sendMsg({
          phone: msg.phone,
          message: msg.message,
          media: mediaUrl,
          userId,
          campaignId,
        });

        i++;
      }

      if (i >= parsedData.length) {
        continueSending = false;
        await changeCampaignStatus(campaignId, 'SENT');
        break;
      }

      await timer((timeout as number) * 1000);
      senderIndex = senderIndex + 1;
    }
    console.log('blue', 'La campaña ha finalizado exitosamente');
    return {
      status: 'OK',
      message: 'La campaña ha finalizado exitosamente',
    };
  } catch (error) {
    console.log('blue', error);
    return {
      status: 'ERROR',
      message: 'No se pudo enviar la campaña',
      error,
    };
  }
};

export const sendBullyMode = async ({
  senders,
  timeout,
  message,
  mediaUrl,
  book,
  userId,
  campaignId,
}: SenderVoid) => {
  try {
    const contacts = book.Contact;
    const parsedData = parseMessages(contacts, message);
    const totalSenders = senders.length;

    if (totalSenders === 0) {
      console.log(
        'red',
        'No hay whatsapp disponibles. Recuerda iniciar sesión con los Whatsapp que deseas utilizar'
      );
      return {
        status: 'ERROR',
        message:
          'No hay whatsapp disponibles. Recuerda iniciar sesión con los Whatsapp que deseas utilizar',
      };
    }

    let senderIndex = 0;
    let i = 0;
    let continueSending = true;

    while (continueSending) {
      for (let j = 0; j < totalSenders; j++) {
        const currentSender = (senderIndex + j) % totalSenders;

        if (i >= parsedData.length) {
          break;
        }
        if (senders[currentSender].status !== 'READY') {
          continue;
        }

        const msg = parsedData[i];

        senders[currentSender].sendMsg({
          phone: msg.phone,
          message: msg.message,
          media: mediaUrl,
          userId,
          campaignId,
        });

        i++;
      }

      if (i >= parsedData.length) {
        continueSending = false;
        await changeCampaignStatus(campaignId, 'SENT');
        break;
      }

      await timer((timeout as number) * 1000);
      senderIndex = (senderIndex + totalSenders) % totalSenders;
    }
    console.log('blue', 'La campaña ha finalizado exitosamente');
    return {
      status: 'OK',
      message: 'La campaña ha finalizado exitosamente',
    };
  } catch (error) {
    console.log('blue', error);
    return {
      status: 'ERROR',
      message: 'No se pudo enviar la campaña',
      error,
    };
  }
};

const changeCampaignStatus = async (campaignId: string, status: string) => {
  const updateCampaign = await prisma.campaign.update({
    where: {
      id: campaignId,
    },
    data: {
      status,
    },
  });

  return updateCampaign;
};
