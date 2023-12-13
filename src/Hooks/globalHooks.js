import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleShow } from '../Redux/Features/globalSlice';

export const useGlobalHooks = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ error: false, errMessage: '' });

  const dispatch = useDispatch();

  const handleShow = (id) => {
    dispatch(toggleShow(id));
  };

  return {
    handleShow,
    show,
    setShow,
    loading,
    setLoading,
    errors,
    setErrors,
  };
};
