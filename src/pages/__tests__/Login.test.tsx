import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { useAuth } from '../../conf/useAuth';
import { UserLoginDTO } from '../../models/IUser';
import '@testing-library/jest-dom';

// ✅ Mock useAuth + navigate
const mockLoginUser = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: () => jest.fn(),
    };
});

jest.mock('../../conf/useAuth');

describe('Login Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // @ts-ignore
        useAuth.mockReturnValue({
            loginUser: mockLoginUser,
            error: null,
        });
    });

    test('renders email, password fields and login button', () => {
        render(<Login />);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /login/i })
        ).toBeInTheDocument();
    });

    test('calls loginUser on button click', () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'user@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'secret123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(mockLoginUser).toHaveBeenCalledWith({
            email: 'user@example.com',
            password: 'secret123',
        });
    });

    test('shows toast on error', () => {
        // @ts-ignore
        useAuth.mockReturnValue({
            loginUser: mockLoginUser,
            error: 'Invalid email or password.',
        });

        render(<Login />);
        expect(screen.getAllByText(/invalid email or password/i).length).toBeGreaterThan(0);
    });

    test('navigates to /home after login', () => {
        // @ts-ignore
        useAuth.mockReturnValue({
            loginUser: (user: UserLoginDTO) => {
                mockNavigate('/home');
            },
            error: null,
        });

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'user@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'secret123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
});
