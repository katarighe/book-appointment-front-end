import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import BookAppointments from '../../Pages/BookAppointment/BookAppointments';
import { getAppointmentDetails } from '../../Redux/Features/appointmentSlice';

// Mock Redux store
const mockStore = configureStore([]);

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

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
        ],
        isLoading: false,
      },
    });
  });

  test('handles doctor details link click', () => {
    // Mock the useDispatch function
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookAppointments />
        </MemoryRouter>
      </Provider>,
    );

    // Simulate a click on the "Book Appointment" link
    fireEvent.click(screen.getByText(/Book Appointment/i));

    // Assert that the dispatch function is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      getAppointmentDetails({
        doctor_id: 1,
        name: 'Dr. John Doe',
        imageUrl: 'https://example.com/doctor.jpg',
        specialization: 'Cardiologist',
      }),
    );
  });
});
