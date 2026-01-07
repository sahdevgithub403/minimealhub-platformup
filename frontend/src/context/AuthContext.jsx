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
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser({ ...decoded, token });
                }
            } catch {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    // ================= SEND REGISTER OTP =================
    const sendRegisterOtp = async (firstname, lastname, phoneNumber) => {
        const response = await api.post('/auth/send-register-otp', {
            firstname,
            lastname,
            phone: phoneNumber, 
        });
        return response.data;
    };

    // ================= VERIFY REGISTER OTP =================
    const verifyRegisterOtp = async (firstname, lastname, phoneNumber, otp) => {
        const response = await api.post('/auth/verify-register-otp', {
            firstname,
            lastname,
            phone: phoneNumber, 
            otp,
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
