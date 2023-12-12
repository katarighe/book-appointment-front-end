import baseAPI from './axiosInstances';

export const SignUp = async (formData) => await baseAPI.post('/users/signup', formData);

export const SignIn = async (formData) => await baseAPI.post('/users/login', formData);

export const getDoctors = async () => await baseAPI.get('/doctors');

export const addDoctors = async (formData) => await baseAPI.post('/doctors', formData);

export const deleteDoctors = async (id) => await baseAPI.delete(`/doctors/${id}`);

export const createAppointment = async (formData) => await baseAPI.post('/appointments', formData);

export const getUserAppointments = async () => await baseAPI.get('/appointments');
