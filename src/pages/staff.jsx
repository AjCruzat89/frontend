import React, { useEffect, useState } from 'react'
import { StaffNavbar } from '../components'
import staffAuth from '../assets/js/staffAuth'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net';
import 'datatables.net-bs5';
import $ from 'jquery';
import dtconfig, { redrawDataTable } from '../assets/js/dtconfig'
import staffAxios from '../assets/js/staffAxios';

const staff = () => {

    useEffect(() => { document.title = 'Staff' }, []);
    const [user, setUser] = useState([]);
    staffAuth(setUser);
    const [currentWindow, setCurrentWindow] = useState([]);
    const [windowNames, setWindowNames] = useState([]);
    const [pending, setPending] = useState([]);
    const { updateQueue, transferWindow, finishQueue } = staffAxios(setCurrentWindow, setWindowNames, setPending);
    useEffect(() => { 
        dtconfig(); 
    }, []);

    useEffect(() => {
        redrawDataTable(); 
    }, [pending]);

    const textToSpeech = () => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = `calling queue number ${currentWindow.queue_number} come to ${currentWindow.window}`;
        window.speechSynthesis.speak(msg);
    }

    return (
        <>
            <StaffNavbar role={user.role} />
            <div className="right right-active" id='container-box'>
                <div className="container py-3">
                    {
                        currentWindow && user.window ? (
                            <>
                                <div className="card p-3">
                                    <div className="alert alert-secondary text-center m-0">NOW SERVING</div>
                                    <h1 className='text-center my-5'>QUEUE NUMBER: {currentWindow.queue_number}</h1>
                                    <div className='d-flex flex-row gap-2 justify-content-end'>
                                        <button data-bs-toggle="modal" data-bs-target="#transferModal" className='btn btn-secondary d-flex justify-content-center align-items-center gap-2'><i className="bi bi-arrow-left-right"></i>TRANSFER</button>
                                        <button onClick={textToSpeech} className='btn btn-primary text-white d-flex justify-content-center align-items-center gap-2' type='button'><i className="bi bi-bell"></i>CALL</button>
                                        <button onClick={() => finishQueue(currentWindow.id)} className='btn btn-success d-flex justify-content-center align-items-center gap-2' type='button'><i className="bi bi-check"></i>FINISH</button>
                                    </div>
                                    <form onSubmit={transferWindow}>
                                        <div className="modal fade" id="transferModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Transfer Window</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                                        <input className='form-control d-none' type="text" name="id" defaultValue={currentWindow.id} readOnly />
                                                        {
                                                            windowNames.length > 0 ? (
                                                                <select name="window" className="form-select">
                                                                    {
                                                                        windowNames.map((item, index) => (
                                                                            <option key={index} defaultValue={item.window}>{item.window}</option>
                                                                        ))
                                                                    }
                                                                    <option value="">Waiting Line</option>
                                                                </select>
                                                            ) : (
                                                                <select name="window" className="form-select">
                                                                    <option value="">Waiting Line</option>
                                                                </select>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="modal-footer justify-content-center">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    pending.length > 0 && user.window ? (
                                        <>
                                            <div className="card p-3">
                                                <h1 className='text-center py-3'>{ user.window }</h1>
                                                <div className="table-responsive">
                                                    <table id='example' className='table table-bordered'>
                                                        <thead>
                                                            <tr>
                                                                <th scope='row'>ID</th>
                                                                <th scope='row'>QUEUE NUMBER</th>
                                                                <th scope='row'>PROCESS</th>
                                                                <th scope='row'>ACTION</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                pending.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.id}</td>
                                                                        <td>{item.queue_number}</td>
                                                                        <td>{item.process}</td>
                                                                        <td><button onClick={() => updateQueue(item.id)} className='btn btn-primary'>CALL</button></td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="alert alert-danger m-0 text-center">NO QUEUE</div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default staff