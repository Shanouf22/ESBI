import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import jwt_decode from 'jwt-decode';
import useDrivePicker from 'react-google-drive-picker';
import pin_icon from '../../Images/Mini Statement Page/pin_icon.png';
import view from '../../Images/Login Page/view.png';
import hide from '../../Images/Login Page/hide.png';
import select_icon from '../../Images/Transfer Page/select_icon.png';
import dropdown_icon from '../../Images/Transfer Page/dropdown_icon.png';
import moveup_icon from '../../Images/Transfer Page/moveup_icon.png';
import upload_icon from '../../Images/Account Application Page/upload_icon.png';
import gdrive_icon from '../../Images/Account Application Page/gdrive_icon.png';
import browse_icon from '../../Images/Account Application Page/browse_icon.png';
import account_icon from '../../Images/Account Home Page/account_icon.png';
import calendar_icon from '../../Images/Loan Appointment Page/calendar_icon.png';
import money_icon from '../../Images/Transfer Page/money_icon.png';
import appointment_illus from '../../Images/Loan Appointment Page/appointment_illus.png';

const LoanApplication = () => {
  // state variables
  const [password, setPassword] = useState('your pin');
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [acType, setAcType] = useState('select loan type');
    const [isAcTypeFocused, setIsAcTypeFocused] = useState(false);
    const [isAcTypeUp, setIsAcTypeUp] = useState(false);
    const inputRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [fileValue, setFileValue] = useState('upload collateral');

    const [payeeNo, setPayeeNo] = useState('your account number');
    const [isPayeeNoFocused, setIsPayeeNoFocused] = useState(false);

    const [email, setEmail] = useState('pick a suitable date');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [userName, setUserName] = useState('loan amount');
    const [isUserFocused, setIsUserFocused] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const [openPicker] = useDrivePicker();

  // state change handling functions
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
        setAcType('Home Loan');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };
    const savingsClick = () => {
        setAcType('Education Loan');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };
    const currentClick = () => {
        setAcType('Vehicle Loan');
        setIsAcTypeUp(false);
        setIsMenuVisible(false);
    };

    const handleFileChange = (e) => {
        
    };
    const handleFileNameChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setFileValue(selectedFile.name);
        }
        else{
            setFileValue('upload collateral');
        }
    }

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
        setPayeeNo('your account number');
        setIsPayeeNoFocused(false);
        }
    };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handleEmailFocus = () => {
          if (!isEmailFocused) {
            setEmail('');
            setIsEmailFocused(true);
          }
      };
      const handleEmailBlur = () => {
          if (email === '') {
            setEmail('pick a suitable date');
            setIsEmailFocused(false);
          }
      };

      const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleUserFocus = () => {
        if (!isUserFocused) {
          setUserName('');
          setIsUserFocused(true);
        }
    };
    const handleUserBlur = () => {
        if (userName === '') {
          setUserName('loan amount');
          setIsUserFocused(false);
        }
    };

    //button click handling
    const handleRegisterBtnClick = async (e) => {
        e.preventDefault();
        const loan_data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
            loan_type: acType,
            ac_pin: password,
            id_proof: fileValue,
            loan_amount: userName,
            ac_no: payeeNo,
            due_date: email,
          };
          if(userName === 'loan amount'){
            setMessage('Please enter valid data in all the fields');
            setIsMessageVisible(true);
            return;
          }
          fetch('http://127.0.0.1:8000/api/handleloan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loan_data),
          })
            .then((response) => response.json())
            .then((data) => {
            //   console.log(data);
              setMessage(data.message);
              setIsMessageVisible(true);
              if(data.message === 'Loan request was processed successfully'){
                  setAcType('select loan type');
                  setIsAcTypeFocused(false);
                  setFileValue('upload collateral');
                  setUserName('loan amount');
                  setIsUserFocused(false);
                  setPassword('your pin');
                  setIsPassFocused(false);
                  setPayeeNo('your account number');
                  setIsPayeeNoFocused(false);
                  setEmail('pick a suitable date');
                  setIsEmailFocused(false);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    };
    const handleDriveClick = (e) => {
        e.preventDefault();
        openPicker({
            clientId: "598868702408-8gl46dfh8cdgh0lenmoeepri8l9340cs.apps.googleusercontent.com",
            developerKey: "AIzaSyAA7hNurZIsFkgJglhY0WMIy8Q1vopf19g",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: (data) => {
                if(data.action === 'picked'){
                    setFileValue(data.docs[0].name);
                }
            },
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
                <p className='font-bold text-lg mb-5'>Enter Your Details</p>
                <div>
                    <form>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={select_icon} alt="typr" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none focus:caret-transparent w-1/2 h-10 p-2 text-center mx-2' ref={inputRef} type='text' value={acType} onChange={handleAcTypeChange} onFocus={handleAcTypeFocus} onBlur={handleAcTypeBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={toggleAcTypeIcon} src={isAcTypeUp ? moveup_icon : dropdown_icon} alt="select" /></button>
                        </div>
                        {
                        isMenuVisible &&
                        (<div className='flex flex-col justify-center items-center p-2 font-bold text-white absolute left-[330px] w-[390px] bg-bluePallet-light rounded-lg z-30'>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={defaultClick}>Home Loan</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={savingsClick}>Education Loan</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={currentClick}>Vehicle Loan</p>
                        </div>)
                        }
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={upload_icon} alt="name" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2 caret-transparent' type="text" value={fileValue} onChange={handleFileChange}/>
                            <input type="file" id='proofFile' className='hidden' onChange={handleFileNameChange}/>
                            <label htmlFor="proofFile">
                                <img src={browse_icon} className='w-6 absolute right-[792px] top-[269px] cursor-pointer' alt="Browse" />
                            </label>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={handleDriveClick} src={gdrive_icon} alt="Browse" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                                <img className='w-8' src={account_icon} alt="acno" />
                                <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={payeeNo} onChange={handlePayeeNoChange} onFocus={handlePayeeNoFocus} onBlur={handlePayeeNoBlur}/>
                            </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={pin_icon} alt="Password" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onFocus={handlePassFocus} onBlur={handlePassBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePasswordVisibility} src={isPasswordVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={calendar_icon} alt="email" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={email} onChange={handleEmailChange} onFocus={handleEmailFocus} onBlur={handleEmailBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={money_icon} alt="User" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={userName} onChange={handleUserNameChange} onFocus={handleUserFocus} onBlur={handleUserBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleRegisterBtnClick}>Schedule Appointment</button>
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={appointment_illus} alt="About" />
        </div>
    </div>
  )
}

export default LoanApplication
