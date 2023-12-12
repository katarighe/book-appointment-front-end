// NavBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NavBar from '../../components/Header/NavBar';
import { userAuthData } from '../../Redux/Features/userAuthSlice';

// Mock Redux store
const mockStore = configureStore([]);

describe('NavBar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userAuthSlice: {
        authUser: {
          name: 'John Doe',
          image_url: 'https://example.com/avatar.jpg',
        },
        isLoggedIn: true,
      },
    });
  });

  test('renders user name and avatar', () => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

  });
});
