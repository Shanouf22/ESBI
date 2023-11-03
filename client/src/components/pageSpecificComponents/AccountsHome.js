import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import name_icon from '../../Images/Account Home Page/name_icon.png';
import phone_icon from '../../Images/Account Home Page/phone_icon.png';
import email_icon from '../../Images/Account Home Page/email_icon.png';
import token_icon from '../../Images/Account Home Page/token_icon.png';
import profile_icon from '../../Images/Account Home Page/profile_icon.png';
import account_icon from '../../Images/Account Home Page/account_icon.png';
import accounts_info_illus from '../../Images/Account Home Page/accounts_info_illus.png';

const AccountsHome = () => {
    //state variables
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        estokens: 0,
        activeAccounts: [],
        deactiveAccounts: [],
    })

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    useEffect(() => {
        const data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
        };
        fetch('http://127.0.0.1:8000/api/userdetails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setUserData({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phone: data.phone,
                        email: data.email,
                        estokens: data.estokens,
                        activeAccounts: data.activeAccounts,
                        deactiveAccounts: data.deactiveAccounts,
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
    const handleDeactivateBtnClick = (e, accountId) => {
        e.preventDefault();
        // console.log(accountId);
        const data = {
            accountId: accountId,
        }
        fetch('http://127.0.0.1:8000/api/deactivateaccount', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setMessage(data.message);
                    setIsMessageVisible(true);
                    const data1 = {
                        user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
                    };
                    fetch('http://127.0.0.1:8000/api/userdetails', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data1),
                          })
                            .then((response) => response.json())
                            .then((data) => {
                                // console.log(data);
                                setUserData({
                                    firstname: data.firstname,
                                    lastname: data.lastname,
                                    phone: data.phone,
                                    email: data.email,
                                    estokens: data.estokens,
                                    activeAccounts: data.activeAccounts,
                                    deactiveAccounts: data.deactiveAccounts,
                                });
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    };
    const handleActivateBtnClick = (e, accountId) => {
        e.preventDefault();
        // console.log(accountId);
        const data = {
            accountId: accountId,
        }
        fetch('http://127.0.0.1:8000/api/activateaccount', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setMessage(data.message);
                    setIsMessageVisible(true);
                    const data1 = {
                        user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
                    };
                    fetch('http://127.0.0.1:8000/api/userdetails', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data1),
                          })
                            .then((response) => response.json())
                            .then((data) => {
                                // console.log(data);
                                setUserData({
                                    firstname: data.firstname,
                                    lastname: data.lastname,
                                    phone: data.phone,
                                    email: data.email,
                                    estokens: data.estokens,
                                    activeAccounts: data.activeAccounts,
                                    deactiveAccounts: data.deactiveAccounts,
                                });
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    };

    const handleOkBtnClick = (e) => {
        e.preventDefault();
        setIsMessageVisible(false);
    }

  return (
    <div>
        {
            isMessageVisible &&
            <div className='w-[530px] h-[300px] bg-bluePallet-light absolute top-[28%] left-[34%] z-10 rounded-3xl shadow-2xl'>
                <div className='w-full h-8 bg-bluePallet-dark rounded-t-[15px]'></div>
                <div className='flex justify-center items-center h-[185px] p-[30px] text-lg font-bold text-bluePallet-darker text-center'>
                    {message}
                </div>
                <div className='flex justify-center items-center p-2'>
                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleOkBtnClick}>Ok</button>
                </div>
            </div>
        }
        <header className='font-bold bg-bluePallet-light'>
            <div className='font-eagle-lake text-2xl text-center p-4'>
                Welcome, {userData.firstname}
            </div>
            <div className='flex justify-center items-center'>
                <ul className='w-1/3 p-2 text-lg absolute left-[30px]'>
                    <ul className='ml-[65px]'>
                        <li>
                            <ul className='flex items-center'>
                            <li><img className='w-5 h-5' src={name_icon} alt="" /></li>
                            <li className='ml-1'>{userData.firstname+' '+userData.lastname}</li>
                            </ul>
                        </li>
                        <li>
                        <ul className='flex items-center'>
                            <li><img className='w-5 h-5' src={phone_icon} alt="" /></li>
                            <li className='ml-1'>{userData.phone}</li>
                            </ul>
                        </li>
                        <li>
                        <ul className='flex items-center'>
                            <li><img className='w-5 h-5' src={email_icon} alt="" /></li>
                            <li className='ml-1'>{userData.email}</li>
                            </ul>
                        </li>
                    </ul>
                </ul>
                <div className='w-1 h-28 bg-bluePallet-dark absolute'></div>
                <div className='text-lg absolute right-[310px] flex flex-col justify-center items-center'>
                    <p>ES Tokens: You Currently Have -</p>
                    <p className='flex'>
                        <img className='w-10 mx-1 rounded' src={token_icon} alt="tokens" />{userData.estokens}
                    </p>
                    <p>&nbsp;</p>
                    <p>Convert to Credit <NavLink to='/estokentocredit' className='hover:text-bluePallet-dark'>Here</NavLink>.</p>
                </div>
                <img className='w-40 relative left-[580px] m-2' src={profile_icon} alt="user" />
            </div>
        </header>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-4 font-bold text-lg'>
                Don't Have an Account Yet? Create One in Few Minutes!
                <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleCreateBtnClick}><NavLink to='/createaccount'>Create an Account</NavLink></button>
            </div>
            <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
            <div className="m-10">
                <div className='font-bold text-center text-lg'>Your Active Bank Accounts</div>
                <div className='flex flex-wrap justify-center '>
                {
                    userData.activeAccounts.length === 0 ? (
                    <div className='p-4'>No Active Accounts to Display</div>
                    ) : (
                        userData.activeAccounts.map(account => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={account.id}>
                                <img className='w-32 ml-3' src={account_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{account.type} Account</p>
                                    <p>A/C No. {account.acno} | Balance. {account.balance}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={(e) => handleDeactivateBtnClick(e, account.id)}>Deactivate</button>
                                </div>
                            </div>
                        ))
                    )
                }
                    {/* {
                        userData.activeAccounts.map(account => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={account.id}>
                                <img className='w-32 ml-3' src={account_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{account.type} Account</p>
                                    <p>A/C No. {account.acno} | Balance. {account.balance}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleDeactivateBtnClick}>Deactivate</button>
                                </div>
                            </div>
                        ))
                    } */}
                </div>
            </div>
            <div className="m-10">
                <div className='font-bold text-center text-lg'>Your Deactive Bank Accounts</div>
                <div className='flex flex-wrap justify-center '>
                {
                    userData.deactiveAccounts.length === 0 ? (
                    <div className='p-4'>No Deactive Accounts to Display</div>
                    ) : (
                        userData.deactiveAccounts.map(account => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={account.id}>
                                <img className='w-32 ml-3' src={account_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{account.type} Account</p>
                                    <p>A/C No. {account.acno} | Balance. {account.balance}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={(e) => handleActivateBtnClick(e, account.id)}>Activate</button>
                                </div>
                            </div>
                        ))
                    )
                } 
                    {/* {
                        userData.deactiveAccounts.map(account => (
                            <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={account.id}>
                                <img className='w-32 ml-3' src={account_icon} alt="Home" />
                                <div className='w-2/3 text-center font-bold text-white'>
                                    <p className='text-lg'>{account.type} Account</p>
                                    <p>A/C No. {account.acno} | Balance. {account.balance}</p>
                                    <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleActivateBtnClick}>Activate</button>
                                </div>
                            </div>
                        ))
                    } */}
                </div>
            </div>
            <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
            <div className='flex justify-center items-center m-10'>
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>Know About ESBI Bank Accounts</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        Welcome to ESBI Bank of India, where your financial aspirations find a home! We understand that choosing the right bank account is a crucial decision, and we're here to guide you through our range of offerings. At ESBI Bank, we offer two distinct types of accounts: Current and Savings.
                    </div>
                    <div className='px-[120px] py-[5px] text-justify'>
                        Our Current Account is designed to meet the needs of businesses and individuals who require frequent financial transactions. With features like checkbooks, overdraft facilities, and online banking, this account offers the flexibility and convenience you need to manage your daily financial operations seamlessly. Whether you're a budding entrepreneur or a seasoned business owner, our Current Account is the perfect tool to keep your finances in order.
                    </div>
                    <div className='px-[120px] py-[5px] text-justify'>
                        For those looking to save and grow their hard-earned money, our Savings Account is an excellent choice. ESBI Bank's Savings Account offers competitive interest rates and the convenience of 24/7 access to your funds through ATM services and online banking. It's the ideal account for individuals who want to secure their financial future while having easy access to their savings whenever they need it.
                    </div>
                </div>
                <img className='w-1/3 rounded-3xl' src={accounts_info_illus} alt="Token" />
            </div>
        </div>
    </div>
  )
}

export default AccountsHome
