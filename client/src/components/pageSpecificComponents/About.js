import React from 'react';
import token_icon from '../../Images/About Page/token_icon.png';
import benefits_illus from '../../Images/About Page/benefits_illus.png';

const About = () => {
  return (
    <div>
        <div className='flex flex-col'>
            <div className='flex justify-center items-center m-10'>
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>What is an ES Token?</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        An ES Token is a digital currency exclusive to ESBI Bank of India, operating seamlessly within our financial ecosystem. Each ES Token is equivalent to one Indian Rupee, allowing you to store and transact with a digital representation of traditional currency. This innovative system grants you the convenience of converting your ES Tokens into Rupees whenever needed, making your financial interactions smooth and efficient. Experience the future of banking with ES Tokens at ESBI Bank.
                    </div>
                </div>
                <img className='w-1/3 rounded-3xl' src={token_icon} alt="Token" />
            </div>
            <div className='flex justify-center items-center m-10'>
                <img className='w-1/3' src={benefits_illus} alt="Benefits" />
                <div className='w-2/3 text-center'>
                    <p className='font-bold text-lg'>Benefits</p>
                    <div className='px-[120px] py-[5px] text-justify'>
                        The benefits of ES Tokens are manifold. First, they offer competitive interest rates when held in your ESBI Bank account, helping your money grow more effectively. Furthermore, having a higher ES Token balance can provide you with the advantage of negotiating favorable interest rates on loans, making borrowing more affordable. With ES Tokens, you not only enjoy enhanced savings but also have the leverage to secure better financing options, ensuring your financial well-being.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
