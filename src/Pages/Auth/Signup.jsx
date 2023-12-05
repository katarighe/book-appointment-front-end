import { useRef, useState } from 'react';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo';
import RightSide from '../../components/RightSide';
import './Auths.scss';

const initialState = {
  companyName: '',
  email: '',
  password: '',
  confirmPass: '',
};

function Signup() {
  const [passwordType, setPasswordType] = useState(false);
  const [setLoading] = useState(false);
  const [errors, setErrors] = useState({ error: false, errMessage: '' });
  const [userData, setUserData] = useState(initialState);

  // const navigate = useNavigate();

  // const { setCookies } = useCookies();

  // const dispatch = useDispatch();
  const inputRef = useRef(null);
  // const { Toast } = useSweetAlert();

  const showPassword = (id) => {
    setPasswordType((prev) => ({ ...passwordType, [id]: !prev[id] }));
  };

  // // get the form input data
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  // Validate input
  const validateInput = ({
    companyName,
    email,
    password,
    confirmPass,
    //checked,
  }) => {
    if (
      companyName === '' ||
      email === '' ||
      password === '' ||
      confirmPass === ''
    ) {
      setErrors({ error: true, errMessage: 'empty' });
      return false;
    }
    if (password) {
      if (password.length < 6) {
        setErrors({ error: true, errMessage: 'weakPassword' });
        return false;
      }
    }

    if (confirmPass !== password) {
      setErrors({ error: true, errMessage: 'confirmpass' });
      return false;
    }

    setErrors({ error: false });

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validInput = validateInput(userData);

    // if the input isn't validated, return
    if (!validInput) {
      setLoading(false);
      return;
    }
  };

  return (
    <div
      className={` userSignup d-flex flex-column flex-md-row justify-content-between`}
    >
      <section className='d-flex flex-column aside py-3'>
        <aside className='col-12 col-md-7 mx-auto container'>
          <div className='col-3 my-3'>
            <BrandLogo />
          </div>
          <h2> Welcome,</h2>
          <p>Please create account to start</p>

          <form
            onSubmit={handleSignUp}
            className={` form d-flex flex-column justify-content-between mt-3`}
          >
            <section className='mb-2'>
              <label htmlFor='Compnay Name' className='labelTitle'>
                {' '}
                Name
              </label>
              <div>
                <input
                  ref={inputRef}
                  type='text'
                  id='companyName'
                  name='Company Name'
                  onChange={handleChange}
                  defaultValue={userData.companyName}
                  placeholder=' Enter company name'
                  required
                  className={` formInput ${
                    errors.errMessage === 'empty' ? 'errors' : ''
                  } form-control `}
                />
              </div>
            </section>

            <section className='mb-2'>
              <label htmlFor='email' className='labelTitle'>
                {' '}
                Email
              </label>
              <div>
                <input
                  ref={inputRef}
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email'
                  onChange={handleChange}
                  defaultValue={userData.email}
                  required
                  className={` formInput ${
                    errors.errMessage === 'email' ||
                    errors.errMessage === 'empty'
                      ? 'errors'
                      : ''
                  } form-control `}
                />
              </div>
            </section>
            <section className='col-12 mb-2'>
              <div className='password'>
                <label htmlFor='password' className='labelTitle'>
                  {' '}
                  Password{' '}
                </label>
                <div
                  className={` inputContainer d-flex flex-row align-items-center`}
                >
                  <input
                    ref={inputRef}
                    id='password'
                    type={!passwordType['password'] ? 'password' : 'text'}
                    name='password'
                    placeholder='Enter password'
                    onChange={handleChange}
                    defaultValue={userData.password}
                    className={` formInput ${
                      errors.errMessage === 'weakPassword' ||
                      errors.errMessage === 'empty'
                        ? 'errors'
                        : ''
                    }  form-control `}
                    required
                  />{' '}
                  <div
                    onClick={() => showPassword('password')}
                    className='icon'
                  >
                    {!passwordType['password'] ? (
                      <BsFillEyeSlashFill />
                    ) : (
                      <BsFillEyeFill />
                    )}
                  </div>
                </div>

                {errors.errMessage === 'weakPassword' && (
                  <span className='error_message'>
                    Password should be 6-20 characters
                  </span>
                )}
              </div>

              <div className='mt-3'>
                <label htmlFor='confirmPass' className='labelTitle'>
                  Re-enter Password
                </label>
                <div
                  className={`inputContainer d-flex flex-row align-items-center `}
                >
                  <input
                    ref={inputRef}
                    id='confirmPass'
                    type={!passwordType['confirmPass'] ? 'password' : 'text'}
                    name='password'
                    onChange={handleChange}
                    defaultValue={userData.confirmPass}
                    placeholder='Re-enter password'
                    required
                    className={`formInput  ${
                      errors.errMessage === 'confirmpass' ||
                      errors.errMessage === 'empty'
                        ? 'errors'
                        : ''
                    } form-control `}
                  />{' '}
                  <div
                    onClick={() => showPassword('confirmPass')}
                    className='icon'
                  >
                    {!passwordType['confirmPass'] ? (
                      <BsFillEyeSlashFill />
                    ) : (
                      <BsFillEyeFill />
                    )}
                  </div>
                </div>
                {errors.errMessage === 'confirmpass' ? (
                  <span className='error_message'>
                    {' '}
                    Your password do not match
                  </span>
                ) : (
                  ''
                )}
              </div>
            </section>

            <div className=' col-12 text-center'>
              <button className='main-btn col-12 mt-2' type='submit'>
                Sign Up
                {/* {loading ? <Spinner /> : 'Sign Up'} */}
              </button>
              {errors.errMessage === 'empty' ? (
                <span className='error_message'>
                  {' '}
                  All field must be filled{' '}
                </span>
              ) : (
                <span className='error_message'> {errors.errMessage} </span>
              )}
            </div>

            <p className='mt-2 '>
              Already have an account?
              <Link className='Login' to='/signin'>
                <strong> Login </strong>
              </Link>
            </p>
          </form>
        </aside>
      </section>
      <RightSide />
    </div>
  );
}

export default Signup;
