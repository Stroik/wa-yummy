export const handleStatus = (status: string) => {
  switch (status) {
    case 'READY':
      return 'Sesión iniciada';
    case 'LOGOUT':
      return 'Sesión cerrada';
    case 'INITIALIZING':
      return 'Iniciando sesión';
    case 'QR_SENT':
      return 'Escanear QR';
    case 'BANNED':
      return 'Baneado';
    default:
      return 'Desconocido';
  }
};

export const handleCampaignStatus = (status: string) => {
  switch (status) {
    case 'CREATED':
      return 'Enviar';
    case 'SENT':
      return 'Reenviar';
    case 'SENDING':
      return 'Enviando';
    default:
      return 'Enviar';
  }
};
