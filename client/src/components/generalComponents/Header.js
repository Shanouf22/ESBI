import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import bank_logo from "../../Images/Home Page/bank_logo.png";
import login_register_icon from "../../Images/Home Page/login_register_icon.png";

const Header = () => {
  const location = useLocation();
  const isButtonActive = (path) => {
    return location.pathname === path ? ' bg-bluePallet-dark' : '';
  };
  const isButtonActive2 = (path) => {
    return location.pathname === path ? ' underline' : '';
  };
  return (
    <div>
        <nav className='flex bg-bluePallet'>
            <img className='w-1/7 mx-4' src={bank_logo} alt="ESBI Logo" />
            <ul className='flex justify-center items-center ml-48 text-white text-lg'>
                <NavLink to="/"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/')}>Home</li></NavLink>
                <NavLink to="/about"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/about')}>About ES Tokens</li></NavLink>
                <NavLink to="/loans"><li className={'px-7 bg-bluePallet h-[4.4rem] flex items-center hover:bg-bluePallet-dark'+isButtonActive('/loans')}>Loans</li></NavLink>
            </ul>
            <ul className='flex justify-center items-center absolute right-10'>
                <li className='h-[4.4rem] flex items-center'><img className='w-8 h-8' src={login_register_icon} alt="Login Icon" /></li>
                <li className={'h-[4.4rem] flex items-center text-lg hover:underline font-bold'+isButtonActive2('/login')}><NavLink to="/login">Login/Register</NavLink></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header
