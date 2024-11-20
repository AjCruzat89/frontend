import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const adminUsers = (setDatas, setWindows) => {

    const getUsers = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/admin/get-users`, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setDatas(res.data.users)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getWindowNames = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/admin/get-window-names`, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setWindows(res.data.windows)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => { 
        getUsers();
        getWindowNames();
     }, [])

    const createUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/create-user`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Added Successfully!',
                    toast: true,
                    position: 'bottom-left',
                    showCloseButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                getUsers();
                const modal = document.getElementById('addModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
                document.getElementById('add-username').value = "";
                document.getElementById('add-password').value = "";
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
            });
    }

    const editUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/edit-user`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated Successfully!',
                    toast: true,
                    position: 'bottom-left',
                    showCloseButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                getUsers();
                const modal = document.getElementById('editModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
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
            });
    }

    const updateUserPassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/update-user-password`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated Successfully!',
                    toast: true,
                    position: 'bottom-left',
                    showCloseButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                getUsers();
                const modal = document.getElementById('updateModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
                document.getElementById('update-password').value = "";
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
                });
            });
    }


    const deleteUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/delete-user`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted Successfully!',
                    toast: true,
                    position: 'bottom-left',
                    showCloseButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                getUsers();
                const modal = document.getElementById('deleteModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
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
                });
            });
    }

    return { createUser, editUser, deleteUser, updateUserPassword }
}

export default adminUsers