import React from 'react';
import account_icon from '../../Images/Account Home Page/account_icon.png';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import jwt_decode from 'jwt-decode';
import name_icon from '../../Images/Transfer Page/name_icon.png';
import select_icon from '../../Images/Transfer Page/select_icon.png';
import dropdown_icon from '../../Images/Transfer Page/dropdown_icon.png';
import moveup_icon from '../../Images/Transfer Page/moveup_icon.png';
import money_icon from '../../Images/Transfer Page/money_icon.png';
import pin_icon from '../../Images/Transfer Page/pin_icon.png';
import view from '../../Images/Login Page/view.png';
import hide from '../../Images/Login Page/hide.png';
import recurring_illus from '../../Images/Recurring Payment Page/recurring_illus.png';

const RecurringPayment = () => {
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
    
    const [acType1, setAcType1] = useState('recurring duration');
    const [isAcType1Focused, setIsAcType1Focused] = useState(false);
    const [isAcType1Up, setIsAcType1Up] = useState(false);
    const inputRef1 = useRef(null);
    const [isMenu1Visible, setIsMenu1Visible] = useState(false);
    
    const [amount, setAmount] = useState('amount');
    const [isAmountFocused, setIsAmountFocused] = useState(false);
    
    const [pin, setPin] = useState('your pin');
    const [isPinFocused, setIsPinFocused] = useState(false);
    const [isPinVisible, setIsPinVisible] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const [message1, setMessage1] = useState('')
    const [isMessage1Visible, setIsMessage1Visible] = useState(false);

    const [userData, setUserData] = useState({
        paymentPlans: [],
    })

    useEffect(() => {
        const data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
        };
        fetch('http://127.0.0.1:8000/api/getpaymentplans', {
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
                        paymentPlans: data.paymentPlans,
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }, []);

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

    const handleAcType1Change = (e) => {
        // setAcType(e.target.value);
    };
    const handleAcType1Focus = () => {
        if (!isAcType1Focused) {
          setAcType1('');
          setIsAcType1Focused(true);
          setIsAcType1Up(true);
          setIsMenu1Visible(true);
        }
    };
    const handleAcType1Blur = () => {
        setTimeout(() => {
            setIsAcType1Focused(false);
            setIsAcType1Up(false);
            setIsMenu1Visible(false);
        }, 300);
    };
    const toggleAcType1Icon = (e) => {
        e.preventDefault();
        setIsAcType1Up(!isAcType1Up);
        inputRef1.current.focus();
    };
    const dailyClick = () => {
        setAcType1('Daily');
        setIsAcType1Up(false);
        setIsMenu1Visible(false);
    };
    const weeklyClick = () => {
        setAcType1('Weekly');
        setIsAcType1Up(false);
        setIsMenu1Visible(false);
    };
    const monthlyClick = () => {
        setAcType1('Monthly');
        setIsAcType1Up(false);
        setIsMenu1Visible(false);
    };
    const yearlyClick = () => {
        setAcType1('Yearly');
        setIsAcType1Up(false);
        setIsMenu1Visible(false);
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
        const payment_data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
            ac_name_payee: payeeName,
            ac_no_payee: payeeNo,
            amount: amount,
            duration: acType1,
            ac_pin: pin,
            account_type: acType,
          };
          if(pin === 'your pin'){
            setMessage1('Please enter valid data in all the fields');
            setIsMessage1Visible(true);
            return;
          }
          fetch('http://127.0.0.1:8000/api/startplan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment_data),
          })
            .then((response) => response.json())
            .then((data) => {
                //   console.log(data);
                const data1 = {
                    user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
                };
                fetch('http://127.0.0.1:8000/api/getpaymentplans', {
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
                                paymentPlans: data.paymentPlans,
                            });
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                setMessage1(data.message);
                setIsMessage1Visible(true);
                if(data.message === 'Payment plan was successfully added to your account'){
                    setAcType('select your account type');
                    setIsAcTypeFocused(false);
                    setPayeeName('account name of payee');
                    setIsPayeeFocused(false);
                    setPayeeNo('account number of payee');
                    setIsPayeeNoFocused(false);
                    setAcType1('recurring duration');
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
    const handleDeactivateBtnClick = (e, plan_id) => {
        e.preventDefault();
        const data = {
            plan_id: plan_id,
        };
        fetch('http://127.0.0.1:8000/api/cancelplan', {
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
                    fetch('http://127.0.0.1:8000/api/getpaymentplans', {
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
                                    paymentPlans: data.paymentPlans,
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

    const handleOk1BtnClick = (e) => {
        e.preventDefault();
        setIsMessage1Visible(false);
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
            {
                isMessage1Visible &&
                <div className='w-[530px] h-[300px] bg-bluePallet-light absolute top-[72%] left-[34%] z-10 rounded-3xl shadow-2xl'>
                    <div className='w-full h-8 bg-bluePallet-dark rounded-t-[15px]'></div>
                    <div className='flex justify-center items-center h-[185px] p-[30px] text-lg font-bold text-bluePallet-darker text-center'>
                        {message1}
                    </div>
                    <div className='flex justify-center items-center p-2'>
                        <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleOk1BtnClick}>Ok</button>
                    </div>
                </div>
            }
            <div className='flex flex-col justify-center items-center'>
                <div className="m-10">
                    <div className='font-bold text-center text-lg'>Your Payees</div>
                    <div className='flex flex-wrap justify-center '>
                    {
                        userData.paymentPlans.length === 0 ? (
                        <div className='p-4'>No Payment Plans to Display</div>
                        ) : (
                            userData.paymentPlans.map(plan => (
                                <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet' key={plan.id}>
                                    <img className='w-32 ml-3' src={account_icon} alt="Home" />
                                    <div className='w-2/3 text-center font-bold text-white'>
                                        <p className='text-lg'>{plan.payeeName}</p>
                                        <p>A/C No. {plan.payeeNo} | Paying. {plan.amount} {plan.duration}</p>
                                        <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={(e) => handleDeactivateBtnClick(e, plan.id)}>Cancel</button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                        {/* <div className='flex items-center w-[510px] p-3 rounded-2xl bg-bluePallet-variant m-6 shadow-lg hover:bg-bluePallet'>
                            <img className='w-32 ml-3' src={account_icon} alt="Home" />
                            <div className='w-2/3 text-center font-bold text-white'>
                                <p className='text-lg'>Shanouf Ansari</p>
                                <p>A/C No. 9547819 | Paying. 300 Weekly</p>
                                <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleDeactivateBtnClick}>Cancel</button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className='w-6/7 h-1 bg-bluePallet-dark'></div>
                <div className="mt-10 font-bold text-center text-lg">Add a Recurring Payment Plan</div>
            </div>
            <div className='flex justify-center items-center m-10'>
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg mb-5'>Make Recurring Payment</p>
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
                                <img className='w-8' src={select_icon} alt="typr" />
                                <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none focus:caret-transparent w-1/2 h-10 p-2 text-center mx-2' ref={inputRef1} type='text' value={acType1} onChange={handleAcType1Change} onFocus={handleAcType1Focus} onBlur={handleAcType1Blur}/>
                                <button className='absolute right-[759px]'><img className='w-6' onClick={toggleAcType1Icon} src={isAcType1Up ? moveup_icon : dropdown_icon} alt="select" /></button>
                            </div>
                            {
                            isMenu1Visible &&
                            (<div className='flex flex-col justify-center items-center p-2 font-bold text-white absolute left-[330px] w-[390px] bg-bluePallet-light rounded-lg'>
                                <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={dailyClick}>Daily</p>
                                <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={weeklyClick}>Weekly</p>
                                <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={monthlyClick}>Monthly</p>
                                <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={yearlyClick}>Yearly</p>
                            </div>)
                            }
                            <div className='flex justify-center items-center p-2'>
                                <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleTransferBtnClick}>Start Plan</button>
                            </div>
                        </form>
                    </div>
                </div>
                <img className='w-1/3' src={recurring_illus} alt="payment" />
            </div>
        </div>
    )
}

export default RecurringPayment
