import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import home_page_icon from '../../Images/Home Page/home_page_icon.png';
import about_icon from '../../Images/Home Page/about_icon.png';
import loan_icon from '../../Images/Home Page/loan_icon.png';
import login_register_icon from '../../Images/Home Page/login_register_icon.png';
import home_icon from '../../Images/Home Page/home_icon.png';
import education_icon from '../../Images/Home Page/education_icon.png';
import car_icon from '../../Images/Home Page/car_icon.png';
import linkedin_icon from '../../Images/Home Page/linkedin_icon.png';
import instagram_icon from '../../Images/Home Page/instagram_icon.png';
import youtube_icon from '../../Images/Home Page/youtube_icon.png';
import facebook_icon from '../../Images/Home Page/facebook_icon.png';

const Footer = () => {
  const location = useLocation();
  const isButtonActive = (path) => {
    return location.pathname === path ? ' underline' : '';
  };
  return (
    <div>
      <footer className='text-white'>
        <div className='text-center text-lg py-2 bg-bluePallet'>
          Quick Links
        </div>
        <div className='flex justify-center items-center py-7 bg-bluePallet'>
          <ul className='w-1/3 p-2'>
            <ul className='ml-[70px]'>
              <li><NavLink to="/">
                <ul className={'flex items-center hover:underline'+isButtonActive('/')}>
                  <li><img className='w-5 h-5' src={home_page_icon} alt="" /></li>
                  <li className='ml-1'>Home</li>
                </ul>
                </NavLink></li>
              <li><NavLink to="/about">
                <ul className={'flex items-center hover:underline'+isButtonActive('/about')}>
                  <li><img className='w-5 h-5' src={about_icon} alt="" /></li>
                  <li className='ml-1'>About ES Tokens</li>
                </ul>
                </NavLink></li>
              <li><NavLink to="/loans">
                <ul className={'flex items-center hover:underline'+isButtonActive('/loans')}>
                  <li><img className='w-5 h-5' src={loan_icon} alt="" /></li>
                  <li className='ml-1'>Loans</li>
                </ul>
                </NavLink></li>
              <li><NavLink to="/login">
                <ul className={'flex items-center hover:underline'+isButtonActive('/login')}>
                  <li><img className='w-5 h-5' src={login_register_icon} alt="" /></li>
                  <li className='ml-1'>Login/Register</li>
                </ul>
                </NavLink></li>
            </ul>
          </ul>
          <div className='w-1 h-28 bg-bluePallet-dark'>
          </div>
          <ul className='w-1/3 p-2'>
            <ul className='ml-[180px]'>
              <li><NavLink to="/homeloans">
                <ul className={'flex items-center hover:underline'+isButtonActive('/homeloans')}>
                  <li><img className='w-5 h-5' src={home_icon} alt="" /></li>
                  <li className='ml-1'>Home Loans</li>
                </ul>
                </NavLink></li>
              <li><NavLink to="/educationloans">
              <ul className={'flex items-center hover:underline'+isButtonActive('/educationloans')}>
                <li><img className='w-5 h-5' src={education_icon} alt="" /></li>
                <li className='ml-1'>Education Loans</li>
                </ul>
              </NavLink></li>
              <li><NavLink to="/vehicleloans">
              <ul className={'flex items-center hover:underline'+isButtonActive('/vehicleloans')}>
                <li><img className='w-5 h-5' src={car_icon} alt="" /></li>
                <li className='ml-1'>Vehicle Loans</li>
                </ul>
                </NavLink></li>
            </ul>
          </ul>
          <div className='w-1 h-28 bg-bluePallet-dark'>
          </div>
          <ul className='w-1/3 p-2'>
            <ul className='ml-[315px]'>
              <li><a href="https://www.linkedin.com/" target='_blank' rel="noreferrer">
                <ul className='flex items-center hover:underline'>
                  <li><img className='w-5 h-5' src={linkedin_icon} alt="" /></li>
                  <li className='ml-1'>Linked In</li>
                </ul>
                </a></li>
              <li><a href="https://www.instagram.com/" target='_blank' rel="noreferrer" >
                <ul className='flex items-center hover:underline'>
                  <li><img className='w-5 h-5' src={instagram_icon} alt="" /></li>
                  <li className='ml-1'>Instagram</li>
                </ul>
                </a></li>
              <li><a href="https://www.youtube.com/" target='_blank' rel="noreferrer" >
                <ul className='flex items-center hover:underline'>
                  <li><img className='w-5 h-5' src={youtube_icon} alt="" /></li>
                  <li className='ml-1'>Youtube</li>
                </ul>
                </a></li>
              <li><a href="https://www.facebook.com/" target='_blank' rel="noreferrer" >
                <ul className='flex items-center hover:underline'>
                  <li><img className='w-5 h-5' src={facebook_icon} alt="" /></li>
                  <li className='ml-1'>Facebook</li>
                </ul>
                </a></li>
            </ul>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
