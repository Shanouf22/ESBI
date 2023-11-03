import React from 'react';
import { NavLink } from 'react-router-dom';
import requirements_illus from '../../Images/Loans Page/requirements_illus.png';
import home_icon from '../../Images/Loans Page/home_icon.png';
import education_icon from '../../Images/Loans Page/education_icon.png';
import car_icon from '../../Images/Loans Page/car_icon.png';

const Loans = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="m-10 w-full">
            <div className='font-bold text-center text-lg'>Loans We Provide</div>
            <div className='w-full flex justify-center '>
                <NavLink to="/homeloans"><div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-dark m-6 shadow-lg hover:bg-bluePallet-darker'>
                    <img className='w-32 ml-3' src={home_icon} alt="Home" />
                    <p className='w-2/3 text-center text-lg font-bold text-white'>Home Loans</p>
                    </div>
                </NavLink>
                <NavLink to="/educationloans"><div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-dark m-6 shadow-lg hover:bg-bluePallet-darker'>
                    <img className='w-32 ml-3' src={education_icon} alt="Education" />
                    <p className='w-2/3 text-center text-lg font-bold text-white'>Education Loans</p>
                    </div>
                </NavLink>
            </div>
            <div className='flex justify-center'>
                <NavLink to="/vehicleloans"><div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-dark m-6 shadow-lg hover:bg-bluePallet-darker'>
                    <img className='w-32 ml-3' src={car_icon} alt="Car" />
                    <p className='w-2/3 text-center text-lg font-bold text-white'>Vehicle Loans</p>
                    </div>
                </NavLink>
            </div>
        </div>
        <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
        <div className='flex justify-center items-center m-10'>
                <img className='w-1/3' src={requirements_illus} alt="Requirements" />
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>To Avail a Loan...</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        Securing a loan at ESBI Bank is a straightforward process, tailored to meet your financial requirements. First, assess your eligibility for the specific loan by ensuring you meet the criteria, such as income, credit score, and employment status. Once confirmed, complete the loan application, available both in our branches and online, and submit the necessary documentation, including proof of income and identification. Our diligent team then reviews your application, ensuring accuracy and completeness, and conducts a thorough credit assessment. Upon approval, ESBI Bank offers you a loan that aligns with your needs, providing you with the funds necessary to realize your financial goals. We prioritize a customer-centric approach, making the loan application process efficient and tailored to your unique circumstances.
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Loans
