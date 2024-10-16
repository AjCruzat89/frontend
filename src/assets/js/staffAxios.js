import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';


const staffAxios = (setCurrentWindow, setWindowNames, setPending) => {

    const getCurrentWindow = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/staff/current-window`, { headers: authHeaders })
            .then(res => {
                setCurrentWindow(res.data.result)
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
                    title: 'Success',
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
        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/staff/transfer-window`, formData , { headers: authHeaders })
            .then(res => {
                Swal.fire({
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Success',
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
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('refreshQueue', async () => {
                getCurrentWindow()
                getWindowNames()
                getPending()
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.off('refreshQueue');
            socket.disconnect();
        };
    }, []);

    return { updateQueue, transferWindow, finishQueue }

}

export default staffAxios