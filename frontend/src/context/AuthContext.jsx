import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser({ ...decoded, token });
                }
            } catch (e) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    // OTP-based login functions
    const sendLoginOtp = async (phoneNumber) => {
        const response = await api.post('/auth/send-login-otp', { phoneNumber });
        return response.data;
    };

    const verifyLoginOtp = async (phoneNumber, otp) => {
        const response = await api.post('/auth/verify-login-otp', { phoneNumber, otp });
        const { token } = response.data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
        return response.data;
    };

    // OTP-based registration functions
    const sendRegisterOtp = async (firstname, lastname, phoneNumber) => {
        const response = await api.post('/auth/send-register-otp', {
            firstname,
            lastname,
            phoneNumber
        });
        return response.data;
    };

    const verifyRegisterOtp = async (firstname, lastname, phoneNumber, otp) => {
        const response = await api.post('/auth/verify-register-otp', {
            firstname,
            lastname,
            phoneNumber,
            otp
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            sendLoginOtp,
            verifyLoginOtp,
            sendRegisterOtp,
            verifyRegisterOtp,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
