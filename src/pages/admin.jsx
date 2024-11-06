import React, { useEffect, useState } from 'react';
import { AdminNavbar } from '../components';
import adminAuth from '../assets/js/adminAuth';
import adminAxios from '../assets/js/adminAxios';
import dtconfig from '../assets/js/dtconfig'
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const Admin = () => {
  useEffect(() => { document.title = 'Admin'; }, []);

  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [option, setOption] = useState('daily');

  adminAuth(setUser);
  adminAxios(setTransactions, setDaily, setWeekly, setMonthly, setYearly);

  const dailyData = {
    labels: daily.map(data => new Date(data.date).toLocaleString('en-PH', { 
      timeZone: 'Asia/Manila', 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit', 
    })),
    datasets: [
      {
        label: 'Daily',
        data: daily.map(data => data.daily_total),
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
        borderWidth: 1,
        pointRadius: 4,
      }
    ]
  };

  const weeklyData = {
    labels: weekly.map(data => {
      const week = data.week === 0 ? 'Last Week' : data.week;  
      const year = data.week === 0 ? data.year - 1 : data.year;  
      return `${data.week > 0 ? 'Week': ''} ${String(week)}, ${year}`;
    }),
    datasets: [
      {
        label: 'Weekly',
        data: weekly.map(data => data.weekly_total),
        backgroundColor: '#5BBF78',
        borderColor: '#5BBF78',
        borderWidth: 1,
        pointRadius: 4,
      }
    ]
  };

  const monthlyData = {
    labels: monthly.map(data => new Date(`${data.year}-${data.month}-01`).toLocaleString('en-PH', { 
      timeZone: 'Asia/Manila', 
      year: 'numeric', 
      month: 'short' 
    })),
    datasets: [
      {
        label: 'Monthly',
        data: monthly.map(data => data.monthly_total),
        backgroundColor: '#F5A623', 
        borderColor: '#F5A623',
        borderWidth: 1,
        pointRadius: 4,
      }
    ]
  }

  const yearlyData = {
    labels: yearly.map(data => data.year),
    datasets: [
      {
        label: 'Yearly',
        data: yearly.map(data => data.yearly_total),
        backgroundColor: '#9013FE',
        borderColor: '#9013FE',
        borderWidth: 1,
        pointRadius: 4,
      }
    ]
  }

  useEffect(() => {
    dtconfig();
  }, [transactions]);

  return (
    <>
      <AdminNavbar role={user.role} />
      <div className="right right-active" id='container-box'>
        <div className="container py-3">
          <div className="card p-3">
            <div className='d-flex gap-3 flex-column'>
              <select className='form-select' onChange={(e) => setOption(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className='card p-3 p-md-4'>
                { option === 'daily' && <LineChart chartData={dailyData} /> }
                { option === 'weekly' && <LineChart chartData={weeklyData} /> }
                { option === 'monthly' && <LineChart chartData={monthlyData} /> }
                { option === 'yearly' && <LineChart chartData={yearlyData} /> }
              </div>
            </div>
            {
              transactions.length > 0 && (
                <div className='card p-3 mt-3'>
                  <div className="table table-responsive">
                    <table id='example' className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope='col'>TRANSACTION_ID</th>
                          <th scope='col'>AMOUNT</th>
                          <th scope='col'>DESCRIPTION</th>
                          <th scope='col'>CREATED_AT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          transactions?.map((data, index) => (
                            <tr key={index}>
                              <td className='dt-type-numeric sorting_1'>{data.transaction_id}</td>
                              <td className='dt-type-numeric'>{data.amount}</td>
                              <td>{data.description}</td>
                              <td>{new Date(data.createdAt).toLocaleString('en-PH', { timeZone: 'Asia/Manila', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
