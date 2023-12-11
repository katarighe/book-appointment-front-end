import React, { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import  './DeleteDoctor.css';
import { deleteDoctors, selectDoctor } from '../../Redux/Features/doctorSlice';
import { Spinner } from 'react-bootstrap';

function ManageDoctors() {
  const { allDoctors, isLoading } = useSelector(selectDoctor);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

 const deleteDoc = (id) => {
  if (id) {
    console.log(id);
    dispatch(deleteDoctors);
  }
 }

  return (
    <>
      <section className="listContainer">
        <div className="listDoctor">
          {allDoctors ? allDoctors.map((doctor) => (
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
