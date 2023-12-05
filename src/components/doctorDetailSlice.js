import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const url = '';

export const fetchDoctorDetails = createAsyncThunk('fetchDoctorDetails', async () => {
  const response = await axios.get('http://127.0.0.1:3000/url', {headers: {
    Accept: 'application/json',
  }});
  return response.data
});

const initialState = {
    value: {},
    loading: false,
    error : '',
  }

  const DoctorDetailSlice = createSlice({
    name: 'DoctorDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDoctorDetails.fulfilled, (state, action) => ({...state, value: action.payload}));
    },
  });

  export default DoctorDetailSlice.reducer;
  