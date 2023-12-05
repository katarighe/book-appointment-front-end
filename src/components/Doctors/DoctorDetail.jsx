import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchDoctorDetails } from '../../Redux/Features/doctorDetailSlice';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.DoctorDetailReducer);

  useEffect(() => {
    dispatch(fetchDoctorDetails(id));
  }, [dispatch]);

  return (
    <section className="">
      <div className="">
        <div className="">
          <img alt="doctor" src={doctor.image_url} />
        </div>
        <div className="">
          <h2 className="">
            { doctor.name }
          </h2>
          <div className="">
            { doctor.description }
          </div>
          <div className="">
            <div>City</div>
            <div className="">
              { doctor.city }
            </div>
          </div>
          <div className="">
            <div>Specialization</div>
            <div className="">
              { doctor.specialization }
            </div>
          </div>
          <div className="">
            <div>Cost per day</div>
            <div className="">
              $
              { doctor.cost_per_day }
            </div>
          </div>
          <div className="">
            <button type="button" className="">
              <i className="fa-solid fa-gear" />
              Reserve
              <i className="fa-regular fa-circle-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="back">
        <Link to="/">
          <button type="button" className="">
            <i className="fa-solid fa-caret-left" />
          </button>
        </Link>
      </div>

      <div />

    </section>
  );
}

export default Details;