import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import home_icon from '../../Images/Loans Page/home_icon.png';
import education_icon from '../../Images/Loans Page/education_icon.png';
import car_icon from '../../Images/Loans Page/car_icon.png';

const ActiveLoans = () => {
    //state variables
    const [loans, setLoans] = useState({
        activeLoans: [],
        appointments: [],
    })

    useEffect(() => {
        const data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
        };
        fetch('http://127.0.0.1:8000/api/loandetails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setLoans({
                        activeLoans: data.activeLoans,
                        appointments: data.appointments,
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }, []);

    //button click handling
    const handleCreateBtnClick = (e) => {
        e.preventDefault();
    };
    const handleDeactivateBtnClick = (e) => {
        e.preventDefault();
    };
    const handleActivateBtnClick = (e) => {
        e.preventDefault();
    };

  return (
    <div className='min-h-[625px]'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-4 font-bold text-lg'>
                In Need of a Loan? Avail the Best from Us!
                <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleCreateBtnClick}><NavLink to='/applyforloan'>Apply for a Loan</NavLink></button>
            </div>
            <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
            <div className="m-10">
                <div className='font-bold text-center text-lg'>Your Active Loans</div>
                <div className='flex flex-wrap justify-center '>
                {
                    loans.activeLoans.length === 0 ? (
                    <div className='p-4'>No Active Loans to Display</div>
                    ) : (
                        loans.activeLoans.map(loan => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={loan.id}>
                                <img className='w-32 ml-3' src={loan.type === 'Education Loan' ? education_icon : loan.type === 'Home Loan' ? home_icon : car_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{loan.type}</p>
                                    <p>Loan ID. {loan.loanId} | Payable. {loan.loanAmount}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3 cursor-default' onClick={handleDeactivateBtnClick}>By. {loan.dueDate}</button>
                                </div>
                            </div>
                        ))
                    )
                }
                    {/* <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet'>
                        <img className='w-32 ml-3' src={education_icon} alt="Home" />
                        <div className='w-2/3 text-center font-bold text-white'>
                            <p className='text-lg'>Education Loan</p>
                            <p>Loan ID. 8541 | Payable. 40000</p>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3 cursor-default' onClick={handleDeactivateBtnClick}>By. 25-03-2025</button>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="m-10">
                <div className='font-bold text-center text-lg'>Your Appointments</div>
                <div className='flex flex-wrap justify-center '>
                {
                    loans.appointments.length === 0 ? (
                    <div className='p-4'>No Appointments to Display</div>
                    ) : (
                        loans.appointments.map(loan => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={loan.id}>
                                <img className='w-32 ml-3' src={loan.type === 'Education Loan' ? education_icon : loan.type === 'Home Loan' ? home_icon : car_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{loan.type}</p>
                                    <p>Loan ID. {loan.loanId} | Payable. {loan.loanAmount}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3 cursor-default' onClick={handleActivateBtnClick}>On. {loan.dueDate}</button>
                                </div>
                            </div>
                        ))
                    )
                }
                    {/* <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet'>
                        <img className='w-32 ml-3' src={education_icon} alt="Home" />
                        <div className='w-2/3 text-center font-bold text-white'>
                            <p className='text-lg'>For Education Loan</p>
                            <p>Loan ID. 9542 | Payable. 10000</p>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3 cursor-default' onClick={handleActivateBtnClick}>On. 22-10-2023</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ActiveLoans
