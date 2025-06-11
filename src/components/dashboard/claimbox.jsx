import React from 'react'

const Claimbox = () => {
    return (
        <div className="theme-card ">
            <div className="card-title p-0">
                <h3><strong>Claim Cash Reward</strong></h3>
            </div>
            <div className="claim-box">
                <div className="item">
                    <h3>25$</h3>
                    <div className="info">
                        <p>Required : 5</p>
                        <p>Current :5 </p>
                    </div>
                    <button type="button" className="purple-btn">Claim</button>
                </div>
                <div className="item">
                    <h3>50$</h3>
                    <div className="info">
                        <p>Required : 10</p>
                        <p>Current :5 </p>
                    </div>
                    <button type="button" className="purple-btn" disabled>Claim</button>
                </div>
                <div className="item">
                    <h3>150$</h3>
                    <div className="info">
                        <p>Required : 30</p>
                        <p>Current :3</p>
                    </div>
                    <button type="button" className="purple-btn" disabled>Claim</button>
                </div>
                <div className="item">
                    <h3>25$</h3>
                    <div className="info">
                        <p>Required : 100</p>
                        <p>Current :3</p>
                    </div>
                    <button type="button" className="purple-btn" disabled>Claim</button>
                </div>
            </div>
        </div>
    )
}

export default Claimbox