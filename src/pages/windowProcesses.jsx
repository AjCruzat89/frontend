import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../components'
import adminAuth from '../assets/js/adminAuth'
import adminWProcesses from '../assets/js/adminWProcesses'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net';
import 'datatables.net-bs5';
import $ from 'jquery';
import dtconfig from '../assets/js/dtconfig'
import { useParams } from 'react-router-dom';

const windowProcesses = () => {
    const { wname } = useParams();
    useEffect(() => { document.title = `Admin | ${wname}` }, [])
    const [user, setUser] = useState([]);
    const [datas, setDatas] = useState([]);
    adminAuth(setUser);
    const { createProcessType, editProcessType, deleteProcessType } = adminWProcesses(setDatas);
    useEffect(() => { dtconfig(); }, [datas]);

    const editAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('edit-id').value = btn.getAttribute('data-id');
        document.getElementById('edit-process_type').value = btn.getAttribute('data-processtype');
        document.getElementById('edit-coding').value = btn.getAttribute('data-coding');
        document.getElementById('edit-description').value = btn.getAttribute('data-description');
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
                                <li className="breadcrumb-item" aria-current="page"><a href="/admin/windows">Windows</a></li>
                                <li className="breadcrumb-item active" aria-current="page">{wname}</li>
                            </ol>
                        </nav>
                        <button data-bs-toggle="modal" data-bs-target="#addModal" className='d-flex align-items-center gap-2 btn btn-primary'><i className="bi bi-plus-circle-fill"></i>ADD</button>
                        {datas.length > 0 ? (
                            <div className="card p-3 mt-3">
                                <div className="table-responsive">
                                    <table id="example" className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope='row'>ID</th>
                                                <th scope='row'>PROCESS TYPE</th>
                                                <th scope='row'>CODING</th>
                                                <th scope='row'>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='dt-type-numeric sorting_1'>{data.id}</td>
                                                        <td>{data.process_type}</td>
                                                        <td>{data.coding}</td>
                                                        <td className='p-3'>
                                                            <div className='d-flex gap-2' id="actionMenu">
                                                                <i onClick={editAttributes} style={{ backgroundColor: 'var(--var-primary)' }} data-bs-toggle="modal" data-bs-target="#editModal" className="bi bi-pencil-square" data-id={data.id} data-processtype={data.process_type} data-coding={data.coding} data-description={data.description}></i>
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
                            <div className="alert alert-danger mt-3 text-center w-100">No Data</div>
                        )}
                    </div>
    
                    <form onSubmit={createProcessType}>
                        <div className="modal fade" id="addModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Process</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                        <div className='d-none'>
                                            <label>Window</label>
                                            <input type="text" name="window" className='form-control' defaultValue={wname} placeholder='Enter window...'/>
                                        </div>
                                        <div>
                                            <label>Process Type</label>
                                            <input type="text" name="process_type" className='form-control' placeholder='Enter process type...' id='add-process-type'/>
                                        </div>
                                        <div>
                                            <label>Coding</label>
                                            <input type="text" name="coding" className='form-control' placeholder='Enter coding...' id='add-coding'/>
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <textarea className='form-control' name='description' rows={5} placeholder='Enter description...' id='add-description'></textarea>
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
    
                    <form onSubmit={editProcessType}>
                        <div className="modal fade" id="editModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Process</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                        <div className='d-none'>
                                            <label>ID</label>
                                            <input type="text" name="id" id="edit-id" className="form-control" placeholder='Enter id...' />
                                        </div>
                                        <div>
                                            <label>Process Type</label>
                                            <input type="text" name="process_type" id='edit-process_type' className='form-control' placeholder='Enter process type...' />
                                        </div>
                                        <div>
                                            <label>Coding</label>
                                            <input type="text" name="coding" id='edit-coding' className='form-control' placeholder='Enter coding...' />
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <textarea className='form-control' name='description' id='edit-description' rows={5} placeholder='Enter description...'></textarea>
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
    
                    <form onSubmit={deleteProcessType}>
                        <div className="modal fade" id="deleteModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Process</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                        <div className='d-none'>
                                            <label>ID</label>
                                            <input type="text" name="id" id="delete-id" className="form-control" placeholder='Enter id...' />
                                        </div>
                                        <p>Are you sure you want to delete this data?</p>
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

export default windowProcesses