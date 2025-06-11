import React from 'react'
import DashboardHeader from '../dasboardheader'
import { CommonCards, SaleChart, TopProducts } from '../../components'
import './home.scss'
const Home = () => {

  const cardsData1 = [
    { title: 'Registered Users', price: '9,550', icon: 'users.svg', total: 'Total Registered users' },
    { title: 'App Installs', price: '20,000', icon: 'appinstall.svg', total: 'Users installed the app' },
    { title: 'App Shares', price: '25', icon: 'share.svg', total: 'Users shared the app' },
  ];
  const cardsData2 = [
    { title: 'Total Visitors', price: '5,571', icon: 'visitors.svg', total: ' Since yesterday', scale: 'up' },
    { title: 'Total Page Views', price: '5,571', icon: 'views.svg', total: 'Total 5', scale: 'down' },
    { title: 'Total Orders', price: '2,124', icon: 'power.svg', total: 'Total 5', scale: 'up' },
    { title: 'Total Sales', price: '5,571', icon: 'walletgreen.svg', total: 'Total 5', scale: 'up' },
    { title: 'Total Registered Users', price: '5,571', icon: 'userpurple.svg', total: 'Total 5', scale: 'up' },

  ];

  return (
    <div className='home-wrapped'>
      <DashboardHeader heading="Home" />
      <div className='main'>
        <div className='data-cards'>
          {cardsData1.map((card, index) => (
            <div key={index} className='card-rows row-1'>
              <CommonCards data={card} range={false} />
            </div>
          ))}
        </div>
        <div className='data-cards'>
          {cardsData2.map((card, index) => (
            <div key={index} className='card-rows row-2'>
              <CommonCards data={card} range={false} />
            </div>
          ))}
        </div>
        <div className='third-row'>
          <div className='chart-wrapped'>
            <SaleChart />
          </div>
          <div className='products-wrapped theme-card'>
            <TopProducts />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
