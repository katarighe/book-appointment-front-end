import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { selectDoctor } from '../../Redux/Features/doctorSlice';
import './DoctorDetails.scss';
import { BsCaretLeft } from 'react-icons/bs';
import { getAppointmentDetails } from '../../Redux/Features/appointmentSlice';

function DoctorDetails() {
  const { id } = useParams();
  const { allDoctors } = useSelector(selectDoctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    id: doctor_id,
    name,
    imageUrl,
    description,
    specialization,
    costPerDay,
    city,
  } = allDoctors.find((doc) => doc.id === id);

  const doctorDetails = () => {
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
  };

  return (
    <main className='doctorDetails'>
      <section className='container d-flex flex-column flex-md-row justify-content-between'>
        <article className='col-12 col-md-7'>
          <figure className=''>
            <img src={imageUrl} alt='' />
          </figure>
        </article>
        <article className='col-12 col-md-4 d-flex flex-column align-items-end text-end'>
          <section>
            <h4 className='mb-5'> {name} </h4>

            <div className='greyBg d-flex justify-content-between'>
              <p> Bio: </p>
              <p> {description} </p>
            </div>

            <div className='whiteBg d-flex justify-content-between'>
              <p> Specialization: </p>
              <p> {specialization} </p>
            </div>

            <div className='greyBg d-flex justify-content-between'>
              <p> Cost Per Day: </p>
              <p> ${costPerDay}/hr </p>
            </div>

            <div className='whiteBg d-flex justify-content-between'>
              <p> City: </p>
              <p> {city} </p>
            </div>
          </section>

          <section className='mt-5'>
            <Link
              to='/doctordetails/bookdoctor'
              className='main-btn'
              onClick={doctorDetails}
            >
              {' '}
              Book Appointment{' '}
            </Link>
          </section>
        </article>
      </section>
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
    </main>
  );
}

export default DoctorDetails;
