import React from 'react'
import { images } from '../../../utils/customFn'
import './commoncards.scss'
import { DownScaleIcon, UpscaleIcon } from '../../../icons/icons'
const CommonCards = ({ data, range = false }) => {
    return (
        <div className='commoncard-wrapped'>
            <div className='item'>
                <div className='upperbody'>
                    <div className='heading_text'>
                        <h3 className='card_title'>{data.title}</h3>
                        <h2 className='card_data'>{data.price}</h2>
                    </div>
                    <div className='card_icon'>
                        <img src={images[`${data.icon}`]} alt='icon' />
                    </div>
                </div>
                <div className='lowebody'>
                    {data?.scale &&
                        <div className={`${data?.scale === 'down' ? 'down' : 'up'} rang`} data-range={range}>
                            {data?.scale === "down" ? <DownScaleIcon /> : <UpscaleIcon />}
                            <span>8.5%</span>
                        </div>
                    }
                    <span className='about-data'>{data.total}</span>
                </div>
            </div>
        </div>
    )
}

export default CommonCards;
