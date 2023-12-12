// BookDoctor.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BookDoctor from '../../Pages/BookDoctor/BookDoctor';
import { createAppointment, selectAppointment } from '../../Redux/Features/appointmentSlice';
import { selectUserData } from '../../Redux/Features/userAuthSlice';
import { MemoryRouter } from 'react-router-dom';

// Mock Redux store
const mockStore = configureStore([]);

describe('BookDoctor Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      appointmentSlice: {
        allAppointments: [],
        isLoading: false,
        isError: '',
        appointmentDetails: {
          doctor_id: '123',
          name: 'Dr. Example',
        },
      },
      userAuthSlice: {
        authUser: {
          name: 'John Doe',
          image_url: 'https://example.com/avatar.jpg',
        },
      },
    });
  });

  test('renders BookDoctor component snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
        <BookDoctor />
        </MemoryRouter>
        
      </Provider>
    );

    // Use the Jest snapshot matcher to compare the rendered component with the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
