import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders, customHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { io } from 'socket.io-client';

const kioskAxios = (setDatas) => {

    const getProcesses = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/queue/get-processes`, { headers: customHeaders })
            .then(res => {
                setDatas(res.data.processes)
                console.log(res.data.processes);
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    useEffect(() => {  getProcesses(); }, [])

    useEffect(() => {
        const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('refreshDatas', () => {
            getProcesses();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.off('refreshDatas');
            socket.disconnect();
        };
    }, []);


}

export default kioskAxios