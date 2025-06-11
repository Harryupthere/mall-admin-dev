import React from "react";
import './wallet.scss'
import DashboardHeader from "../dasboardheader";
import { images } from "../../utils/customFn";

const cardsData = [
    { title: 'Total Commisison', price: '4700 $ ', icon: 'wallet-icon.svg' },
    { title: 'Wallet Balance', price: '1000 $ ', icon: 'wallet-icon.svg' },
    { title: 'Total Withdrewn Amount', price: '36', icon: 'wallet-icon.svg' },
];



const Wallet = () => {
    return (
        <>
            <DashboardHeader heading="Affiliate Lounge" />
            <div className='main'>
                <div className="wallet-wrapped main-container">
                    <div className='commoncard-wrapped'>
                        {cardsData.map((card, index) => (
                            <div className='item' key={index}>
                                <div className='upperbody'>
                                    <div className='heading_text'>
                                        <h3 className='card_title'>{card.title}</h3>
                                        <h2 className='card_data'>{card.price}</h2>
                                    </div>
                                    <div className='card_icon'>
                                        <img src={images[`${card.icon}`]} alt='icon' />
                                    </div>
                                </div>

                            </div>
                        ))}
                        <div className='item special-card' >
                            <h3 className="card_heading">Partner Status</h3>
                            <h3 className="card_title">PLATINUM</h3>
                        </div>
                    </div>
                    <div className="request theme-card">
                        <h2 className="main-heading">Request Withdrawal</h2>
                        <div className="methods">
                            <button type="button" className="blue_border_btn">Bank Account</button>
                            <button type="button" className="blue_border_btn">Cryptocurrency</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Wallet;