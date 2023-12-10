import { useState } from 'react';
import { useGlobalHooks } from '../../Hooks/globalHooks';
import './BookDoctor.scss';
import { useNavigate } from 'react-router-dom';
import { BsCaretLeft } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../Redux/Features/userAuthSlice';
import { selectAppointment } from '../../Redux/Features/appointmentSlice';

// const initialState = {
//   user_name: '',
//   doctor_name: '',
//   date_of_appointment: '',
//   user_id: '',
//   doctor_id: '',
// };

function BookDoctor() {
  const [message, setMessage] = useState('');
  const { errors, setErrors, loading, setLoading } = useGlobalHooks();

  const { appointmentDetails } = useSelector(selectAppointment);
  const { authUser } = useSelector(selectUserData);

  const [bookingData, setBookingData] = useState({
    user_name: authUser.name,
    doctor_name: appointmentDetails.name,
    date_of_appointment: '',
    user_id: authUser.image?.record.id,
    doctor_id: appointmentDetails.doctor_id,
  });

  // console.log(authUser);
  // console.log(appointmentDetails);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookingData((prev) => ({ ...prev, [id]: value }));
  };

  const clearInput = () => {
    setBookingData({});
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    // setLoading(true);
    console.log(bookingData);
    clearInput();

    // try {
    //   dispatch(addDoctors(userData));

    //   if (isError.description) {
    //     setErrors({
    //       error: true,
    //       errMessage: ' Description is too short, minimum is 3 characters',
    //     });

    //     return;
    //   }

    //   if (isError.cost_per_day) {
    //     setErrors({
    //       error: true,
    //       errMessage: ' Cost per day must be greater than 0',
    //     });

    //     return;
    //   }

    //   clearInput();
    //   setMessage('Doctor Successully added');
    //   // navigate('/');
    // } catch (error) {
    //   console.log(error);
    // }
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
        <h3 className='my-3'> Book Appointment with Doctor name</h3>
        <p className='text-center text-success'> {message} </p>
        <form onSubmit={handleAddDoctor} className='col-12 col-md-8 mx-auto'>
          <div className='my-3 col-12'>
            <label htmlFor='User Name'> User Name</label>
            <input
              type='text'
              id='user_name'
              placeholder='Enter user name'
              value={bookingData.user_name}
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
              id='user_name'
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
              id='user_name'
              placeholder='Enter doctor name'
              value={bookingData.doctor_name}
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
              id='user_name'
              placeholder='Enter doctor id'
              value={bookingData.doctor_id}
              className='form-control'
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div className='my-3 col-12'>
            <label htmlFor='User Name'> User Name</label>
            <input
              type='date'
              id='date_of_appointment'
              value={bookingData.date_of_appointment}
              className='form-control'
              onChange={handleChange}
              required
            />
          </div>
          <div className='mt-3'>
            <button className='main-btn col-12' type='submit'>
              {loading ? <Spinner /> : 'Book Now'}
            </button>
          </div>
        </form>
        {errors.error && <p className='error_message'> {errors.errMessage} </p>}
      </section>
    </main>
  );
}

export default BookDoctor;
