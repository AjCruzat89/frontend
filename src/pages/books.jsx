import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { DashboardNavbar, DashboardSidebar } from '../components';
import '../assets/css/dashboard.css';
import adminAuth from '../assets/js/adminAuth';
import { Spinner } from '../components';
import '../assets/css/books.css';
import Swal from 'sweetalert2';

const Books = () => {
    useEffect(() => {
        document.title = 'Books';
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const loader = document.querySelector('.spinnerContainer');
            loader.style.display = 'none';
        }, 1000);
    }, []);

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

    const { user, fetchUser } = adminAuth();
    /* <!--===============================================================================================--> */
    const [preview, setPreview] = useState('');
    const addSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('book_name', event.target.book_name.value);
        formData.append('book_genre', event.target.book_genre.value);
        formData.append('book_description', event.target.book_description.value);
        formData.append('book_cover', event.target.book_cover.files[0]);

        axios
            .post('http://127.0.0.1:8000/api/addBook', formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Addition of Book is Successful!',
                    showConfirmButton: false,
                });
                $('#addModal').modal('hide');
                setTimeout(() => {
                    Swal.close();
                }, 1000);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                });
                setTimeout(() => {
                    Swal.close();
                }, 2000);
            });
    };
    /* <!--===============================================================================================--> */
    return (
        <div>
            <div className="d-flex flex-row w-100">
                <Spinner></Spinner>
                <DashboardSidebar></DashboardSidebar>
                <div className="d-flex flex-grow-1 flex-column overflow-hidden">
                    <DashboardNavbar></DashboardNavbar>
                    <div className="content d-flex flex-column">
                        <h1 className="mb-3">Books</h1>
                        <div className="addButton d-flex mb-3">
                            <button data-bs-toggle="modal" data-bs-target="#addModal">
                                Add+
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table id="example" className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>book_id</th>
                                        <th>book_name</th>
                                        <th>book_cover</th>
                                        <th>book_genre</th>
                                        <th>book_description</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={addSubmit} encType="multipart/form-data">
                <div class="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                    Add a Book
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex flex-column">
                                <label className="mt-2" htmlFor="">
                                    Book_name
                                </label>
                                <input type="text" name="book_name" placeholder="Enter Book Name..." required />
                                <label className="mt-2" htmlFor="">
                                    Book_cover
                                </label>
                                <input type="file" name="book_cover" id="" onChange={(event) => setPreview(URL.createObjectURL(event.target.files[0]))} required />
                                {preview ? (<img className='mt-3' style={{ width: '350px', height: '350px', objectFit: 'cover' }} src={preview} alt="" />) : null}

                                <label className="mt-2" htmlFor="">
                                    Book_genre
                                </label>
                                <input type="text" name="book_genre" id="" placeholder="Enter Book Genre..." required />
                                <label className="mt-2" htmlFor="">
                                    Book_description
                                </label>
                                <textarea name="" id="" cols="30" rows="10" name="book_description" placeholder="Enter Book Description..." required></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Books;
