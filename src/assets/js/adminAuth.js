//<!--===============================================================================================-->
import { useEffect } from 'react';
import axios from 'axios';
import { authHeaders } from './headers';
//<!--===============================================================================================-->
const adminAuth = (setUser) => {

        const auth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
            }
            axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/user/admin-auth`, {}, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            });
        };
        
        useEffect(() => { auth(); }, []);
};
//<!--===============================================================================================-->
export default adminAuth;
//<!--===============================================================================================-->
