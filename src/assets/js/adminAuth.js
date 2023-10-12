import React, { useEffect, useState } from 'react'
import axios from 'axios';

const adminAuth = () => {
    const [user, setUser] = useState({});

    const fetchUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            axios.get('http://127.0.0.1:8000/api/authUser', config)
                .then(response => {
                    setUser(response.data);
                    if(response.data.is_admin === 0){
                        window.location.href = '/login';
                        localStorage.removeItem('token');
                    }
                })

                .catch(error => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                })
        }
        else{
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        fetchUser();
        const tokenCheckInterval = setInterval(fetchUser, 10000);
        return () => clearInterval(tokenCheckInterval);
    }, []);

    return { user, fetchUser };
}

export default adminAuth