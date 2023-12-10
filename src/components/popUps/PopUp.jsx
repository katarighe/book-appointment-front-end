import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { selectGlobal } from '../../Redux/Features/globalSlice';
import { useSelector } from 'react-redux';
import './PopUp.scss';
import { useGlobalHooks } from '../../Hooks/globalHooks';

function PopUp({ id, children }) {
  const show = useSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const popupRef = useRef();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (popupRef.current === e.target) {
        handleShow(id);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [show, handleShow, id]);

  return (
    <>
      {show[id] && (
        <div className='popUp_container' ref={popupRef}>
          <section className='wrapper'>{children}</section>
        </div>
      )}
    </>
  );
}

PopUp.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PopUp;
