import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import jwt_decode from 'jwt-decode';
import calendar_icon from '../../Images/Mini Statement Page/calendar_icon.png';
import pin_icon from '../../Images/Mini Statement Page/pin_icon.png';
import view from '../../Images/Login Page/view.png';
import hide from '../../Images/Login Page/hide.png';
import select_icon from '../../Images/Transfer Page/select_icon.png';
import dropdown_icon from '../../Images/Transfer Page/dropdown_icon.png';
import moveup_icon from '../../Images/Transfer Page/moveup_icon.png';
import mini_statement_illus from '../../Images/Mini Statement Page/mini_statement_illus.png';

const MiniStatement = () => {
  // state variables
  const [firstName, setFirstName] = useState('start date');
  const [isFirstFocused, setIsFirstFocused] = useState(false);

  const [lastName, setLastName] = useState('end date');
  const [isLastFocused, setIsLastFocused] = useState(false);

  const [password, setPassword] = useState('your pin');
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [acType, setAcType] = useState('select your account type');
    const [isAcTypeFocused, setIsAcTypeFocused] = useState(false);
    const [isAcTypeUp, setIsAcTypeUp] = useState(false);
    const inputRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const [userStatements, setUserStatements] = useState({
        transactions: [],
        balance: 0,
    });

  // state change handling functions
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleFirstFocus = () => {
      if (!isFirstFocused) {
        setFirstName('');
        setIsFirstFocused(true);
      }
  };
  const handleFirstBlur = () => {
      if (firstName === '') {
        setFirstName('start date');
        setIsFirstFocused(false);
      }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleLastFocus = () => {
      if (!isLastFocused) {
        setLastName('');
        setIsLastFocused(true);
      }
  };
  const handleLastBlur = () => {
      if (lastName === '') {
        setLastName('end date');
        setIsLastFocused(false);
      }
  };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handlePassFocus = () => {
        if (!isPassFocused) {
        setPassword('');
        setIsPassFocused(true);
        }
    };
    const handlePassBlur = () => {
        if (password === '') {
        setPassword('your pin');
        setIsPassFocused(false);
        }
    };
    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleAcTypeChange = (e) => {
        // setAcType(e.target.value);
    };
    const handleAcTypeFocus = () => {
        if (!isAcTypeFocused) {
          setAcType('');
          setIsAcTypeFocused(true);
          setIsAcTypeUp(true);
          setIsMenuVisible(true);
        }
    };
    const handleAcTypeBlur = () => {
        setTimeout(() => {
            setIsAcTypeFocused(false);
            setIsAcTypeUp(false);
            setIsMenuVisible(false);
        }, 300);
    };
    const toggleAcTypeIcon = (e) => {
        e.preventDefault();
        setIsAcTypeUp(!isAcTypeUp);
        inputRef.current.focus();
    };
    const defaultClick = () => {
        setAcType('select your account type');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };
    const savingsClick = () => {
        setAcType('Savings');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };
    const currentClick = () => {
        setAcType('Current');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };

  //button click handling
  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();
    const data = {
        user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
        start_date: firstName,
        end_date: lastName,
        ac_type: acType,
        ac_pin: password,
    };
    if(password === 'your pin'){
        setMessage('Please enter valid data in all the fields');
        setIsMessageVisible(true);
        return;
    }
    fetch('http://127.0.0.1:8000/api/getstatements', {
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
                if(data.message === 'Mini-statement was successfully generated'){
                    setFirstName('start date');
                    setIsFirstFocused(false);
                    setLastName('end date');
                    setIsLastFocused(false);
                    setAcType('select your account type');
                    setPassword('your pin');
                    setIsPassFocused(false);
                    setUserStatements({
                        transactions: data.transactions,
                        balance: data.balance,
                    })
                }
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
        <div className='flex justify-center items-center m-10 min-h-[545px]'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg mb-5'>Generate Mini Statement</p>
                <div>
                    <form>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={select_icon} alt="typr" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none focus:caret-transparent w-1/2 h-10 p-2 text-center mx-2' ref={inputRef} type='text' value={acType} onChange={handleAcTypeChange} onFocus={handleAcTypeFocus} onBlur={handleAcTypeBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={toggleAcTypeIcon} src={isAcTypeUp ? moveup_icon : dropdown_icon} alt="select" /></button>
                        </div>
                        {
                        isMenuVisible &&
                        (<div className='flex flex-col justify-center items-center p-2 font-bold text-white absolute left-[330px] w-[390px] bg-bluePallet-light rounded-lg'>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={defaultClick}>Default</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={savingsClick}>Savings</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={currentClick}>Current</p>
                        </div>)
                        }
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={calendar_icon} alt="name" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[220px] h-10 p-2 text-center mx-2' type="text" value={firstName} onChange={handleFirstNameChange} onFocus={handleFirstFocus} onBlur={handleFirstBlur}/> to
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[220px] h-10 p-2 text-center mx-2' type="text" value={lastName} onChange={handleLastNameChange} onFocus={handleLastFocus} onBlur={handleLastBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={pin_icon} alt="Password" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onFocus={handlePassFocus} onBlur={handlePassBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePasswordVisibility} src={isPasswordVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleRegisterBtnClick}>Generate</button>
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={mini_statement_illus} alt="About" />
        </div>
        <div className='flex justify-center items-center flex-col'>
            <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
            <div className="m-10">
                <div className='font-bold text-center text-lg mb-7'>Your Account Statements</div>
                <div className='flex flex-wrap justify-center flex-col items-center'>
                {
                    userStatements.transactions.length === 0 ? (
                    <div className='p-4'>No Statements to Display</div>
                    ) : (
                        <>
                            <div>
                                (Your Current Balance. Rs. {userStatements.balance})
                            </div>
                            {
                                userStatements.transactions.map(transaction => (
                                    <div className='flex items-center w-[1135px] p-3 rounded-2xl bg-bluePallet-variant m-2 shadow-lg hover:bg-bluePallet' key={transaction.id}>
                                        <div className='w-[100%] text-center font-bold text-white'>
                                            Rs. <span className='text-bluePallet-darker'>{Math.abs(transaction.amount)} {transaction.amount>0 ? 'credited ': 'debited '}</span>{transaction.amount>0 ? ' to ': ' from '} your {transaction.ac_type_payer} Account on <span className='text-bluePallet-darker'>{transaction.date_of_transaction}</span> {transaction.amount>0 ? ' by ': ' to '} <span className='text-bluePallet-darker'>{transaction.ac_name_payee}</span> | A/C No. {transaction.ac_no_payee}
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MiniStatement
