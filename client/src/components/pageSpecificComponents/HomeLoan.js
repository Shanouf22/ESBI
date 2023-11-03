import React from 'react';
import home_loan_illus from '../../Images/Different Loan Pages/home_loan_illus.png';

const HomeLoan = () => {
  return (
    <div>
        <div className='flex justify-center items-center m-10'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg'>Home Loans</p>
                <div className='px-[120px] py-[5px] text-justify'>
                  Our Home Loans at ESBI Bank come with several features and benefits tailored to meet your housing needs. We offer competitive interest rates that make homeownership more affordable, and flexible repayment options that allow you to choose a tenure that suits your financial situation. Our Home Loan offerings also provide you with the flexibility to choose between fixed and floating interest rate options, so you can select the one that aligns with your preferences and financial goals.
                </div>
                <div className='px-[120px] py-[5px] text-justify'>
                  What sets ESBI Bank's Home Loans apart is our commitment to customer convenience. We have a simple and streamlined application process, whether you visit our nearest branch or apply online. Our expert team will guide you through the entire loan application process, ensuring that you have a hassle-free experience. Additionally, we offer quick approval times, so you can swiftly move forward with your homeownership plans. At ESBI Bank, we believe in making the dream of owning a home accessible and achievable. Our Home Loans are structured to offer you the support you need on your journey to becoming a proud homeowner.
                </div>
            </div>
            <img className='w-1/3' src={home_loan_illus} alt="About" />
        </div>
    </div>
  )
}

export default HomeLoan
