import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders, customHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { io } from 'socket.io-client';


const monitorAxios = (setPending, setQueues) => {

    const getPending = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/queue/get-pending`, { headers: customHeaders })
            .then(res => {
                setPending(res.data.results);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getQueues = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/queue/get-queues`, { headers: customHeaders })
            .then(res => {
                setQueues(res.data.results);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPending();
        getQueues();
    },[]);

    useEffect(() => {
        const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('refreshQueue', () => {
            getPending();
            getQueues();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.off('refreshQueue');
            socket.disconnect();
        };
    }, []);
}

export default monitorAxios