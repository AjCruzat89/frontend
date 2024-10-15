import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../components'
import adminAuth from '../assets/js/adminAuth'
import adminWindows from '../assets/js/adminWindows'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net';
import 'datatables.net-bs5';
import $ from 'jquery';
import dtconfig from '../assets/js/dtconfig'

const windows = () => {
    useEffect(() => { document.title = 'Admin | Windows' }, [])
    const [user, setUser] = useState([]);
    const [datas, setDatas] = useState([]);
    adminAuth(setUser);
    const { createWindow, editWindow, deleteWindow } = adminWindows(setDatas);
    useEffect(() => { dtconfig(); }, [datas]);

    const editAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('edit-id').value = btn.getAttribute('data-id');
        document.getElementById('edit-window').value = btn.getAttribute('data-window');
        document.getElementById('edit-status').value = btn.getAttribute('data-status');
    }

    const deleteAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('delete-id').value = btn.getAttribute('data-id');
    }

    return (
        <>
            <AdminNavbar role={user.role} />
            <div className="right right-active" id='container-box'>
                <div className="container py-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" aria-current="page"><a href="/admin">Admin</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Windows</li>
                        </ol>
                    </nav>
                    <button data-bs-toggle="modal" data-bs-target="#addModal" className='d-flex align-items-center gap-2 btn btn-primary'><i className="bi bi-plus-circle-fill"></i>ADD</button>
                    {datas.length > 0 ? (
                        <div className="card p-3 mt-3">
                            <div className='py-3'>

                            </div>
                            <div className="table-responsive">
                                <table className='table table-bordered' id='example'>
                                    <thead>
                                        <tr>
                                            <th scope='row'>ID</th>
                                            <th scope='row'>WINDOW</th>
                                            <th scope='row'>STATUS</th>
                                            <th scope='row'>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='dt-type-numeric sorting_1'>{data.id}</td>
                                                    <td>{data.window}</td>
                                                    <td>
                                                        {data.status === 'open' ? (
                                                            <span className='text-primary'>OPEN</span>
                                                        ) : (
                                                            <span className='text-danger'>CLOSED</span>
                                                        )}
                                                    </td>
                                                    <td className='p-3'>
                                                        <div className='d-flex gap-2' id="actionMenu">
                                                            <i onClick={() => window.location.href = `/admin/windows/${data.window}`} style={{ backgroundColor: 'var(--var-secondary)' }} className="bi bi-arrow-right-circle-fill"></i>
                                                            <i onClick={editAttributes} style={{ backgroundColor: 'var(--var-primary)' }} data-bs-toggle="modal" data-bs-target="#editModal" className="bi bi-pencil-square" data-id={data.id} data-window={data.window} data-process={data.process} data-coding={data.coding} data-status={data.status}></i>
                                                            <i onClick={deleteAttributes} className="bi bi-trash3-fill" style={{ backgroundColor: 'var(--var-danger)' }} data-bs-toggle="modal" data-bs-target="#deleteModal" data-id={data.id}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-danger w-100 text-center mt-3">NO DATA</div>
                    )}
                </div>

                <form onSubmit={createWindow}>
                    <div className="modal fade" id="addModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Window</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <div>
                                        <label>Window</label>
                                        <input type="text" name="window" className='form-control' placeholder='Enter window...' id='add-window'/>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={editWindow}>
                    <div className="modal fade" id="editModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Window</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <input type="text" name="id" id="edit-id" className='form-control d-none' />
                                    <div>
                                        <label>Window</label>
                                        <input type="text" name="window" id="edit-window" className='form-control' />
                                    </div>
                                    <div>
                                        <label>Status</label>
                                        <select name="status" id="edit-status" className='form-select'>
                                            <option value='open'>Open</option>
                                            <option value='closed'>Closed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={deleteWindow}>
                    <div className="modal fade" id="deleteModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Window</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <input type="text" name="id" id="delete-id" className='form-control d-none' />
                                    <p>Are you sure you want to delete this window?</p>
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
    )
}

export default windows