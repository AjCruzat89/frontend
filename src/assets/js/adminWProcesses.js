import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from 'react-router-dom';

const adminWProcesses = (setDatas) => {

  const { wname } = useParams();
  
  const getProcessTypes = () => {
    axios.get(`http://${import.meta.env.VITE_IPV4}:3000/admin/get-process-types/${wname}`, { headers: authHeaders })
    .then(res => {
      setDatas(res.data.processTypes)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => { getProcessTypes() },[wname]); 

  const createProcessType = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/create-process-type`, formData, { headers: authHeaders })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Added Successfully!',
          toast: true,
          position: 'bottom-left',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        getProcessTypes();
        const modal = document.getElementById('addModal');
        const myModal = Modal.getOrCreateInstance(modal);
        myModal.hide();
      })
      .catch(err => {
        const errorMessage = Array.isArray(err.response.data.error)
          ? err.response.data.error[0]
          : err.response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 1000,
          text: errorMessage,
          showConfirmButton: false,
          showCancelButton: false,
          position: 'center',
        })
      })
  }

  const editProcessType = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/edit-process-type`, formData, { headers: authHeaders })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully!',
          toast: true,
          position: 'bottom-left',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        getProcessTypes();
        const modal = document.getElementById('editModal');
        const myModal = Modal.getOrCreateInstance(modal);
        myModal.hide();
      })
      .catch(err => {
        const errorMessage = Array.isArray(err.response.data.error)
          ? err.response.data.error[0]
          : err.response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 1000,
          text: errorMessage,
          showConfirmButton: false,
          showCancelButton: false,
          position: 'center',
        })
      })
  }

  const deleteProcessType = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://${import.meta.env.VITE_IPV4}:3000/admin/delete-process-type`, formData, { headers: authHeaders })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully!',
          toast: true,
          position: 'bottom-left',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        getProcessTypes();
        const modal = document.getElementById('deleteModal');
        const myModal = Modal.getOrCreateInstance(modal);
        myModal.hide();
      })
      .catch(err => {
        const errorMessage = Array.isArray(err.response.data.error)
          ? err.response.data.error[0]
          : err.response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 1000,
          text: errorMessage,
          showConfirmButton: false,
          showCancelButton: false,
          position: 'center',
        })
      })
  }

  return { createProcessType, editProcessType, deleteProcessType }
}

export default adminWProcesses