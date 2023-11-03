import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import login_illus from '../../Images/Login Page/login_illus.png';
import user_icon from '../../Images/Login Page/user_icon.png';
import passwordI from '../../Images/Login Page/password.png';
import view from '../../Images/Login Page/view.png';
import hide from '../../Images/Login Page/hide.png';

const Login = () => {
    // state variables
    const [userName, setUserName] = useState('username');
    const [isUserFocused, setIsUserFocused] = useState(false);
    
    const [password, setPassword] = useState('password');
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [message, setMessage] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const navigate = useNavigate();

    // state change handling functions
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
    const handleLoginBtnClick = async (e) => {
        e.preventDefault();
        const data = {
            username: userName,
            password: password,
        };
        if(password === 'password'){
            setMessage('Please enter valid data in all the fields');
            setIsMessageVisible(true);
            return;
        }
        fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if(data.access){
                    localStorage.setItem('accessToken', data.access);
                    navigate('/accountshome');
                }
                else{
                    setMessage(data.message);
                    setIsMessageVisible(true);
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
        <div className='flex justify-center items-center m-10'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg mb-5'>Login</p>
                <div>
                    <form>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={user_icon} alt="User" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type="text" value={userName} onChange={handleUserNameChange} onFocus={handleUserFocus} onBlur={handleUserBlur}/>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <img className='w-8' src={passwordI} alt="Password" />
                            <input className='border-b-[2.5px] border-black focus:border-bluePallet-darker focus:outline-none w-1/2 h-10 p-2 text-center mx-2' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} onFocus={handlePassFocus} onBlur={handlePassBlur}/>
                            <button className='absolute right-[759px]'><img className='w-6' onClick={togglePasswordVisibility} src={isPasswordVisible ? view : hide} alt="" /></button>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <button className='bg-bluePallet-dark text-white hover:bg-bluePallet-darker w-[54%] h-[45px] rounded-lg my-3' onClick={handleLoginBtnClick}>Login</button>
                        </div>
                        <div className='flex justify-center items-center p-2 font-bold'>
                            Don't Have an Account? Register&nbsp;<NavLink className='hover:text-bluePallet-dark' to="/register">Here</NavLink>.
                        </div>
                    </form>
                </div>
            </div>
            <img className='w-1/3' src={login_illus} alt="About" />
        </div>
    </div>
  )
}

export default Login
