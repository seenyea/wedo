import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps{
    children?: any,
    className?: string,
    show?: boolean,
    closeOnBlur?: any,
    showClose?: any,
    onClose?: any,
    closeOnEsc?: any
}

const KEYCODES = {
  ESCAPE: 27,
};

const classnames = (baseClass: string, cls: string, props: any): string => {
    const classLists = [baseClass];
    classLists.push(cls);
    if(props['is-active']){
        classLists.push('is-active');
    }
    return classLists.join(' ');
}

const Modal = ({
  children = null,
  className,
  show = false,
  closeOnBlur,
  showClose,
  onClose,
  closeOnEsc,
}: ModalProps) => {
  const ref = useRef(null);
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    if (!show) {
      return undefined;
    }
    const doc = document;
    const container = doc.createElement('div');
    container.setAttribute('class', 'modal-container');
    doc.body.appendChild(container);
    setPortalContainer(container);

    const handleKeydown = (evt: any) => {
      console.log('handleKeydown', evt);
      if (evt.keyCode === KEYCODES.ESCAPE && show) {
        onClose();
      }
    };

    if (closeOnEsc) {
      doc.addEventListener('keydown', handleKeydown);
    }
    return () => {
      doc.removeEventListener('keydown', handleKeydown);
      container.parentNode.removeChild(container);
    };
  }, [show]);

  if (!portalContainer) {
    return null;
  }

  return ReactDOM.createPortal(
      <div
        ref={ref}
        className={classnames('modal', className, {
          'is-active': show,
        })}
      >
        <div
          role="presentation"
          className="modal-background"
          onClick={closeOnBlur ? onClose : undefined}
        />
        {children ? children : null}
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="modal-close is-large"
            aria-label="close"
          />
        )}
      </div>,
    portalContainer,
  );
};

export default Modal;