import React,{ useState, useEffect} from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getOffers } from '../shared/services/offer.service';

const MixedCharts = () => {

const [selected,setSelected]=useState(0);
const [notSelected,setNotSelected]=useState(0);


const selectedCount=()=>{
  
}

  const doughnutData = {
    labels: ['Selected Offers', 'Not Selected Offers'],
    datasets: [
      {
        data: [20, 50],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const barData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Number of Offers Created',
        data: [, 19, 11, 14, 9, 13, 3], 
        backgroundColor: 'rgba(169, 169, 169, 0.7)',
        borderColor: 'rgba(255, 01, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartStyle = {
    width: '400px',
    height: '300px',
    marginRight: '50px',
    marginLeft: '50px',
  };

  return (
    <div className="d-flex justify-content-between">
      <div style={chartStyle}>
        <Doughnut data={doughnutData} options={options} />
      </div>
      <div style={chartStyle}>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default MixedCharts;
