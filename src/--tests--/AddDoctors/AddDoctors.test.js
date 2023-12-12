import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddDoctor from '../../Pages/AddDoctor/AddDoctor';
import * as API from '../../api/apis';
import { useGlobalHooks } from '../../Hooks/globalHooks';

// Mock the API functions
jest.mock('../../api/apis', () => ({
  addDoctors: jest.fn(),
}));

// Mock the globalHooks
jest.mock('../../Hooks/globalHooks', () => ({
  useGlobalHooks: jest.fn(),
}));

describe('AddDoctor Component', () => {
  // Mock the useGlobalHooks response
  const mockGlobalHooks = {
    errors: { error: false, errMessage: '' },
    setErrors: jest.fn(),
    loading: false,
    setLoading: jest.fn(),
  };

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
    // Mock the response of useGlobalHooks
    useGlobalHooks.mockReturnValue(mockGlobalHooks);
  });

  test('renders AddDoctor component', () => {
    render(<AddDoctor />);
    // Assert that the form is rendered
    expect(screen.getByPlaceholderText('Enter full name')).toBeInTheDocument();
    // Add more assertions based on your form fields
  });

  test('handles form submission successfully', async () => {
    // Mock the successful API response
    API.addDoctors.mockResolvedValue({ statusText: 'Created' });

    render(<AddDoctor />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter full name'), { target: { value: 'John Doe' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'Add Doctor' }));

    // Assert that loading is set to true during form submission
    expect(mockGlobalHooks.setLoading).toHaveBeenCalledWith(true);

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that loading is set back to false after the API call
      expect(mockGlobalHooks.setLoading).toHaveBeenCalledWith(false);
    });
  });

  test('handles form submission with API error', async () => {
    // Mock the API response with an error
    API.addDoctors.mockRejectedValue({ response: { data: { description: 'Description is too short' } } });

    render(<AddDoctor />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter full name'), { target: { value: 'John Doe' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'Add Doctor' }));

    // Assert that loading is set to true during form submission
    expect(mockGlobalHooks.setLoading).toHaveBeenCalledWith(true);

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that loading is set back to false after the API call
      expect(mockGlobalHooks.setLoading).toHaveBeenCalledWith(false);
      // Assert that setErrors is called with the expected error message
      expect(mockGlobalHooks.setErrors).toHaveBeenCalledWith({
        error: true,
        errMessage: 'Description is too short (minimum is 3 characters)',
      });
    });
  });
});
