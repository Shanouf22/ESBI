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
import money_icon from '../../Images/Transfer Page/money_icon.png';
import browse_icon from '../../Images/Account Application Page/browse_icon.png';
import application_illus from '../../Images/Account Application Page/application_illus.png';

const AccountApplication = () => {
  // state variables
  const [password, setPassword] = useState('form a 4-digit pin');
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const [acType, setAcType] = useState('select account type');
    const [isAcTypeFocused, setIsAcTypeFocused] = useState(false);
    const [isAcTypeUp, setIsAcTypeUp] = useState(false);
    const inputRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [fileValue, setFileValue] = useState('upload ID proof');
    const [openPicker] = useDrivePicker();

    const [userName, setUserName] = useState('initial balance');
    const [isUserFocused, setIsUserFocused] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

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
        setPassword('form a 4-digit pin');
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
        setAcType('select account type');
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

    const handleFileChange = (e) => {
        
    };
    const handleFileNameChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setFileValue(selectedFile.name);
        }
        else{
            setFileValue('upload ID proof');
        }
    }

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
          setUserName('initial balance');
          setIsUserFocused(false);
        }
    };

    //button click handling
    const handleRegisterBtnClick = async (e) => {
        e.preventDefault();
        const account_data = {
            user_id: jwt_decode(localStorage.getItem('accessToken')).user_id,
            ac_type: acType,
            ac_pin: password,
            id_proof: fileValue,
            balance: userName,
          };
          if(userName === 'initial balance'){
            setMessage('Please enter valid data in all the fields');
            setIsMessageVisible(true);
            return;
          }
          fetch('http://127.0.0.1:8000/api/createaccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(account_data),
          })
            .then((response) => response.json())
            .then((data) => {
            //   console.log(data);
              setMessage(data.message);
              setIsMessageVisible(true);
              setAcType('select account type');
              setIsAcTypeFocused(false);
              setFileValue('upload ID proof');
              setUserName('initial balance');
              setIsUserFocused(false);
              setPassword('form a 4-digit pin');
              setIsPassFocused(false);
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
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={defaultClick}>Default</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={savingsClick}>Savings</p>
                            <p className='w-[100%] m-0.5 rounded-lg p-1 bg-bluePallet-variant hover:bg-bluePallet cursor-pointer' onClick={currentClick}>Current</p>
                        </div>)
                        }
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={upload_icon} alt="name" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2 caret-transparent' type="text" value={fileValue} onChange={handleFileChange}/>
                            <input type="file" id='proofFile' className='hidden' onChange={handleFileNameChange}/>
                            <label htmlFor="proofFile">
                                <img src={browse_icon} className='w-6 absolute right-[792px] top-[325px] cursor-pointer' alt="Browse" />
                            </label>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={handleDriveClick} src={gdrive_icon} alt="Browse" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={pin_icon} alt="Password" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onFocus={handlePassFocus} onBlur={handlePassBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePasswordVisibility} src={isPasswordVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={money_icon} alt="User" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={userName} onChange={handleUserNameChange} onFocus={handleUserFocus} onBlur={handleUserBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleRegisterBtnClick}>Create Bank Account</button>
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={application_illus} alt="About" />
        </div>
    </div>
  )
}

export default AccountApplication
