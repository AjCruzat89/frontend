import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';


const staffAxios = (setCurrentWindow, setWindowNames, setPending, setTransactions) => {

    const getCurrentWindow = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/staff/current-window`, { headers: authHeaders })
            .then(res => {
                setCurrentWindow(res.data.result)
                const id = res.data.result.id
                axios.get(`http://${import.meta.env.VITE_IPV4}:3000/staff/get-transactions-by-id/${id}`, {
                    headers: authHeaders
                })
                    .then(res => {
                        setTransactions(res.data.results)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getWindowNames = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/staff/get-window-names`, { headers: authHeaders })
            .then(res => {
                setWindowNames(res.data.windows)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getPending = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/staff/get-pending`, { headers: authHeaders })
            .then(res => {
                setPending(res.data.results)
            })
            .catch(err => {
                console.log(err)
                setPending([])
            })
    }

    useEffect(() => {
        getCurrentWindow();
        getWindowNames();
        getPending();
    }, [])

    const updateQueue = (id) => {
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/update-queue`, { id }, { headers: authHeaders })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Success!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const transferWindow = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/transfer-window`, formData, { headers: authHeaders })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Success!',
                    showConfirmButton: false,
                    timer: 1500
                })
                const modal = document.getElementById('transferModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const finishQueue = (id) => {
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/finish-queue`, { id }, { headers: authHeaders })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Success!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addTransaction = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/add-transaction`, formData, { headers: authHeaders })
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
                const modal = document.getElementById('addModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
                document.getElementById('addAmount').value = ''
                document.getElementById('addDescription').value = ''
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

    const deleteTransaction = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/delete-transaction`, formData, { headers: authHeaders })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Deleted Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                const modal = document.getElementById('deleteModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('deleteId').value = btn.getAttribute('data-id');
    }

    useEffect(() => {
        const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('refreshQueue', async () => {
            await Promise.all([
                getCurrentWindow(), 
                getWindowNames(), 
                getPending()
            ]);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.off('refreshQueue');
            socket.disconnect();
        };
    }, []);

    return { updateQueue, transferWindow, finishQueue, addTransaction, deleteAttributes, deleteTransaction }

}

export default staffAxios