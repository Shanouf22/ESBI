import React from 'react';
import banner from '../../Images/Home Page/banner.png';
import token_icon from '../../Images/Home Page/token_icon.png';
import about_us_illus from '../../Images/Home Page/about_us_illus.png';
import features_illus from '../../Images/Home Page/features_illus.png';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <header className='flex items-center bg-bluePallet-light'>
            <div className='flex flex-col justify-center items-center p-10 mx-[230px]'>
                <p className='font-eagle-lake text-5xl'>ES Bank of India</p>
                <p className='text-3xl'>Redefining Online Banking</p>
                <p className='h-10'></p>
                <p className='hover:text-bluePallet-dark'>
                    <NavLink className='flex items-center' to='/about'>
                        <span className='text-2xl'>
                            Introducing Our Newest Feature - <span>ES Tokens</span> 
                        </span>
                        <img className='w-12 mx-4 rounded' src={token_icon} alt="ES Token" />
                    </NavLink>
                </p>
            </div>
            <img className='w-1/4' src={banner} alt="Banner" />
        </header>
        <div className='flex flex-col'>
            <div className='flex justify-center items-center m-10'>
                <img className='w-1/3' src={about_us_illus} alt="About" />
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>About Us</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        Welcome to ESBI Bank of India, a trusted name in banking. With a commitment to integrity and innovation, we offer a diverse range of financial services to meet your unique needs. Our experienced team is here to guide you on your financial journey, and our dedication extends to supporting local communities. Join us for a brighter financial future with ESBI Bank!
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center m-10'>
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>Connect with US</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        At ESBI Bank of India, we value your connection with us. Visit our branches for in-person assistance, use our website's contact form or email for online inquiries, call our helpline for direct support, and follow us on social media for updates. We're dedicated to being accessible and responsive to your banking needs. Thank you for choosing ESBI Bank of India as your trusted financial partner.
                    </div>
                </div>
                <img className='w-1/3' src={features_illus} alt="Features" />
            </div>
        </div>
    </div>
  )
}

export default Home
