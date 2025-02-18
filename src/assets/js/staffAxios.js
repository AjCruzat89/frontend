import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';


const staffAxios = (setCurrentWindow, setWindowNames, setPending, setTransactions) => {

    const socketRef = useRef(null);

    const getCurrentWindow = () => {
        axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/current-window`, { headers: authHeaders, withCredentials: false })
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
        axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/get-window-names`, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setWindowNames(res.data.windows)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getPending = () => {
        axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/get-pending`, { headers: authHeaders, withCredentials: false })
            .then(res => {
                setPending(res.data.results)
                if (res.data.results.length > 0 && Notification.permission === "granted") {
                    new Notification("Pending Requests", {
                        body: `There's ${res.data.results.length} in the waiting line.`,
                        icon: "/bcas.png",
                    });
                }
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
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/update-queue`, { id }, { headers: authHeaders, withCredentials: false })
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
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/transfer-window`, formData, { headers: authHeaders, withCredentials: false })
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
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/finish-queue`, { id }, { headers: authHeaders, withCredentials: false })
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
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/add-transaction`, formData, { headers: authHeaders, withCredentials: false })
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
                getCurrentWindow();
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

    const editTransaction = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/edit-transaction`, formData, { headers: authHeaders, withCredentials: false })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Updated Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                const modal = document.getElementById('editModal');
                const myModal = Modal.getOrCreateInstance(modal);
                myModal.hide();
                getCurrentWindow();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteTransaction = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000/staff/delete-transaction`, formData, { headers: authHeaders, withCredentials: false })
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
                getCurrentWindow();
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const editAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('edit-id').value = btn.getAttribute('data-id');
        document.getElementById('edit-amount').value = btn.getAttribute('data-amount');
        document.getElementById('edit-description').value = btn.getAttribute('data-description');
    }

    const deleteAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('deleteId').value = btn.getAttribute('data-id');
    }

    useEffect(() => {
        socketRef.current = io(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_IPV4}:3000`, { reconnection: true, });

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socketRef.current.on('refreshQueue', async () => {
            await Promise.all([
                getCurrentWindow(), 
                getWindowNames(), 
                getPending()
            ]);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socketRef.current.off('refreshQueue');
            socketRef.current.disconnect();    
        };
    }, []);

    const sendMessage = (queue_number, window) => {
        const msg = `calling queue number ${queue_number}, come to ${window}.`
        socketRef.current.emit('call', msg, (response) => {
            if(response) {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Calling!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'error',
                    title: 'Error!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return { updateQueue, transferWindow, finishQueue, addTransaction, editAttributes, deleteAttributes, editTransaction, deleteTransaction, sendMessage}

}

export default staffAxios