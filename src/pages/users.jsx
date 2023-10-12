import React, { useEffect, useState } from 'react';
import { DashboardNavbar, DashboardSidebar } from '../components';
import '../assets/css/dashboard.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import adminAuth from '../assets/js/adminAuth';
import { Spinner } from '../components';

const Users = () => {

    /* <!--===============================================================================================--> */
    const [users, setUsers] = useState([]);
    useEffect(() => {
        document.title = 'Users';
    })

    const { user, fetchUser } = adminAuth();

    useEffect(() => {
        setTimeout(() => {
            const loader = document.querySelector('.spinnerContainer');
            loader.style.display = 'none';
        }, 1000);
    }, [])
    /* <!--===============================================================================================--> */
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/getUsers')
            .then((response) => {
                setUsers(response.data);

            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    showCancelButton: false,
                });
            });
    }, [])

    const reloadUsersData = () => {
        axios
            .get('http://127.0.0.1:8000/api/getUsers')
            .then((response) => {
                setUsers(response.data);

            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    showCancelButton: false,
                });
            });
    }

    useEffect(() => {
        setTimeout(() => {
            $(document).ready(function () {
                var table = $('#example').DataTable({
                    lengthChange: true,
                    buttons: ['copy', 'excel', 'print', 'colvis'],
                    destroy: true,
                });

                table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');
            });
        }, 1000);
    }, []);
    /* <!--===============================================================================================--> */
    const [deleteModalData, setDeleteModalData] = useState({
        modalID: '',
    })

    const handleDeleteClick = (user) => {
        setDeleteModalData({
            modalID: user.id,
        })
    }

    const [editModalData, setEditModalData] = useState({
        modalID: '',
        modalUsername: '',
        modalPassword: '',
    });

    const handleEditClick = (user) => {
        setEditModalData({
            modalID: user.id,
            modalUsername: user.username,
            modalPassword: user.password,
        });
    };

    const emptyUsername = () => {
        setEditModalData({
            modalUsername: ''
        })
    }

    const emptyPassword = () => {
        setEditModalData({
            modalPassword: ''
        })
    }

    /* <!--===============================================================================================--> */
    const editSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('id', event.target.id.value);
        formData.append('username', event.target.username.value);
        formData.append('password', event.target.password.value);

        axios.post('http://127.0.0.1:8000/api/updateUser', formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showCancelButton: false,
                    showConfirmButton: false
                })
                reloadUsersData();
                $('#editModal').modal('hide');
                setTimeout(() => {
                    Swal.close();
                }, 1000);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false
                })
                setTimeout(() => {
                    Swal.close()
                }, 2000);
            })
    }
    /* <!--===============================================================================================--> */
    const deleteSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('id', event.target.id.value);

        axios.post('http://127.0.0.1:8000/api/deleteUser', formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Successful!',
                    showCancelButton: false,
                    showConfirmButton: false
                })
                reloadUsersData();
                $('#deleteModal').modal('hide');
                setTimeout(() => {
                    Swal.close()
                }, 1000);
            })

            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    showConfirmButton: false
                })
                setTimeout(() => {
                    Swal.close()
                }, 2000);
            })
    }
    /* <!--===============================================================================================--> */
    return (
        <div>
            <div className="d-flex flex-row w-100">
                <Spinner></Spinner>
                <DashboardSidebar></DashboardSidebar>
                <div className="d-flex flex-grow-1 flex-column overflow-hidden">
                    <DashboardNavbar></DashboardNavbar>
                    <div className="content d-flex flex-column">
                        <h1 className='mb-3'>Users</h1>
                        <div className="table-responsive">
                            <table id="example" className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{window.innerWidth < 768 ? user.password.substring(0, 8) + '.....' : user.password + '.....'}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <i class="fa-solid fa-gear" onClick={() => handleEditClick(user)} data-bs-toggle="modal" data-bs-target="#editModal"></i>
                                                    <i class="fa-solid fa-trash" onClick={() => handleDeleteClick(user)} data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <form onSubmit={editSubmit}>
                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body d-flex flex-column">
                                    <label htmlFor="">ID</label>
                                    <input type="text" name="id" id="modalID" value={editModalData.modalID} readOnly />
                                    <label className='mt-2' htmlFor="">Username</label>
                                    <input type="text" name="username" id="modalUsername" value={editModalData.modalUsername} onChange={(e) => setEditModalData({ ...editModalData, modalUsername: e.target.value })} onClick={emptyUsername} />
                                    <label className='mt-2' htmlFor="">Password</label>
                                    <input type="password" name="password" id="modalPassword" value={editModalData.modalPassword} onChange={(e) => setEditModalData({ ...editModalData, modalPassword: e.target.value })} onClick={emptyPassword} />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={deleteSubmit}>
                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete User</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input className='d-none' type="text" name="id" id="" value={deleteModalData.modalID} />
                                    <h2>Are you sure you want to delete this user?</h2>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Users;
