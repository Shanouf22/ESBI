import React from 'react';
import education_loan_illus from '../../Images/Different Loan Pages/education_loan_illus.png';

const EducationLoan = () => {
  return (
    <div>
        <div className='flex justify-center items-center m-10'>
            <img className='w-1/3' src={education_loan_illus} alt="About" />
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg'>Education Loans</p>
                <div className='px-[120px] py-[5px] text-justify'>
                  ESBI Bank's Education Loans come with a host of features and benefits to help you achieve your academic goals. We offer competitive interest rates and flexible repayment options that cater to your unique financial situation. Our loans cover a wide range of educational expenses, including tuition fees, study materials, accommodation, and other associated costs. What sets our Education Loans apart is the ease of application and quick approval process,   ensuring that you can access the funds you need promptly. 
                </div>
                <div className='px-[120px] py-[5px] text-justify'>
                  We understand that pursuing education, whether in India or abroad, can be expensive. Therefore, our Education Loans are structured to provide substantial financial support, making quality education accessible to all. Our team of experts is always ready to assist you with your loan application and ensure a seamless experience from start to finish. With ESBI Bank's Education Loans, you can focus on your studies while we take care of your financial needs, turning your educational dreams into reality.
                </div>
            </div>
        </div>
    </div>
  )
}

export default EducationLoan
