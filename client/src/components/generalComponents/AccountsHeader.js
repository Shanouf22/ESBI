import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import accounts_icon from '../../Images/Account Home Page/accounts_icon.png';
import logout_icon from '../../Images/Account Home Page/logout_icon.png';

const AccountsHeader = () => {

  const location = useLocation();
  const isButtonActive = (path) => {
    return location.pathname === path ? ' bg-bluePallet-dark' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  }

  return (
    <div>
        <nav className='flex items-center bg-bluePallet'>
            <img className='w-16 h-[60px] ml-[2rem]' src={accounts_icon} alt="Account Icon" />
            <ul className='flex justify-center items-center ml-48 text-white text-lg'>
                <NavLink to="/accountshome"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/accountshome')}>Accounts Home</li></NavLink>
                <NavLink to="/ministatement"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/ministatement')}>Mini Statement</li></NavLink>
                <NavLink to="/transfercredit"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/transfercredit')}>Transfer Credit</li></NavLink>
                <NavLink to="/manageloans"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/manageloans')}>Manage Loans</li></NavLink>
                <NavLink to="/paymentplan"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/paymentplan')}>Payment Plan</li></NavLink>
            </ul>
            <ul className='flex justify-center items-center absolute right-10'>
                <li className='h-[4.4rem] flex items-center'><img className='w-8 h-8' src={logout_icon} alt="Logout Icon" /></li>
                <li className='h-[4.4rem] flex items-center text-lg hover:underline font-bold' onClick={handleLogout}><NavLink to="/">Logout</NavLink></li>
            </ul>
        </nav>
    </div>
  )
}

export default AccountsHeader
