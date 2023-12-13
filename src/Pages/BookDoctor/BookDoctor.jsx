import { useState } from 'react';
import { useSweetAlert } from '../../Hooks/useSweetAlert';
import './BookDoctor.scss';
import { useNavigate } from 'react-router-dom';
import { BsCaretLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../Redux/Features/userAuthSlice';
import {
  createAppointment,
  selectAppointment,
} from '../../Redux/Features/appointmentSlice';
import { Spinner } from 'react-bootstrap';

const BookDoctor = () => {
  const { showAlert } = useSweetAlert();
  const dispatch = useDispatch();
  const { appointmentDetails, isLoading } = useSelector(selectAppointment);
  const { authUser } = useSelector(selectUserData);

  const [bookingData, setBookingData] = useState({
    date_of_appointment: '',
    user_id: authUser.image?.record.id,
    doctor_id: appointmentDetails.doctor_id,
    username: authUser.name,
    doctorname: appointmentDetails.name,
  });

  // Function to get the formatted current date
  function getFormattedDate() {
    // ge current date
    const currentDate = new Date();

    // Format current date to match the string type from input date
    const formattedDate = currentDate.toISOString().split('T')[0];

    return formattedDate;
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookingData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    try {
      const rsp = await dispatch(createAppointment(bookingData));

      if (rsp.meta.requestStatus === 'fulfilled') {
        showAlert('Appointment booked successfully');
        navigate('/myappointments');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='bookDoctor d-flex flex-column '>
      <section className='d-flex'>
        <div
          className='back '
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsCaretLeft />
        </div>
      </section>

      <section className=' d-flex flex-column align-items-center'>
        <h3 className='my-3'>
          {' '}
          Book Appointment with Doctor {bookingData.doctorname}
        </h3>

        <form onSubmit={handleAddDoctor} className='col-12 col-md-8 mx-auto'>
          <div className='my-3 col-12'>
            <label htmlFor='User Name'> User Name</label>
            <input
              type='text'
              id='username'
              placeholder='Enter user name'
              value={bookingData.username}
              className='form-control'
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>
          <div className='my-3 col-12'>
            <label htmlFor='User ID'> User ID</label>
            <input
              type='text'
              id='user_id'
              placeholder='Enter user id'
              value={bookingData.user_id}
              className='form-control'
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>
          <div className='my-3 col-12'>
            <label htmlFor='Doctor Name'> Doctor Name</label>
            <input
              type='text'
              id='doctorname'
              placeholder='Enter doctor name'
              value={bookingData.doctorname}
              className='form-control'
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>
          <div className='my-3 col-12'>
            <label htmlFor='Doctor ID'> Doctor ID</label>
            <input
              type='text'
              id='doctor_id'
              placeholder='Enter doctor id'
              value={bookingData.doctor_id}
              className='form-control'
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div className='my-3 col-12'>
            <label htmlFor='Date of appointment'> Date of appointment</label>
            <input
              type='date'
              id='date_of_appointment'
              value={bookingData.date_of_appointment}
              className='form-control'
              onChange={handleChange}
              min={getFormattedDate()}
              required
            />
          </div>
          <div className='mt-3'>
            <button className='main-btn col-12' type='submit'>
              {isLoading ? <Spinner /> : 'Book Now'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default BookDoctor;
