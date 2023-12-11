import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectDoctor } from '../../Redux/Features/doctorSlice';
import { Link } from 'react-router-dom';
import './BookAppointment.scss';
import { getAppointmentDetails } from '../../Redux/Features/appointmentSlice';

function BookAppointments() {
  const { allDoctors, isLoading } = useSelector(selectDoctor);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  const doctorDetails = (id) => {
    if (id) {
      const {
        id: docId,
        name,
        imageUrl,
        description,
        specialization,
        costPerDay,
        city,
      } = allDoctors.find((doc) => doc.id === id);

      const doctor_id = Number(docId);

      dispatch(
        getAppointmentDetails({
          doctor_id,
          name,
          imageUrl,
          description,
          specialization,
          costPerDay,
          city,
        }),
      );
    }
  };

  return (
    <main className='bookAppointment'>
      <ul className='d-flex flex-wrap gap-2 justify-content-between container mt-5'>
        {allDoctors.map((item) => (
          <li
            key={item?.id}
            className='card listItem d-flex flex-column flex-md-row justify-content-between p-2 col-12 col-md-5'
          >
            <figure className='col-12 col-md-4'>
              <img src={item?.imageUrl} alt='' />
            </figure>
            <div className='col-12 col-md-7 title'>
              <h3>{item?.name} </h3>
              <h4>{item?.specialization} </h4>
              <div className='my-4 col-12'>
                <Link
                  id={item?.id}
                  to='/doctordetails/bookdoctor'
                  className='main-btn '
                  onClick={() => doctorDetails(item?.id)}
                >
                  {' '}
                  Book Appointment{' '}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default BookAppointments;
