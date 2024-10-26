import React, { useEffect } from 'react'
import axios from 'axios'
import { authHeaders } from './headers'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'

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

    useEffect(() => {
      const socket = io(`http://${import.meta.env.VITE_IPV4}:3000`, {
          reconnection: true,
      });

      socket.on('connect', () => {
          console.log('Connected to WebSocket server');
      });

      socket.on('refreshQueue', async () => {
          await Promise.all([
            getTransactions()
          ]);
      });

      socket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
      });

      return () => {
          socket.off('refreshQueue');
          socket.disconnect();
      };
  }, []);

}

export default adminAxios