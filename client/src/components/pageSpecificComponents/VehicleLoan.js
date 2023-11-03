import React from 'react';
import vehicle_loan_illus from '../../Images/Different Loan Pages/vehicle_loan_illus.png';

const VehicleLoan = () => {
  return (
    <div>
        <div className='flex justify-center items-center m-10'>
            <div className='w-2/3 text-center'>
                <p className='font-bold text-lg'>Vehicle Loans</p>
                <div className='px-[120px] py-[5px] text-justify'>
                  ESBI Bank's Vehicle Loans offer a plethora of features and benefits to make vehicle ownership more accessible and affordable. With competitive interest rates and flexible repayment options, you have the freedom to choose a financing plan that aligns perfectly with your financial circumstances. Our loans encompass a wide variety of vehicles, both new and used, and cover all associated expenses, including registration and insurance.
                </div>
                <div className='px-[120px] py-[5px] text-justify'>
                  What distinguishes our Vehicle Loans is the ease and swiftness of the application process. Whether you opt for an in-person visit to our nearest branch or decide to apply online, our dedicated team is on hand to guide you throughout. Quick approval ensures you can hit the road in your new vehicle without delay. With ESBI Bank's Vehicle Loans, your dream of owning a vehicle becomes an attainable reality, whether it's for daily commutes, family adventures, or business requirements. Get ready to steer your way to new horizons with ESBI Bank's support.
                </div>
            </div>
            <img className='w-1/3' src={vehicle_loan_illus} alt="About" />
        </div>
    </div>
  )
}

export default VehicleLoan
