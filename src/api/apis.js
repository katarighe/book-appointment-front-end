import baseAPI from './axiosInstances';

export const SignUp = async (formData) => {
  return await baseAPI.post('/users/signup', formData);
};

export const SignIn = async (formData) => {
  return await baseAPI.post('/users/login', formData);
};

export const getDoctors = async () => {
  return await baseAPI.get('/doctors');
};

export const addDoctors = async (formData) => {
  return await baseAPI.post('/doctors', formData);
};

export const deleteDoctors = async (id) => {
  return await baseAPI.delete(`/doctors/${id}`);
};

export const createAppointment = async (formData) => {
  return await baseAPI.post('/appointments', formData);
};

export const getUserAppointments = async () => {
  return await baseAPI.get('/appointments');
};
