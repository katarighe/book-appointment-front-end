import * as FaIcons from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import './DeleteDoctor.css';
import {
  deleteDoctors,
  removeDoctor,
  selectDoctor,
} from '../../Redux/Features/doctorSlice';
import { Spinner } from 'react-bootstrap';

const DeleteDoctors = () => {
  const { allDoctors, isLoading } = useSelector(selectDoctor);

  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  const deleteDoc = (id) => {
    if (id) {
      dispatch(deleteDoctors(id));
      dispatch(removeDoctor(id));
    }
  };

  return (
    <>
      <section className='listContainer'>
        <div className='listDoctor'>
          {allDoctors ? (
            <ul className='d-flex flex-wrap gap-3 '>
              {allDoctors.map((doctor) => (
                <li
                  key={doctor.id}
                  className='card p-2 col-12 col-md-5 d-flex flex-row justify-content-between align-items-center'
                >
                  <figure className='col-5'>
                    <img src={doctor.imageUrl} alt='doctors' />
                  </figure>
                  <div className='d-flex flex-column col-6'>
                    <h3 className='docName'>{doctor.name}</h3>
                    <p
                      onClick={() => deleteDoc(doctor.id)}
                      className='card d-flex flex-row justify-content-between p-2 align-items-center'
                    >
                      {' '}
                      Delete Doctor
                      <FaIcons.FaTrash role='button' className='dltBtn' />
                    </p>
                  </div>
                </li>
              ))}{' '}
            </ul>
          ) : (
            <p>No doctors 😔</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DeleteDoctors;
