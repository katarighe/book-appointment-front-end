import baseAPI from './axiosInstances';

export const SignUp = async (formData) => {
  return await baseAPI.post('/users/signup', formData);
};

export const SignIn = async (formData) => {
  return await baseAPI.post('/users/login', formData);
};
