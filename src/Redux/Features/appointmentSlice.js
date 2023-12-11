import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api/apis';

const initialState = {
  allAppointments: [],
  isLoading: false,
  isError: '',
  appointmentDetails: null,
};

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (userData, thunkAPI) => {
    try {
      const response = await API.createAppointment(userData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (_, thunkAPI) => {
    try {
      const response = await API.getUserAppointments();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,

  reducers: {
    getAppointmentDetails: (state, action) => {
      state.appointmentDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.allAppointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.allAppointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
          ? action.payload.error
          : 'An error occurred';
      });
  },
});

export const { getAppointmentDetails } = appointmentSlice.actions;

export const selectAppointment = (state) => state.appointmentSlice;

export default appointmentSlice.reducer;
