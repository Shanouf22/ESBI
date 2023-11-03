import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import jwt_decode from 'jwt-decode';
import name_icon from '../../Images/Transfer Page/name_icon.png';
import account_icon from '../../Images/Transfer Page/account_icon.png';
import select_icon from '../../Images/Transfer Page/select_icon.png';
import dropdown_icon from '../../Images/Transfer Page/dropdown_icon.png';
import moveup_icon from '../../Images/Transfer Page/moveup_icon.png';
import money_icon from '../../Images/Transfer Page/money_icon.png';
import pin_icon from '../../Images/Transfer Page/pin_icon.png';
import view from '../../Images/Login Page/view.png';
import hide from '../../Images/Login Page/hide.png';
import payment_illus from '../../Images/Transfer Page/payment_illus.png';

const Transfer = () => {
    // state variables
    const [payeeName, setPayeeName] = useState('account name of payee');
    const [isPayeeFocused, setIsPayeeFocused] = useState(false);

    const [payeeNo, setPayeeNo] = useState('account number of payee');
    const [isPayeeNoFocused, setIsPayeeNoFocused] = useState(false);

    const [acType, setAcType] = useState('select your account type');
    const [isAcTypeFocused, setIsAcTypeFocused] = useState(false);
    const [isAcTypeUp, setIsAcTypeUp] = useState(false);
    const inputRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [amount, setAmount] = useState('amount');
    const [isAmountFocused, setIsAmountFocused] = useState(false);
    
    const [pin, setPin] = useState('your pin');
    const [isPinFocused, setIsPinFocused] = useState(false);
    const [isPinVisible, setIsPinVisible] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    // state change handling functions
    const handlePayeeNameChange = (e) => {
        setPayeeName(e.target.value);
    };
    const handlePayeeFocus = () => {
        if (!isPayeeFocused) {
            setPayeeName('');
            setIsPayeeFocused(true);
        }
    };
    const handlePayeeBlur = () => {
        if (payeeName === '') {
            setPayeeName('account name of payee');
            setIsPayeeFocused(false);
        }
    };

    const handlePayeeNoChange = (e) => {
        setPayeeNo(e.target.value);
    };
    const handlePayeeNoFocus = () => {
        if (!isPayeeNoFocused) {
        setPayeeNo('');
        setIsPayeeNoFocused(true);
        }
    };
    const handlePayeeNoBlur = () => {
        if (payeeNo === '') {
        setPayeeNo('account number of payee');
        setIsPayeeNoFocused(false);
        }
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

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleAmountFocus = () => {
        if (!isAmountFocused) {
        setAmount('');
        setIsAmountFocused(true);
        }
    };
    const handleAmountBlur = () => {
        if (amount === '') {
        setAmount('amount');
        setIsAmountFocused(false);
        }
    };

    const handlePinChange = (e) => {
        setPin(e.target.value);
    };
    const handlePinFocus = () => {
        if (!isPinFocused) {
        setPin('');
        setIsPinFocused(true);
        }
    };
    const handlePinBlur = () => {
        if (pin === '') {
        setPin('your pin');
        setIsPinFocused(false);
        }
    };
    const togglePinVisibility = (e) => {
        e.preventDefault();
        setIsPinVisible(!isPinVisible);
    };

    //button click handling
    const handleTransferBtnClick = (e) => {
        e.preventDefault();
        const transaction_data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
            ac_name_payee: payeeName,
            ac_no_payee: payeeNo,
            ac_type_payer: acType,
            amount: amount,
            ac_pin: pin,
          };
          if(pin === 'your pin'){
            setMessage('Please enter valid data in all the fields');
            setIsMessageVisible(true);
            return;
          }
          fetch('http://127.0.0.1:8000/api/handletransaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction_data),
          })
            .then((response) => response.json())
            .then((data) => {
                //   console.log(data);
                setMessage(data.message);
                setIsMessageVisible(true);
                if(data.message === 'Transaction was completed successfully'){
                    setAcType('select your account type');
                    setIsAcTypeFocused(false);
                    setPayeeName('account name of payee');
                    setIsPayeeFocused(false);
                    setPayeeNo('account number of payee');
                    setIsPayeeNoFocused(false);
                    setAmount('amount');
                    setIsAmountFocused(false);
                    setPin('your pin');
                    setIsPinFocused(false);
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
        <div className='flex justify-center items-center m-10 h-[74vh]'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg mb-5'>Make Payment</p>
                <div>
                    <form>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={name_icon} alt="name" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={payeeName} onChange={handlePayeeNameChange} onFocus={handlePayeeFocus} onBlur={handlePayeeBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={account_icon} alt="acno" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={payeeNo} onChange={handlePayeeNoChange} onFocus={handlePayeeNoFocus} onBlur={handlePayeeNoBlur}/>
                        </div>
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
                            <img className='w-8' src={money_icon} alt="amount" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[212px] h-10 p-2 text-center mx-2' type="text" value={amount} onChange={handleAmountChange} onFocus={handleAmountFocus} onBlur={handleAmountBlur}/>
                            <img className='w-8' src={pin_icon} alt="pin" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[212px] h-10 p-2 text-center mx-2' type={isPinVisible ? 'text' : 'password'} value={pin} onChange={handlePinChange} onFocus={handlePinFocus} onBlur={handlePinBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePinVisibility} src={isPinVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleTransferBtnClick}>Transfer Credit</button>
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={payment_illus} alt="payment" />
        </div>
    </div>
  )
}

export default Transfer
