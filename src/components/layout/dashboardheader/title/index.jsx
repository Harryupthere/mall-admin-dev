import React from 'react'

const DahboardHeader = ({heading}) => {
  return (
    <div className='dashboard-header-tittle'>
        <div className='main_heading'>
          <h2>{heading}</h2>
        </div>
    </div>
  )
}
export default DahboardHeader
