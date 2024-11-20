import Swal from 'sweetalert2'
import axios from 'axios'
import { customHeaders, authHeaders } from './headers'
const authAxios = () => {

    const registerSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/register`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => { window.location.href = '/login'; })
            .catch(err => {
                const errorMessage = Array.isArray(err.response.data.error)
                    ? err.response.data.error[0]
                    : err.response.data.error;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    timer: 1000,
                    text: errorMessage,
                    showConfirmButton: false,
                    showCancelButton: false,
                    position: 'center',
                })
            })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/login`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                window.location.href = `/${res.data.role}`;
            })
            .catch(err => {
                const errorMessage = Array.isArray(err.response.data.error)
                    ? err.response.data.error[0]
                    : err.response.data.error;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    timer: 1000,
                    text: errorMessage,
                    showConfirmButton: false,
                    showCancelButton: false,
                    position: 'center',
                })
            })
    }

    const redirect = () => {
        if (localStorage.getItem('token')) {
            axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/redirect`, {}, { headers: authHeaders, withCredentials: false })
            .then(res => { window.location.href = `/${res.data.role}`; })
            .catch(err => { console.log(err); })
        }
    }
    
    return { registerSubmit, loginSubmit, redirect }

}

export default authAxios