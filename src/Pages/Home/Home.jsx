import { useEffect } from 'react';
import './Home.scss';
import { getDoctors, selectDoctor } from '../../Redux/Features/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import Slider from 'react-slick';

const Home = () => {
  const dispatch = useDispatch();
  const { allDoctors, isLoading } = useSelector(selectDoctor);
  console.log(allDoctors);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <section className=''>
        <Slider {...settings}>
          {allDoctors.map((item) => (
            <DoctorCard
              key={item?.id}
              id={item?.id}
              imageUrl={item?.imageUrl}
              name={item?.name}
              description={item?.description}
            />
          ))}
        </Slider>
      </section>
    </main>
  );
};

export default Home;
