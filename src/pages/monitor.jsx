import React, { useEffect, useState } from 'react'
import monitorAxios from '../assets/js/monitorAxios';

const monitor = () => {

    useEffect(() => {
        document.title = 'Monitor';
    },[]);
    const [pending, setPending] = useState([]);
    const [queues, setQueues] = useState([]);
    monitorAxios(setPending, setQueues);

    return (
        <div className='container py-2'>
            <div className="row row-cols-1 row-cols-md-2">
                <div className="col">
                    <div className="card m-0">
                        <div className="alert alert-secondary m-0">
                            Serving
                        </div>
                        {
                            queues.length > 0 && (
                                <div className="d-flex flex-column p-3">
                                    {
                                        queues?.map((data, index) => (
                                            <li key={index}>{data.window}: {data.queue_number}</li>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col">
                    <div className="card m-0">
                        <div className="alert alert-secondary m-0">
                            Waiting
                        </div>
                        {
                            pending.length > 0 && (
                                <div className="d-flex flex-column p-3">
                                {
                                    pending?.map((data, index) => ( 
                                        <li key={index}>{data.queue_number}</li>
                                    ))
                                }
                            </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default monitor