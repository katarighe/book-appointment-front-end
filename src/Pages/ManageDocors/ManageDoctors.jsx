import React, { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getDoctors, deleteDoctors } from '../../api/apis'; 
import DeleteDoctor from '../ManageDocors/DeleteDoctor.css';

let fetched = false;

function ManageDoctors() {
  const doctors = useSelector((state) => state.bookDoctorReducer.doctors);
  const user = useSelector((state) => state.userReducer.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetched) {
      dispatch(getDoctors());
      fetched = true;
    }

    if (user.role !== 'admin') {
      navigate('/');
    }
  }, []);
  const deleteDoc = (id) => {
    dispatch(deleteDoctors(id));
  };

  return (
    <>
      <section className="listContainer">
        <div className="listDoctor">
          {doctors ? doctors.map((doctor) => (
            <div key={doctor.id} className="list">
              <img src={doctor.imageUrl} alt="docs" className="docImage" />
              <div className="delete">
                <p className="docName">{doctor.name}</p>
                <FaIcons.FaTrash
                  role="button"
                  className="dltBtn"
                  onClick={() => { deleteDoc(doctor.id); }}
                />
              </div>
            </div>
          )) : <p>No Doctors 😔</p>}
        </div>
      </section>
    </>
  );
}

export default ManageDoctors;
