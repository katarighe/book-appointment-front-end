import { useState } from 'react';
import './AddDoctor.scss';

import * as API from '../../api/apis';

import { Spinner } from 'react-bootstrap';
import { useGlobalHooks } from '../../Hooks/globalHooks';

const inputData = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter full name',
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter doctor residential city',
  },
  {
    id: 'specialization',
    label: 'Specialization',
    type: 'text',
    placeholder: 'Enter doctor specialization',
  },
  {
    id: 'cost_per_day',
    label: 'Cost Per Day',
    type: 'number',
    placeholder: 'Enter doctor daily charge',
  },
  {
    id: 'image_url',
    label: ' Doctor Image',
    type: 'url',
    placeholder: 'Doctor profile image',
  },
  {
    id: 'description',
    label: ' Description',
    type: 'textarea',
    placeholder: 'About Doctor',
  },
];

const initialState = {
  name: '',
  city: '',
  specialization: '',
  cost_per_day: 0,
  description: '',
  image_url: '',
};

const AddDoctor = () => {
  const [userData, setUserData] = useState(initialState);
  const [message, setMessage] = useState('');
  const { errors, setErrors, loading, setLoading } = useGlobalHooks();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const clearInput = () => {
    setUserData(initialState);
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   dispatch(addDoctors(userData));

    //   if (isError.description) {
    //     setErrors({
    //       error: true,
    //       errMessage: ' Description is too short, minimum is 3 characters',
    //     });

    //     return;
    //   }

    //   if (isError.cost_per_day) {
    //     setErrors({
    //       error: true,
    //       errMessage: ' Cost per day must be greater than 0',
    //     });

    //     return;
    //   }

    //   clearInput();
    //   setMessage('Doctor Successully added');
    //   // navigate('/');
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const result = await API.addDoctors(userData);
      console.log(result);
      setLoading(false);

      if (result.statusText === 'Created') {
        clearInput();
        setMessage('Doctor successfully created');
        setErrors({
          error: false,
          errMessage: '',
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error && error.response.data) {
        if (error.response.data.description) {
          setErrors({
            error: true,
            errMessage: 'Description is too short (minimum is 3 characters)',
          });
        } else if (error.response.data.cost_per_day) {
          setErrors({
            error: true,
            errMessage: 'Cost per day must be greater than 0',
          });
        }
      }
    }
  };

  return (
    <main className='addDoctor d-flex flex-column'>
      <p className='text-center text-success'> {message} </p>

      <form onSubmit={handleAddDoctor} className='col-12 col-md-8 mx-auto'>
        {inputData.map(({ id, label, type, placeholder }) => (
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
                value={userData[id]}
                onChange={handleChange}
                minLength={3}
                required
              />
            ) : (
              <input
                id={id}
                type={type}
                className='form-control'
                placeholder={placeholder}
                value={userData[id]}
                onChange={handleChange}
                minLength={3}
                required
              />
            )}
          </div>
        ))}

        <div className='mt-3'>
          <button className='main-btn' type='submit'>
            {loading ? <Spinner /> : 'Add Doctor'}
          </button>
        </div>
        {errors.error && <p className='error_message'> {errors.errMessage} </p>}
      </form>
    </main>
  );
};

export default AddDoctor;
