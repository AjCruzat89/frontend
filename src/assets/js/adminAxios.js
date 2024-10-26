import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const adminAxios = (setTransactions) => {
  
    const getTransactions = () => {
      axios.get(`http://${import.meta.env.VITE_IPV4}:3000/admin/get-transactions`, { headers: authHeaders })
        .then(res => {
          setTransactions(res.data.results)
          console.table(res.data.results)
        })
        .catch(err => {
          console.log(err)
        })
    }

    useEffect(() => {
      getTransactions()
    }, [])

}

export default adminAxios