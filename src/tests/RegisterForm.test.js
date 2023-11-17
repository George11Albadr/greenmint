import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';

jest.mock('axios');

describe('RegisterForm', () => {
    // ... tus pruebas existentes

    it('should call onRegister with true on successful API response', async () => {
        const mockOnRegister = jest.fn();
        const { getByLabelText, getByText } = render(<RegisterForm onRegister={mockOnRegister} />);

        const mockResponse = { data: 'User registered' };
        axios.post.mockResolvedValue(mockResponse);

        fireEvent.change(getByLabelText(/Username/), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/Email/), { target: { value: 'test@test.com' } });
        fireEvent.change(getByLabelText(/Password/), { target: { value: 'password' } });

        fireEvent.click(getByText(/Register/));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/register', {
                username: 'testuser',
                email: 'test@test.com',
                password: 'password'
            });
            expect(mockOnRegister).toHaveBeenCalledWith(true);
        });
    });

    it('should call onRegister with false on API error', async () => {
        const mockOnRegister = jest.fn();
        const { getByLabelText, getByText } = render(<RegisterForm onRegister={mockOnRegister} />);

        axios.post.mockRejectedValue(new Error('API Error'));

        fireEvent.change(getByLabelText(/Username/), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/Email/), { target: { value: 'test@test.com' } });
        fireEvent.change(getByLabelText(/Password/), { target: { value: 'password' } });

        fireEvent.click(getByText(/Register/));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/register', {
                username: 'testuser',
                email: 'test@test.com',
                password: 'password'
            });
            expect(mockOnRegister).toHaveBeenCalledWith(false);
        });
    });
});
