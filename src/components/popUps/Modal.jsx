import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectGlobal } from '../../Redux/Features/globalSlice';
import { useGlobalHooks } from '../../Hooks/globalHooks';

function Modal({ id, className, children }) {
  const show = useSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const modalRef = useRef();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        handleShow(id);
      }
    };

    if (show[id]) {
      // Add the event listener when the component mounts
      document.addEventListener('mousedown', handleDocumentClick);

      // Remove the event listener when the component unmounts or when the modal is hidden
      return () => {
        document.removeEventListener('mousedown', handleDocumentClick);
      };
    }
  }, [show, handleShow, id]);

  return (
    <>
      {show[id] && (
        <div id={id} className={className} ref={modalRef}>
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
