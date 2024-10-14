//<!--===============================================================================================-->
import { useEffect } from 'react';
import axios from 'axios';
//<!--===============================================================================================-->
const adminAuth = (setUser) => {

        const auth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
            }
            axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/admin-auth`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
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
