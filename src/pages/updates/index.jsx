import React from 'react'
import DashboardHeader from '../dasboardheader'
import './updates.scss'
const Updates = () => {
    return (
        <div className='update-wraped'>
            <DashboardHeader heading="News and Updates" />
            <div className='main'>
                <div className='update-box'>
                    <div className='card_header'>
                        <h2>New Update</h2>
                        <p>April 24, 2024</p>
                    </div>
                    <div className='card_body'>
                        <h3>New Release</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Laboriosam dolorem odit odio, amet repellat dicta eius laborum corporis beatae alias nam ea consequatur possimus.
                            Nam mollitia dolorem quia aspernatur commodi.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Laboriosam dolorem odit odio, amet repellat dicta eius laborum corporis beatae alias nam ea consequatur possimus.
                            Nam mollitia dolorem quia aspernatur commodi.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Updates