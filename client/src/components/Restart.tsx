'use client';

import { Modal } from './Modal';
import { _axios as axios } from '@/utils/_axios';

const restartServer = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXTAUTH_URL}/4fc792ad809e94072f2caabad33cd107/restart-server`
    );
    if (response.status !== 200) throw new Error('Failed to restart server');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Restart = () => {
  const handleRestart = async () => {
    const response = await restartServer();
    if (response) {
      console.log(response);
    }
  };

  return (
    <Modal
      closeText="Cancelar"
      confirm={
        <span onClick={() => handleRestart()}>
          <span>Reiniciar </span>
        </span>
      }
      id={`whatsapp-modal-restart-app`}
      opentext={
        <span className="tooltip tooltip-primary tooltip-bottom" data-tip="Reiniciar servidor">
          <i className="ri-error-warning-line text-xl"></i>
        </span>
      }
      styles={{
        open: 'join-item !btn-ghost',
      }}
    >
      <div className="alert alert-warning mb-4">
        <i className="ri-alert-line text-4xl"></i>
        <span>Estás a punto de reiniciar el servidor</span>
      </div>

      <div className="flex flex-col text-base-content">
        <span className="block">
          Esta acción reiniciará todos los servicios del servidor, incluyendo el servidor de
          WhatsApp, el servidor de la API y el servidor de la aplicación web.
        </span>
        <span className="pt-6 pb-4 font-semibold block">
          ¿Estás seguro que quieres reiniciarlo?
        </span>
      </div>
    </Modal>
  );
};
