import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectDoctor } from '../../Redux/Features/doctorSlice';
import './DoctorDetails.scss';

function DoctorDetails() {
  const { id } = useParams();
  const { allDoctors } = useSelector(selectDoctor);

  const { name, imageUrl, description, specialization, costPerDay, city } =
    allDoctors.find((doc) => doc.id === id);

  console.log(id);

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
            <button className='main-btn' type='button'>
              {' '}
              Book Appointment{' '}
            </button>
          </section>
        </article>
      </section>
    </main>
  );
}

export default DoctorDetails;
