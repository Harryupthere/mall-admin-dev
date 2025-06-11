import React from "react";
import './lounge.scss'
import { CommonCards } from "../../components";
import DashboardHeader from "../dasboardheader";

const cardsData = [
    { title: 'Total Income', price: '$250,000.00 ', icon: 'wallet-icon.svg' },
    { title: 'Inquiry Success Rate', price: '36.2%', icon: 'colored-graph.png' },
    { title: 'Number of New Clients', price: '36', icon: 'user-icon.svg' },
    { title: 'Number of Completed Projects', price: '29', icon: 'projects-icon.png' },
];

const levelcards = [
    {
        title: 'Total Downlines',
        level: 'level 1',
        price: '125'
    },
    {
        title: 'Total Downlines',
        level: 'level 2',
        price: '80'
    },
    {
        title: 'Total Downlines',
        level: 'level 3',
        price: '45'
    },
    {
        title: 'Total Commission',
        level: 'level 3',
        price: '$2,394.00'
    },
]
const tableData = [
    {
        level: 1,
        people: 5,
        sales: "10,000",
        commission: "12%",
        totalcommission: "12%"
    },
    {
        level: 2,
        people: 5,
        sales: "10,000",
        commission: "12%",
        totalcommission: "12%"
    },
    {
        level: 3,
        people: 5,
        sales: "10,000",
        commission: "12%",
        totalcommission: "12%"
    },
    {
        level: 'Total',
        people: 5,
        sales: "10,000",
        commission: "12%",
        totalcommission: "12%"
    },

    
]
const Lounge = () => {
    return (
        <>
            <DashboardHeader heading="Affiliate Lounge" />
            <div className='main'>
                <div className="lounge-wrapped main-container">
                    <div className="card-grid">
                        {cardsData.map((card, index) => (
                            <div key={index} className='card-box' >
                                <CommonCards data={card} />
                            </div>
                        ))}
                    </div>
                    <div className="two-grid">
                        <div className="four-grid-cards">
                            {levelcards.map((item, index) => (
                                <div className="card-purple" key={index}>
                                    <h3 className="title">{item.title}</h3>
                                    <h3 className="level">{item.level}</h3>
                                    <p className="price">{item.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className='top-product-table'>
                            {/* <div className='main_heading'>
                                <h2>Top Productss</h2>
                            </div> */}
                            <div className='data-table-wrapped'>
                                <div className='data-table-container'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Level</th>
                                                <th>Number of People</th>
                                                <th>Total Sales ($)</th>
                                                <th>Commission (%)</th>
                                                <th>Total Commission ($)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((item, index) => (
                                                <tr key={tableData}>
                                                    <td>{item.level}</td>
                                                    <td>{item.people}</td>
                                                    <td>{item.sales}</td>
                                                    <td>{item.commission}</td>
                                                    <td>{item.totalcommission}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Lounge;