import React from "react";
import './dashboard.scss'
import { AccountPie, AccountSizeChart, Claimbox, CommonCards, PieChart, RevenueChart } from "../../components";
import DashboardHeader from "../dasboardheader";

const cardsData = [
    { title: 'Total Users', price: '$250,000', icon: 'walletgreen.svg' },
    { title: 'Total Active Users', price: '5,571', icon: 'power.svg' },
    { title: 'Total AmountIn system', price: '36', icon: 'visitors.svg' },
    { title: 'Total Game Users', price: '29', icon: 'visitors.svg' },
];

const Dashboard = () => {
    return (
        <>
            <DashboardHeader heading="Dashboard" />
            <div className='main'>
                <div className="dashboard-wrapped main-container">
                    <div className="card-grid">
                        {cardsData.map((card, index) => (
                            <div key={index} className='card-box' >
                                <CommonCards data={card} />
                            </div>
                        ))}
                    </div>
                    <div className="graph-row mb-4">
                        <div className="left-side">
                            <div className="theme-card p-0">
                                <div className="card-title">
                                    <h3>Revenue Per Month</h3>
                                </div>
                                <RevenueChart />
                            </div>
                        </div>
                        <div className="right-side">
                            <Claimbox />
                        </div>
                    </div>
                    <div className="graph-row-3" >
                        <div className="box-row">
                            <div className="box1">
                                <div className="theme-card p-0">
                                    <div className="card-title">
                                        <h3>Partner Summary</h3>
                                    </div>
                                        <PieChart />
                                </div>
                            </div>
                            <div className="box2">
                                <div className="theme-card p-0">
                                    <div className="card-title">
                                        <h3>Revenue By Acc Size</h3>
                                    </div>
                                    <AccountPie />
                                </div>
                            </div>
                        </div>
                        <div className="box3">
                            <div className="theme-card p-0">
                                <div className="card-title">
                                    <h3>Revenue Per Month</h3>
                                </div>
                                <AccountSizeChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;