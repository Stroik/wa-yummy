import Whatsapp from './Whatsapp';
import { PrismaClient } from '../prisma';

const prisma = new PrismaClient();

export default class WhatsappManager {
  public whatsapps: Whatsapp[];
  constructor() {
    this.whatsapps = [];
  }

  public async addWhatsapp(id: string) {
    const whatsapp = new Whatsapp(id);
    this.whatsapps.push(whatsapp);
    return whatsapp;
  }

  public getWhatsapp(id: string) {
    return this.whatsapps.find((whatsapp) => whatsapp.id === id);
  }

  public getWhatsapps() {
    return this.whatsapps;
  }

  public getWhatsappByIds(ids: string[]) {
    return this.whatsapps.filter((whatsapp) => ids.includes(whatsapp.id));
  }

  public delWhatsapp(id: string) {
    this.whatsapps = this.whatsapps.filter((whatsapp) => whatsapp.id !== id);
    return this.whatsapps;
  }

  public async resetStatus() {
    try {
      await prisma.whatsapp.updateMany({
        where: {
          NOT: {
            status: 'LOGOUT',
          },
        },
        data: {
          status: 'LOGOUT',
        },
      });
    } catch (error) {
      console.log('RESET_STATUS', error);
    }
  }

  public async register(id: string) {
    try {
      const whatsapp = await this.addWhatsapp(id);
      if (!whatsapp) throw new Error('Whatsapp not found');

      await prisma.whatsapp.update({
        where: {
          id,
        },
        data: {
          status: 'INITIALIZING',
        },
      });

      whatsapp.init();
    } catch (error) {
      console.log('INITIALIZING', error);
    }
  }
}

const whatsappManager = new WhatsappManager();
whatsappManager.resetStatus();

export { whatsappManager };
