import axios from 'axios'
import { useEffect, useState } from 'react'

const auth = () => {
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

export default auth