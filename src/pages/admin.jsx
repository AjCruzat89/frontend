import React, { useEffect, useState } from 'react'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { AdminNavbar } from '../components';
import adminAuth from '../assets/js/adminAuth';
import adminAxios from '../assets/js/adminAxios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Admin = () => {
  useEffect(() => { document.title = 'Admin'; }, []);
  
  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [timeFrame, setTimeFrame] = useState('daily');
  adminAuth(setUser);
  adminAxios(setTransactions);

  const getColorByTimeFrame = (timeFrame) => {
    switch (timeFrame) {
      case 'daily':
        return 'rgba(255, 99, 132, 0.6)';
      case 'weekly':
        return 'rgba(54, 162, 235, 0.6)';
      case 'monthly':
        return 'rgba(75, 192, 192, 0.6)';
      case 'yearly':
        return 'rgba(255, 206, 86, 0.6)';
      default:
        return 'rgba(75, 192, 192, 0.6)'; 
    }
  };

  const calculateAmounts = (timeFrame) => {
    const amounts = {};

    transactions.forEach(({ createdAt, amount }) => {
      const date = new Date(createdAt);
      const parsedAmount = parseFloat(amount);
      let key;

      switch (timeFrame) {
        case 'daily':
          key = date.toDateString();
          break;
        case 'weekly':
          key = `${date.getFullYear()}-W${date.getWeek()}`;
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case 'yearly':
          key = date.getFullYear();
          break;
        default:
          break;
      }
      
      amounts[key] = (amounts[key] || 0) + parsedAmount;
    });

    return amounts;
  };

  Date.prototype.getWeek = function() {
    const firstDateOfYear = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - firstDateOfYear) / (24 * 60 * 60 * 1000) + firstDateOfYear.getDay() + 1) / 7);
  };

  const amounts = calculateAmounts(timeFrame);

  const data = {
    labels: Object.keys(amounts),
    datasets: [{
      label: 'Transaction Amounts',
      data: Object.values(amounts),
      backgroundColor: getColorByTimeFrame(timeFrame),
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: ({ dataset, raw }) => `${dataset.label}: ₱${raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <>
      <AdminNavbar role={user.role} />
      <div className="right right-active" id='container-box'>
        <div className="container py-3">
          <div className="card p-3">
            <select className='form-select' onChange={(e) => setTimeFrame(e.target.value)} value={timeFrame}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <Bar className='mt-4' data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
