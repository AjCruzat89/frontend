import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../components'
import adminAuth from '../assets/js/adminAuth'
import adminUsers from '../assets/js/adminUsers'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net';
import 'datatables.net-bs5';
import $ from 'jquery';
import dtconfig from '../assets/js/dtconfig'

const users = () => {
    useEffect(() => { document.title = 'Admin | Users' }, [])
    const [user, setUser] = useState([]);
    const [datas, setDatas] = useState([]);
    const [windows, setWindows] = useState([]);
    adminAuth(setUser);
    const { createUser, editUser, deleteUser } = adminUsers(setDatas, setWindows);
    const [show, setShow] = useState(false);
    useEffect(() => { dtconfig(); }, [datas]);

    const editAttributes = (e) => {
        const btn = e.currentTarget;
        document.getElementById('edit-id').value = btn.getAttribute('data-id');
        document.getElementById('edit-username').value = btn.getAttribute('data-username');
        document.getElementById('edit-role').value = btn.getAttribute('data-role');
        document.getElementById('edit-window').value = btn.getAttribute('data-window');
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
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page"><a href="/admin">Admin</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Users</li>
                        </ol>
                        <button data-bs-toggle="modal" data-bs-target="#addModal" className='d-flex align-items-center gap-2 btn btn-primary'><i className="bi bi-plus-circle-fill"></i>ADD</button>
                        {datas.length > 0 ? (
                            <div className="card mt-3 p-3">
                                <div className="table-responsive">
                                    <table className='table table-bordered' id='example'>
                                        <thead>
                                            <tr>
                                                <th scope='row'>ID</th>
                                                <th scope='row'>USERNAME</th>
                                                <th scope='row'>ROLE</th>
                                                <th scope='row'>WINDOW</th>
                                                <th scope='row'>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas.map((data, index) => (
                                                <tr key={index}>
                                                    <td className='dt-type-numeric sorting_1'>{data.id}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.role}</td>
                                                    <td>{data.window}</td>
                                                    <td>
                                                        <div className='d-flex gap-2' id="actionMenu">
                                                            <i onClick={editAttributes} style={{ backgroundColor: 'var(--var-primary)' }} data-bs-toggle="modal" data-bs-target="#editModal" className="bi bi-pencil-square" data-id={data.id} data-username={data.username} data-role={data.role} data-window={data.window}></i>
                                                            <i onClick={deleteAttributes} className="bi bi-trash3-fill" style={{ backgroundColor: 'var(--var-danger)' }} data-bs-toggle="modal" data-bs-target="#deleteModal" data-id={data.id}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger mt-3 text-center">NO DATA</div>
                        )}
                    </nav>
                </div>

                <form onSubmit={createUser}>
                    <div className="modal fade" id="addModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <div>
                                        <label>Username</label>
                                        <input type="text" name="username" className="form-control" placeholder='Enter username...' />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type={show ? 'text' : 'password'} name="password" className="form-control" placeholder='Enter password...' />
                                    </div>
                                    <div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onClick={() => setShow(!show)} id="flexCheckDefault" />
                                            <label className="form-check-label">
                                                Show Password
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <select name="role" className='form-select'>
                                            <option value="guest">guest</option>
                                            <option value="staff">staff</option>
                                        </select>
                                    </div>
                                    {
                                        windows.length > 0 && (
                                            <div>
                                                <label>Window</label>
                                                <select className='form-select' name="window">
                                                    {
                                                        windows?.map((data, index) => (
                                                            <option key={index} value={data.window}>{data.window}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={editUser}>
                    <div className="modal fade" id="editModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit User</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <div className='d-none'>
                                        <label>ID</label>
                                        <input type="text" name="id" className="form-control" id="edit-id" />
                                    </div>
                                    <div>
                                        <label>Username</label>
                                        <input type="text" name="username" id="edit-username" className="form-control" placeholder='Enter username...' />
                                    </div>
                                    <div>
                                        <select name="role" className='form-select' id='edit-role'>
                                            <option value="guest">guest</option>
                                            <option value="staff">staff</option>
                                        </select>
                                    </div>
                                    {
                                        windows.length > 0 && (
                                            <div>
                                                <select className='form-select' name="window" id='edit-window'>
                                                    {
                                                        windows?.map((data, index) => (
                                                            <option key={index} value={data.window}>{data.window}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={deleteUser}>
                    <div className="modal fade" id="deleteModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete User</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center flex-column gap-3">
                                    <div className='d-none'>
                                        <label>ID</label>
                                        <input type="text" name="id" className="form-control" id="delete-id" />
                                    </div>
                                    <p>Are you sure you want to delete this user?</p>
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

export default users