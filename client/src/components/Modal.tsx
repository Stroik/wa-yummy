'use client';

interface ModalPros {
  opentext: string | React.ReactNode;
  confirm: React.ReactNode;
  id: string;
  closeText: string | React.ReactNode;
  children?: React.ReactNode;
  styles?: {
    open?: string;
    modal?: string;
    confirm?: string;
    close?: string;
  };
}

export const Modal = ({ opentext, confirm, id, closeText, styles, children }: ModalPros) => {
  return (
    <>
      <button
        className={`btn ${styles?.open ? styles?.open : null}`}
        onClick={() => (window as any)[id]?.showModal()}
      >
        {opentext}
      </button>
      <dialog
        id={id}
        className={`modal modal-bottom sm:modal-middle ${styles?.modal ? styles.modal : null} `}
      >
        <form method="dialog" className="modal-box">
          {children}
          <div className="modal-action">
            <button className={`btn btn-secondary ${styles?.close ? styles?.close : null}`}>
              {closeText}
            </button>
            <button className={`btn btn-primary ${styles?.confirm ? styles?.confirm : null}`}>
              {confirm}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
