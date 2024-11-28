import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import kioskProcessAxios from '../assets/js/kioskProcessAxios'
import { customHeaders } from '../assets/js/headers'
import axios from 'axios'
import Swal from 'sweetalert2'

const kioskProcess = () => {

    const { coding } = useParams();
    const [data, setData] = useState([]);
    const [lastNumber, setLastNumber] = useState(0);
    useEffect(() => { document.title = `Kiosk | ${coding}` }, [coding])
    kioskProcessAxios(setData, setLastNumber);
    const lastQueueNumber = Number(lastNumber) + 1;

    const createQueueNumber = async (e) => {
        e.preventDefault();
        const formData = {
            queue_number: data.coding + lastQueueNumber,
            process: data.process_type,
        }

        axios.post(`http://${import.meta.env.VITE_IPV4}:3000/queue/create-queue-number`, formData, { headers: customHeaders, withCredentials: false })
            .then(res => {
                const printWindow = window.open('', '', 'height=600,width=800');
                printWindow.document.write('<html><head><title>Print</title>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(`<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                            <h1 style="font-size: 100px">${data.coding}${lastQueueNumber}</h1>
                                            <h1>Process Type: ${data.process_type}</h1>
                                            <h1>Transaction ID: ${res.data.result.id}</h1>
                                            <h1 style="font-weight: lighter">${new Date(res.data.result.createdAt).toLocaleString('en-PH', { timeZone: 'Asia/Manila',weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</h1>
                                    </div>`);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                window.location.href = '/kiosk';
            })
            .catch(err => {
                const errorMessage = Array.isArray(err.response.data.error)
                    ? err.response.data.error[0]
                    : err.response.data.error;
                Swal.fire({
                    icon: 'error',
                    title: errorMessage,
                    position: 'center',
                    showCloseButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
            });
    }


    return (
        <div className='container vh-100 py-5'>
            <div className="card d-flex flex-column align-items-center justify-content-center h-100 p-3 p-md-5 position-relative">
                <div className="position-absolute" style={{ top: '20px', left: '20px' }}>
                    <button onClick={() => window.location.href = '/kiosk'} className='btn btn-primary'>Go Back</button>
                </div>
                <div className="text-center">
                    <h1>{data.process_type}</h1>
                    <i>{data.description}</i>
                </div>
                <form onSubmit={createQueueNumber} className='mt-5'>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-success p-3'>Get Queue Number</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default kioskProcess