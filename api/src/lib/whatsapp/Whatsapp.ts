import { Client, LocalAuth, Message, MessageMedia } from 'whatsapp-web.js';
import { join } from 'path';
import { PrismaClient } from '../prisma';

const dbPath = join(process.cwd(), '..', 'database', 'wayummy-sessions');
const prisma = new PrismaClient();

export interface IMessage {
  phone: string;
  message: string;
  userId: string;
  campaignId: string;
  media?: string | null;
}

export default class Whatsapp extends Client {
  public id: string;
  public me: string | undefined;
  public status: string | undefined;

  constructor(id: string) {
    super({
      authStrategy: new LocalAuth({
        dataPath: dbPath,
        clientId: `whatsapp-${id}`,
      }),
      ffmpegPath: `${process.env.FFMPEG_PATH}`,
      puppeteer: {
        headless: false,
        executablePath: `${process.env.CHROME_PATH}`,
        env: {
          DISPLAY: ':0',
        },
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
        ],
      },
    });
    this.id = id;
    this.me =
      this.info !== undefined ? String(this.info.wid._serialized).replace('@c.us', '') : undefined;

    this.on('authenticated', () => {
      this.authenticated();
    });

    this.on('ready', () => {
      this.ready();
    });

    this.on('disconnected', () => {
      this.disconnected();
    });

    this.on('message', async (msg) => {
      await this.onMessage(msg);
    });

    this.pupBrowser?.on('disconnected', () => {
      this.disconnected();
      this.pupBrowser?.process()?.kill(1);
    });

    this.pupBrowser?.on('close', () => {
      this.disconnected();
      this.pupBrowser?.process()?.kill(1);
    });

    this.pupPage?.on('close', () => {
      this.disconnected();
      this.pupPage?.browser()?.process()?.kill(1);
    });

    this.pupPage?.on('error', (error) => {
      this.disconnected();
      if (
        error.message.includes(
          'Protocol error (Runtime.callFunctionOn): Target closed.' ||
            error.message.includes('Execution context was destroyed')
        )
      ) {
        this.pupPage?.close();
        this.pupBrowser?.process()?.kill(1);
      }
      this.pupPage?.browser()?.process()?.kill(1);
    });
  }

  private async authenticated() {
    this.status = 'AUTHENTICATED';
    try {
      await prisma.whatsapp.update({
        where: {
          id: this.id,
        },
        data: {
          status: 'AUTHENTICATED',
        },
      });
    } catch (error) {
      console.log('AUTHENTICATED', error);
    }
  }

  private async ready() {
    this.status = 'READY';
    try {
      await prisma.whatsapp.update({
        where: {
          id: this.id,
        },
        data: {
          status: 'READY',
          phone: String(this.info.wid._serialized).replace('@c.us', ''),
        },
      });
    } catch (error) {
      console.log('READY', error);
    }
  }

  private async disconnected() {
    this.status = 'DISCONNECTED';
    try {
      this.removeAllListeners();
      await prisma.whatsapp.delete({
        where: {
          id: this.id,
        },
      });
    } catch (error) {
      console.log('DISCONNECTED', error);
    }
  }

  public async init() {
    this.status = 'INITIALIZING';
    try {
      await prisma.whatsapp.update({
        where: {
          id: this.id,
        },

        data: {
          status: 'INITIALIZING',
        },
      });
    } catch (error) {
      console.log('INITIALIZING', error);
    }

    await this.initialize();
  }

  public async qrCode() {
    this.on('qr', async (qr: string) => {
      const qrEncode = qr;
      this.status = 'QR_SENT';
      try {
        await prisma.whatsapp.update({
          where: {
            id: this.id,
          },
          data: {
            qr: qrEncode,
            status: 'QR_SENT',
          },
        });
      } catch (error) {
        await prisma.whatsapp.update({
          where: {
            id: this.id,
          },
          data: {
            status: 'QR_ERROR',
          },
        });
        console.log('QR_ERROR', error);
      }
    });
  }

  public async validateNumber(phone: string) {
    try {
      const isValid = await this.isRegisteredUser(`${phone}@c.us`);
      return isValid;
    } catch (error) {
      console.log('VALIDATE_NUMBER', error);
      return false;
    }
  }

  public async remove() {
    try {
      await this.destroy();
      return true;
    } catch (error) {
      console.log('LOGOUT', error);
      return false;
    }
  }

  public async sendMsg(message: IMessage) {
    try {
      if (this.info === undefined) throw new Error('NOT_READY');
      if (!this.validateNumber(message.phone)) throw new Error('INVALID_NUMBER');

      const { phone, message: text, userId, campaignId, media } = message;
      let mediaPath, mediaFile, response;
      if (media) {
        mediaPath = join(__dirname, '..', '..', '..', 'public', media);
        mediaFile = MessageMedia.fromFilePath(mediaPath);
      }

      if (mediaFile) {
        response = await this.sendMessage(`${phone}@c.us`, mediaFile, {
          caption: text,
        });
      } else {
        response = await this.sendMessage(`${phone}@c.us`, text);
      }

      if (response) {
        await prisma.message.create({
          data: {
            userId,
            text,
            status: 'SENT',
            from: this.me,
            to: phone,
            campaignId,
          },
        });
      } else {
        throw new Error('SEND_MSG_ERROR ' + phone);
      }
    } catch (error) {
      console.log('SEND_MSG', error);
    }
  }

  private async onMessage(message: Message) {
    const { from, body } = message;
    const phone = String(from).split('@')[0];

    try {
      const incomingContact = await message.getContact();
      const profilePicUrl = await incomingContact.getProfilePicUrl();
      const contact = await prisma.contact.findFirst({
        where: {
          phone,
        },
      });
      if (!contact)
        return console.log('red', 'Contacto no encontrado ' + phone, ' CONTACT_NOT_FOUND');

      if (!contact.image || contact.image !== profilePicUrl) {
        await prisma.contact.update({
          where: {
            id: contact.id,
          },
          data: {
            image: profilePicUrl,
          },
        });
      }

      await prisma.message.create({
        data: {
          text: body,
          status: 'RECEIVED',
          from: phone,
          to: String(this.info.wid._serialized).split('@')[0],
          userId: contact.userId,
        },
      });
    } catch (error) {
      console.log('red', error);
    }
  }
}
