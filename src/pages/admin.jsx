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

  adminAuth(setUser);
  adminAxios(setTransactions);

  const getColorByTimeFrame = (timeFrame) => {
    const colors = {
      daily: 'rgba(255, 99, 132, 0.6)',
      weekly: 'rgba(54, 162, 235, 0.6)',
      monthly: 'rgba(75, 192, 192, 0.6)',
      yearly: 'rgba(255, 206, 86, 0.6)',
    };
    return colors[timeFrame] || 'rgba(75, 192, 192, 0.6)';
  };

  const calculateDailyAmounts = () => {
    const amounts = {};
    transactions.forEach(({ createdAt, amount }) => {
      const date = new Date(createdAt).toDateString();
      amounts[date] = (amounts[date] || 0) + parseFloat(amount);
    });
    return amounts;
  };

  const calculateWeeklyAmounts = () => {
    const amounts = {};
    transactions.forEach(({ createdAt, amount }) => {
      const date = new Date(createdAt);
      const weekKey = `${date.getFullYear()}-W${date.getWeek()}`;
      amounts[weekKey] = (amounts[weekKey] || 0) + parseFloat(amount);
    });
    return amounts;
  };

  const calculateMonthlyAmounts = () => {
    const amounts = {};
    transactions.forEach(({ createdAt, amount }) => {
      const date = new Date(createdAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      amounts[monthKey] = (amounts[monthKey] || 0) + parseFloat(amount);
    });
    return amounts;
  };

  const calculateYearlyAmounts = () => {
    const amounts = {};
    transactions.forEach(({ createdAt, amount }) => {
      const yearKey = new Date(createdAt).getFullYear();
      amounts[yearKey] = (amounts[yearKey] || 0) + parseFloat(amount);
    });
    return amounts;
  };

  Date.prototype.getWeek = function () {
    const firstDateOfYear = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - firstDateOfYear) / (24 * 60 * 60 * 1000) + firstDateOfYear.getDay() + 1) / 7);
  };

  const dailyAmounts = calculateDailyAmounts();
  const weeklyAmounts = calculateWeeklyAmounts();
  const monthlyAmounts = calculateMonthlyAmounts();
  const yearlyAmounts = calculateYearlyAmounts();

  const createChartData = (amounts, label) => ({
    labels: Object.keys(amounts),
    datasets: [{
      label,
      data: Object.values(amounts),
      backgroundColor: getColorByTimeFrame(label.toLowerCase()),
    }],
  });

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
            {Object.keys(dailyAmounts).length > 0 ? (
              <>
                <div className='alert alert-danger'>Daily Transactions</div>
                <Bar className='mt-4' data={createChartData(dailyAmounts, 'Daily')} options={options} />
              </>
            ) : (
              <div className="alert alert-danger">No daily transactions found</div>
            )}
            {Object.keys(weeklyAmounts).length > 0 ? (
              <>
                <div className='alert alert-primary mt-3'>Weekly Transactions</div>
                <Bar className='mt-4' data={createChartData(weeklyAmounts, 'Weekly')} options={options} />
              </>
            ) : (
              <div className="alert alert-danger">No weekly transactions found</div>
            )}
            {Object.keys(monthlyAmounts).length > 0 ? (
              <>
                <div className='alert alert-info mt-3'>Monthly Transactions</div>
                <Bar className='mt-4' data={createChartData(monthlyAmounts, 'Monthly')} options={options} />
              </>
            ) : (
              <div className="alert alert-danger">No monthly transactions found</div>
            )}
            {Object.keys(yearlyAmounts).length > 0 ? (
              <>
                <div className='alert alert-warning mt-3'>Yearly Transactions</div>
                <Bar className='mt-4' data={createChartData(yearlyAmounts, 'Yearly')} options={options} />
              </>
            ) : (
              <div className="alert alert-danger">No yearly transactions found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
