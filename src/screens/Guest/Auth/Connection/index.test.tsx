import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Login from './index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Login', () => {
  const navigation = {navigate: jest.fn()};

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Login />);
    expect(getByPlaceholderText('Adresse email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
  });

  it('shows error message if email or password is missing', async () => {
    const {getByText, getByPlaceholderText} = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('Adresse email'),
      'test@example.com',
    );
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(getByText('Veuillez remplir tous les champs.')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Adresse email'), '');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password');
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(getByText('Veuillez remplir tous les champs.')).toBeTruthy();
    });
  });

  it('shows error message if login fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    const {getByText, getByPlaceholderText} = render(<Login />);
    fireEvent.changeText(
      getByPlaceholderText('Adresse email'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password');
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('navigates to HomeGuest on successful login', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        token: 'token',
      },
    });

    const {getByText, getByPlaceholderText} = render(<Login />);
    fireEvent.changeText(
      getByPlaceholderText('Adresse email'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password');
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'token');
      expect(navigation.navigate).toHaveBeenCalledWith('HomeGuest');
    });
  });
});
