import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders, customHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';


const kioskProcessAxios = (setData, setLastNumber) => {
    const { coding } = useParams();

    const getProcess = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/queue/get-process/${coding}`, { headers: customHeaders })
            .then(res => {
                setData(res.data.process)
                setCoding(res.data.process.coding)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getLastNumber = () => {
        axios.get(`http://${import.meta.env.VITE_IPV4}:3000/queue/get-last-number?queue_number=${coding}`, { headers: customHeaders })
            .then(res => {
                setLastNumber(res.data.lastNumber)
                console.log(res.data.lastNumber);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => { 
        getProcess();
        getLastNumber();
     }, [])

    useEffect(() => {
        const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
            reconnection: true,
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('refreshDatas', () => {
            getProcess();

            const currentUrl = window.location.pathname;
            if (currentUrl.startsWith('/kiosk/')) {
                window.location.href = '/kiosk';
            }
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

export default kioskProcessAxios