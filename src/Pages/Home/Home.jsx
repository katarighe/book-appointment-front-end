import { useEffect } from 'react';
import './Home.scss';
import { getDoctors, selectDoctor } from '../../Redux/Features/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import DoctorCard from '../../components/DoctorCard/DoctorCard';

function Home() {
  const dispatch = useDispatch();
  const { allDoctors, isLoading } = useSelector(selectDoctor);
  console.log(allDoctors);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className='home'>
      <div className='text-center my-3'>
        <h1> Meet our specialist </h1>
        <p className='mt-2'>
          {' '}
          please book an appointment with doctor of your choice today
        </p>
      </div>
      <section className='d-flex flex-wrap'>
        {allDoctors.map((item) => (
          <DoctorCard
            key={item?.id}
            id={item?.id}
            imageUrl={item?.imageUrl}
            name={item?.name}
            description={item?.description}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
