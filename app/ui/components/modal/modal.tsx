'use client';

import clsx from 'clsx';
import React from 'react';
import style from '@/app/ui/components/modal/modal.module.scss';
import CloseIcon from '../../../../public/close.svg';

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: PropTypes) {
  return (
    <>
      {isOpen && (
        <div className={clsx(style.modal)}>
          <div className={clsx(style.modalWrapper)}>
            <div className={clsx(style.modalContent)}>
              <CloseIcon
                className={clsx(style.closeModalBtn)}
                onClick={() => onClose()}
              />
              {children}
            </div>
          </div>
        </div>
      )}
      <div />
    </>
  );
}

export default Modal;
