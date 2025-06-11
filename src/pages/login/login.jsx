import React from 'react'
import { LoginForm, SideImg } from '../../components'
import { images } from '../../utils/customFn'

const Login = () => {
  return (
    <div className='blue-bg front_pages'>
      <div className='top_logo'>
          <img src={images['logo.png']} alt='logo'  className='outer-logo'/>
      </div>
      <div className='container'>
        <div className='two_flex_items'>
          <div className='left_content'>
            <SideImg />
          </div>
          <div className='right_content'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
