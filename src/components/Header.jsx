import React from 'react'
import GU from '../assets/Gu.png'
import horizontal from '../assets/horizontal.png'

const Header = () => {
  return (
    <div className='container bg-success text-white p-3 mb-2 text-center rounded-bottom-5 sticky-top'>
      <div className="d-flex align-items-center justify-content-center flex-nowrap">
        <img
          src={GU}
          alt="Logo"
          style={{ width: 'auto', height: '60px', marginRight: '10px' }}
        />
        <img
          src={horizontal}
          alt="Logo"
          style={{ width: 'auto', height: '60px', marginRight: '10px' }}
        />
      </div>
    </div>
  )
}

export default Header
