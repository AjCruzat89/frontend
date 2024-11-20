//<!--===============================================================================================-->
import { useEffect } from 'react';
import axios from 'axios';
import { authHeaders } from './headers';
//<!--===============================================================================================-->
const staffAuth = (setUser) => {

        const auth = () => {
            const token = localStorage.getItem('token');
            if(!token){
                window.location.href = '/login';
            }
            axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/staff-auth`, {}, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            });
        }

        useEffect(() => { auth(); } , []);
};
//<!--===============================================================================================-->
export default staffAuth;
//<!--===============================================================================================-->
