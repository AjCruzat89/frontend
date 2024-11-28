import React, { useEffect, useState } from 'react'
import monitorAxios from '../assets/js/monitorAxios';


const monitor = () => {

    useEffect(() => {
        document.title = 'Monitor';
    }, []);
    const [pending, setPending] = useState([]);
    const [queues, setQueues] = useState([]);
    monitorAxios(setPending, setQueues);

    return (
        <div className='vh-100 w-100 overflow-sm-hidden'>
            <div className="row row-cols-1 row-cols-md-2 g-0 h-100">
                <div className="col h-100">
                    <div className="card rounded-0 m-0 h-100 border-0">
                        <div className="alert bg-success text-white rounded-0 text-center fw-bolder border-0 m-0">    
                            NOW SERVING
                        </div>
                        {
                            queues.length > 0 && (
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 p-2 g-2 m-0 overflow-auto">
                                    {
                                        queues?.map((data, index) => (
                                            <div key={index} className="col">
                                                <div className='d-flex justify-content-center align-items-center border rounded p-3 bg-success'>
                                                    <p className='m-0 text-nowrap text-white'><span className='fw-bolder'>{index + 1}. </span>{data.window}: {data.queue_number}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> 
                            )
                        }
                    </div>
                </div>
                <div className="col h-100">
                    <div className="card rounded-0 m-0 h-100 border-0">
                        <div className="rounded-0 alert bg-success-subtle text-center fw-bolder border-0 m-0">
                            WAITING
                        </div>
                        {
                            pending.length > 0 && (
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 p-2 g-2 m-0 overflow-auto"> 
                                {
                                    pending?.map((data, index) => ( 
                                        <div key={index} className='col'>
                                            <div className='d-flex justify-content-center align-items-center border border-light rounded p-3 bg-success-subtle'>
                                                <p className='m-0 text-nowrap'><span className='fw-bolder'>{index + 1}.</span>{data.queue_number}</p>
                                            </div>
                                        </div>
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