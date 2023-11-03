import React from 'react';
import bank_logo from "../../Images/Home Page/bank_logo.png";

const Copyright = () => {
  return (
    <div>
        <div className='flex justify-center items-center bg-bluePallet-dark text-white'>
          <p>
            Copyright &copy; 2025 | www.esbi.co.in | ESBI | All Rights Reserved 
          </p>
          <img className='w-36' src={bank_logo} alt="" />
        </div>
    </div>
  )
}

export default Copyright
