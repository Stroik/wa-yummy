import type { Socket } from 'socket.io';
import { whatsappManager } from '../lib/whatsapp/WhatsappManager';

export const validate = async (socket: Socket, data: any) => {
  try {
    const { phone, whatsapp } = data;
    if (!phone) {
      socket.emit('validated_error', {
        message: 'El campo "phone" está vacío',
      });
      return;
    }
    const sender = whatsappManager.getWhatsapp(whatsapp);
    if (!sender) {
      socket.emit('validated_error', {
        message: 'El whatsapp ha sido baneado',
      });
      socket.disconnect(true);
      return;
    }

    if (sender.status !== 'READY') {
      socket.emit('validated_error', {
        message: 'Es posible que el Whatsapp haya sido baneado',
      });
      socket.disconnect(true);
      return;
    }

    if (!whatsapp) {
      socket.emit('validated_error', {
        message: 'No hay whatsapps disponibles para la validación',
      });
      socket.disconnect(true);
      return;
    }

    const isValid = await sender?.validateNumber(phone.phone);

    if (isValid) {
      socket.emit('valid', { phone });
      console.log('VALIDATED ', phone);
      return;
    } else {
      socket.emit('not_valid', { phone });
      console.log('NOT_VALIDATED ', phone);
      return;
    }
  } catch (error) {
    socket.emit('validated_error', { message: 'Los whatsapps han sido banneados' });
    console.log('VALIDATED_ERROR ', 'Los whatsapps han sido banneados');
    return;
  }
};
