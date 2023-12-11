import { useDispatch, useSelector } from 'react-redux';
import {
  getAppointments,
  selectAppointment,
} from '../../Redux/Features/appointmentSlice';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserDoctor } from 'react-icons/fa6';
import { BsCalendarDate } from 'react-icons/bs';
import './MyAppointment.scss';

function MyAppointments() {
  const dispatch = useDispatch();
  const { allAppointments, isLoading, isError } =
    useSelector(selectAppointment);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className=' myAppointment d-flex flex-column justify-content-center algin-items-center'>
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
        <ul className='d-flex flex-wrap gap-1 justify-content-between container'>
          {allAppointments.map((item) => (
            <li className='card listCard d-flex justify-content-between flex-fill p-2'>
              <h3>
                {' '}
                <span>
                  <FaUserDoctor />
                </span>{' '}
                {item?.doctor?.name}{' '}
              </h3>
              <h4>
                {' '}
                <span>
                  <BsCalendarDate />
                </span>{' '}
                {item?.date_of_appointment}{' '}
              </h4>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyAppointments;
