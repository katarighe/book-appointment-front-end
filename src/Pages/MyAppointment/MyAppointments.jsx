import { useDispatch, useSelector } from 'react-redux';
import {
  getAppointments,
  selectAppointment,
} from '../../Redux/Features/appointmentSlice';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyAppointments() {
  const dispatch = useDispatch();
  const { allAppointments, isLoading, isError } =
    useSelector(selectAppointment);
  console.log(allAppointments);
  console.log(isError);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main className='d-flex flex-column justify-content-center algin-items-center'>
      <h2 className='text-center my-5'> Your Appointment List</h2>
      {isError === 'not found' ? (
        <section className='text-center mb-3'>
          <h3 className='mb-3'>Your appointment list isn empty</h3>
          <Link to='/' className='main-btn'>
            {' '}
            Book Appointment now{' '}
          </Link>
        </section>
      ) : (
        <section></section>
      )}
    </main>
  );
}

export default MyAppointments;
