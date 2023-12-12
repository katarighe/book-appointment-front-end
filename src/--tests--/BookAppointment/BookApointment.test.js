import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import BookAppointments from '../../Pages/BookAppointment/BookAppointments';
import { selectDoctor } from '../../Redux/Features/doctorSlice';

// Mock Redux store
const mockStore = configureStore([]);

describe('BookAppointments Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      doctorSlice: {
        allDoctors: [
          {
            id: 1,
            name: 'Dr. John Doe',
            imageUrl: 'https://example.com/doctor.jpg',
            specialization: 'Cardiologist',
          },
          // Add more doctor data as needed
        ],
        isLoading: false,
      },
    });
  });

  test('renders BookAppointments component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookAppointments />
        </MemoryRouter>

      </Provider>,
    );

    expect(screen).toMatchSnapshot();
  });
});
