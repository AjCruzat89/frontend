    import React, { useEffect, useState } from 'react'
    import { StaffNavbar } from '../components'
    import staffAuth from '../assets/js/staffAuth'
    import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
    import 'datatables.net';
    import 'datatables.net-bs5';
    import $ from 'jquery';
    import dtconfig from '../assets/js/dtconfig'
    import staffAxios from '../assets/js/staffAxios';

    const staff = () => {

        useEffect(() => { document.title = 'Staff' }, []);
        const [user, setUser] = useState([]);
        staffAuth(setUser);
        const [currentWindow, setCurrentWindow] = useState([]);
        const [windowNames, setWindowNames] = useState([]);
        const [pending, setPending] = useState([]);
        const [transactions, setTransactions] = useState([]);
        const { updateQueue, transferWindow, finishQueue, addTransaction, editAttributes, deleteAttributes, editTransaction, deleteTransaction, sendMessage } = staffAxios(setCurrentWindow, setWindowNames, setPending, setTransactions);
        useEffect(() => {
            dtconfig();
        }, [pending, transactions]);

        useEffect(() => {
            if (Notification.permission === "default") {
                Notification.requestPermission().then(permission => {
                    console.log("Notification permission:", permission);
                });
            }
        }, []);
        
        // useEffect(() => {
        //     drawDT();
        // }, [pending]);

        function transactionsPrint() {
            const printWindow = window.open('', '', 'height=600,width=800');

            printWindow.document.write('<html><head><title>Print</title>');
            printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 8px 12px; text-align: left; border: 1px solid #ddd; } th { background-color: #f4f4f4; } tr:nth-child(even) { background-color: #f9f9f9; } tr:hover { background-color: #f1f1f1; }</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1 style="text-align: center;">Transactions</h1>');
            printWindow.document.write(`<p><span style="font-weight: bold;">${currentWindow.queue_number}</span>/${new Date(currentWindow.createdAt).toLocaleString('en-PH', { timeZone: 'Asia/Manila',weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</p>`)
            printWindow.document.write('<table>');
            printWindow.document.write('<thead><tr><th>ID</th><th>Transaction ID</th><th>Amount</th><th>Description</th></tr></thead><tbody>');
            
            transactions.forEach(item => {
                printWindow.document.write('<tr>');
                printWindow.document.write('<td>' + item.id + '</td>');
                printWindow.document.write('<td>' + item.transaction_id + '</td>');
                printWindow.document.write('<td>' + item.amount + '</td>');
                printWindow.document.write('<td>' + item.description + '</td>');
                printWindow.document.write('</tr>');
            });
        
            printWindow.document.write('</tbody></table>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
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
                                            <button onClick={() => sendMessage(currentWindow.queue_number, currentWindow.window)} className='btn btn-primary text-white d-flex justify-content-center align-items-center gap-2' type='button'><i className="bi bi-bell"></i>CALL</button>
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
                                                            <input className='form-control d-none' type="text" name="id" value={currentWindow.id} readOnly />
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
                                    <div className='card mt-3 p-3'>
                                        <div className="alert alert-secondary m-0 text-center">TRANSACTIONS OF {currentWindow.queue_number}</div>
                                        <div className='d-flex flex-row gap-2 mt-3'>
                                            <button data-bs-toggle="modal" data-bs-target="#addModal" className='btn btn-primary d-flex gap-2 justify-content-center align-items-center'><i className="bi bi-plus-circle-fill"></i>ADD</button>
                                            {
                                                transactions.length > 0 && ( 
                                                    <button onClick={transactionsPrint} className='btn btn-success d-flex gap-2 justify-content-center align-items-center'><i className="bi bi-printer-fill"></i>PRINT</button>
                                                )
                                            }
                                        </div>
                                        {transactions.length > 0 && (
                                            <div className="table-responsive card mt-3 p-3">
                                                <table id="example" className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope='col'>ID</th>
                                                            <th scope='col'>TRANSACTION_ID</th>
                                                            <th scope="col">AMOUNT</th>
                                                            <th scope="col">DESCRIPTION</th>
                                                            <th scope="col">ACTION</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            transactions.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className='dt-type-numeric sorting_1'>{item.id}</td>
                                                                    <td className='dt-type-numeric sorting_1'>{item.transaction_id}</td>
                                                                    <td className='dt-type-numeric'>{item.amount}</td>
                                                                    <td>{item.description}</td>
                                                                    <td>
                                                                        <div className='d-flex gap-2' id="actionMenu">
                                                                            <i onClick={editAttributes} style={{ backgroundColor: 'var(--var-primary)' }} data-bs-toggle="modal" data-bs-target="#editModal" className="bi bi-pencil-square" data-id={item.id} data-amount={item.amount} data-description={item.description}></i>
                                                                            <i onClick={deleteAttributes} className="bi bi-trash3-fill" style={{ backgroundColor: 'var(--var-danger)' }} data-bs-toggle="modal" data-bs-target="#deleteModal" data-id={item.id}></i>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        <form onSubmit={addTransaction}>
                                            <div className="modal fade" id="addModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Transfer Window</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                                            <input className='form-control d-none' type="text" name="id" defaultValue={currentWindow.id} readOnly />
                                                            <label>Amount</label>
                                                            <input className='form-control' type="number" step="0.01" min="0" name="amount" placeholder='Enter amount...' id='addAmount' />
                                                            <label>Description</label>
                                                            <textarea className='form-control' name="description" placeholder='Enter description...' id='addDescription'></textarea>
                                                        </div>
                                                        <div className="modal-footer justify-content-center">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                        <form onSubmit={editTransaction}>
                                            <div className="modal fade" id="editModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Transfer Window</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                                            <input className='form-control d-none' type="text" name="id" id='edit-id' readOnly />
                                                            <label>Amount</label>
                                                            <input className='form-control' type="number" step="0.01" min="0" name="amount" placeholder='Enter amount...' id='edit-amount' />
                                                            <label>Description</label>
                                                            <textarea className='form-control' name="description" placeholder='Enter description...' id='edit-description'></textarea>
                                                        </div>
                                                        <div className="modal-footer justify-content-center">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                        <form onSubmit={deleteTransaction}>
                                            <div className="modal fade" id="deleteModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Transfer Window</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                                            <input type="number" name="id" id="deleteId" placeholder='Enter id...' className='form-control d-none' />
                                                            <label>Are you sure you want to delete this item?</label>
                                                        </div>
                                                        <div className="modal-footer justify-content-center">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-danger">Delete</button>
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
                                                                            <td className='dt-type-numeric sorting_1'>{item.id}</td>
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