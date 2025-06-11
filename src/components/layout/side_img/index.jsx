import React from 'react'
import { images } from '../../../utils/customFn'

const SideImg = () => {
  return (
    <div className='left_vector'>
      <img src={images['sideimg.png']} alt='login-img' className='side-img-upside'/>
    </div>
  )
}

export default SideImg
