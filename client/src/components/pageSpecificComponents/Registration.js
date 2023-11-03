import React from 'react';
import { useState } from 'react';
import register_icon from '../../Images/Registration Page/register_icon.png';
import name_icon from '../../Images/Registration Page/name_icon.png';
import age_icon from '../../Images/Registration Page/age_icon.png';
import phone_icon from '../../Images/Registration Page/phone_icon.png';
import address_icon from '../../Images/Registration Page/address_icon.png';
import email_icon from '../../Images/Registration Page/email_icon.png';
import user_icon from '../../Images/Registration Page/user_icon.png';
import passwordI from '../../Images/Registration Page/password.png';
import view from '../../Images/Registration Page/view.png';
import hide from '../../Images/Registration Page/hide.png';
import registration_illus from '../../Images/Registration Page/registration_illus.png';

const Registration = () => {
  // state variables
  const [firstName, setFirstName] = useState('first name');
  const [isFirstFocused, setIsFirstFocused] = useState(false);

  const [lastName, setLastName] = useState('last name');
  const [isLastFocused, setIsLastFocused] = useState(false);

  const [age, setAge] = useState('age');
  const [isAgeFocused, setIsAgeFocused] = useState(false);

  const [phone, setPhone] = useState('phone');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [address, setAddress] = useState('address');
  const [isAddressFocused, setIsAddressFocused] = useState(false);

  const [email, setEmail] = useState('email');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [userName, setUserName] = useState('username');
  const [isUserFocused, setIsUserFocused] = useState(false);
  
  const [password, setPassword] = useState('password');
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [message, setMessage] = useState('')
  const [isMessageVisible, setIsMessageVisible] = useState(false);

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
        setFirstName('first name');
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
        setLastName('last name');
        setIsLastFocused(false);
      }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleAgeFocus = () => {
      if (!isAgeFocused) {
        setAge('');
        setIsAgeFocused(true);
      }
  };
  const handleAgeBlur = () => {
      if (age === '') {
        setAge('age');
        setIsAgeFocused(false);
      }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handlePhoneFocus = () => {
      if (!isPhoneFocused) {
        setPhone('');
        setIsPhoneFocused(true);
      }
  };
  const handlePhoneBlur = () => {
      if (phone === '') {
        setPhone('phone');
        setIsPhoneFocused(false);
      }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleAddressFocus = () => {
      if (!isAddressFocused) {
        setAddress('');
        setIsAddressFocused(true);
      }
  };
  const handleAddressBlur = () => {
      if (address === '') {
        setAddress('address');
        setIsAddressFocused(false);
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
        setEmail('email');
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
        setUserName('username');
        setIsUserFocused(false);
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
        setPassword('password');
        setIsPassFocused(false);
      }
  };
  const togglePasswordVisibility = (e) => {
      e.preventDefault();
      setIsPasswordVisible(!isPasswordVisible);
  };

  //button click handling
  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();
    const user_data = {
      firstname: firstName,
      lastname: lastName,
      age: age,
      phone: phone,
      address: address,
      email: email,
      username: userName,
      password: password
    };
    if(password === 'password'){
      setMessage('Please enter valid data in all the fields');
      setIsMessageVisible(true);
      return;
    }
    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMessage(data.message);
        setIsMessageVisible(true);
        if(data.message === 'You were successfully registered'){
          setFirstName('first name');
          setIsFirstFocused(false);
          setLastName('last name');
          setIsLastFocused(false);
          setAge('age');
          setIsAgeFocused(false);
          setPhone('phone');
          setIsPhoneFocused(false);
          setAddress('address');
          setIsAddressFocused(false);
          setEmail('email');
          setIsEmailFocused(false);
          setUserName('username');
          setIsUserFocused(false);
          setPassword('password');
          setIsPassFocused(false);
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
        <header className='flex justify-center items-center h-12 bg-bluePallet-light'>
            <img className='w-8 h-8' src={register_icon} alt="Register" />
            <p className='text-lg font-bold'>&nbsp;| Register Yourself for a Seamless Banking Experience</p>
        </header>
        <div className='flex justify-center items-center m-10'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg mb-5'>Details</p>
                <div>
                    <form>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={name_icon} alt="name" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[225px] h-10 p-2 text-center mx-2' type="text" value={firstName} onChange={handleFirstNameChange} onFocus={handleFirstFocus} onBlur={handleFirstBlur}/>
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[225px] h-10 p-2 text-center mx-2' type="text" value={lastName} onChange={handleLastNameChange} onFocus={handleLastFocus} onBlur={handleLastBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={age_icon} alt="age" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[120px] h-10 p-2 text-center mx-2' type="text" value={age} onChange={handleAgeChange} onFocus={handleAgeFocus} onBlur={handleAgeBlur}/>
                            <img className='w-8' src={phone_icon} alt="phone" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[300px] h-10 p-2 text-center mx-2' type="text" value={phone} onChange={handlePhoneChange} onFocus={handlePhoneFocus} onBlur={handlePhoneBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={address_icon} alt="address" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={address} onChange={handleAddressChange} onFocus={handleAddressFocus} onBlur={handleAddressBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={email_icon} alt="email" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={email} onChange={handleEmailChange} onFocus={handleEmailFocus} onBlur={handleEmailBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={user_icon} alt="user" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[212px] h-10 p-2 text-center mx-2' type="text" value={userName} onChange={handleUserNameChange} onFocus={handleUserFocus} onBlur={handleUserBlur}/>
                            <img className='w-8' src={passwordI} alt="password" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-[212px] h-10 p-2 text-center mx-2' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onFocus={handlePassFocus} onBlur={handlePassBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePasswordVisibility} src={isPasswordVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleRegisterBtnClick}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={registration_illus} alt="About" />
        </div>
    </div>
  )
}

export default Registration
