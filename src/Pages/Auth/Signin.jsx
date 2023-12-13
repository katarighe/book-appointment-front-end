import { useRef, useState } from 'react';
import './Auths.scss';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo';
import RightSide from '../../components/RightSide';
import { Spinner } from 'react-bootstrap';
import * as API from '../../api/apis';
import { useSweetAlert } from '../../Hooks/useSweetAlert';
import { useDispatch } from 'react-redux';
import { useCookies } from '../../Hooks/cookiesHook';
import { useGlobalHooks } from '../../Hooks/globalHooks';
import { userAuthData } from '../../Redux/Features/userAuthSlice';

const Signin = () => {
  const [passwordType, setPasswordType] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { loading, setLoading, errors, setErrors } = useGlobalHooks();

  const navigate = useNavigate();

  const { setCookies } = useCookies();

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { showAlert } = useSweetAlert();

  const showPassword = (id) => {
    setPasswordType((prev) => ({ ...passwordType, [id]: !prev[id] }));
  };

  // get the form input data
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    API.SignIn(userData)
      .then((res) => {
        console.log(res.data);

        const userToken = res.data.token;
        showAlert('User Signed in successfully');
        setCookies('bookADocUserToken', userToken);
        dispatch(userAuthData(res.data.user_details));

        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setErrors({
          error: true,
          errMessage: err.response.data.error_message,
        });
      });
  };

  return (
    <div
      className={` SignIn d-flex flex-column flex-md-row justify-content-between`}
    >
      <section className='d-flex flex-column aside'>
        <aside className='col-12 col-md-7 mx-auto container'>
          <div className='col-3 my-3'>
            <BrandLogo />
          </div>
          <h2> Welcome back,</h2>
          <p>Log in to continue</p>

          <form
            onSubmit={handleSignIn}
            className={` form d-flex flex-column justify-content-between mt-5`}
          >
            <section className='mb-3'>
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
                  placeholder='example@gmail.com'
                  defaultValue={userData.email}
                  onChange={handleChange}
                  required
                  className=' formInput form-control'
                />
              </div>
            </section>
            <section className='col-12 mb-3'>
              <div className=''>
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
                    placeholder='enter your password'
                    defaultValue={userData.password}
                    onChange={handleChange}
                    className='formInput form-control '
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
              </div>
            </section>

            <div className=' col-12 text-center'>
              <button className='main-btn col-12 mt-1' type='submit'>
                {loading ? <Spinner /> : 'Log In'}
              </button>
              {<span className='error_message'> {errors.errMessage} </span>}
            </div>

            <p className='mt-3 text-center'>
              Don’t have an account?
              <Link className='Login' to='/signup'>
                <strong> Sign up for free </strong>
              </Link>
            </p>
          </form>
        </aside>
      </section>
      <RightSide />
    </div>
  );
};

export default Signin;
