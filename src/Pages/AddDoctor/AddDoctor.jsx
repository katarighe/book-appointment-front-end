import React, { useState } from 'react';
import './AddDoctor.scss';
import { addDoctors } from '../../Redux/Features/doctorSlice';

const initialState = {
  name: '',
  city: '',
  specialization: '',
  cost_per_day: 0,
  description: '',
};

function AddDoctor() {
  const [userData, setUserData] = useState(initialState);

  const inputData = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      value: userData.name,
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter doctor residential city',
      value: userData.city,
    },
    {
      id: 'specialization',
      label: 'Specialization',
      type: 'text',
      placeholder: 'Enter doctor specialization',
      value: userData.specialization,
    },
    {
      id: 'cost_per_day',
      label: 'Cost Per Day',
      type: 'number',
      placeholder: 'Enter doctor daily charge',
      value: userData.cost_per_day,
    },
    {
      id: 'description',
      label: ' Description',
      type: 'textarea',
      placeholder: 'About Doctor',
      value: userData.description,
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();

    console.log(userData);
    addDoctors(userData);
  };

  return (
    <main className='addDoctor d-flex flex-column'>
      <form onSubmit={handleAddDoctor} className='col-12 col-md-8 mx-auto'>
        {inputData.map(({ id, label, type, placeholder, value }) => (
          <div key={id} className='my-2 col-12'>
            <label htmlFor='label' className='mb-1'>
              {' '}
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={id}
                className='form-control'
                rows={4}
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
              />
            ) : (
              <input
                id={id}
                type={type}
                className='form-control'
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div>
          <button className='main-btn' type='submit'>
            {' '}
            Add Doctor
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddDoctor;
