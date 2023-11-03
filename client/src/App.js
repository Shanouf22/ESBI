import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Header from './components/generalComponents/Header';
import Footer from './components/generalComponents/Footer';
import Copyright from './components/generalComponents/Copyright';
import Home from './components/pageSpecificComponents/Home';
import About from './components/pageSpecificComponents/About';
import Loans from './components/pageSpecificComponents/Loans';
import HomeLoan from './components/pageSpecificComponents/HomeLoan';
import EducationLoan from './components/pageSpecificComponents/EducationLoan';
import VehicleLoan from './components/pageSpecificComponents/VehicleLoan';
import Login from './components/pageSpecificComponents/Login';
import Registration from './components/pageSpecificComponents/Registration';
import AccountsHeader from './components/generalComponents/AccountsHeader';
import AccountsHome from './components/pageSpecificComponents/AccountsHome';
import Transfer from './components/pageSpecificComponents/Transfer';
import Convert from './components/pageSpecificComponents/Convert';
import MiniStatement from './components/pageSpecificComponents/MiniStatement';
import ActiveLoans from './components/pageSpecificComponents/ActiveLoans';
import RecurringPayment from './components/pageSpecificComponents/RecurringPayment';
import AccountApplication from './components/pageSpecificComponents/AccountApplication';
import LoanApplication from './components/pageSpecificComponents/LoanApplication';

function App() {
  const [canDisplay, setCanDisplay] = useState(false);

  setInterval(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setCanDisplay(true);
    } else {
      setCanDisplay(false);
    }
  }, 100);

  return (
    <>
      <Router>
        {canDisplay ? <AccountsHeader/> : <Header/>}
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/about" Component={About}/>
            <Route path="/loans" Component={Loans}/>
            <Route path="/homeloans" Component={HomeLoan}/>
            <Route path="/educationloans" Component={EducationLoan}/>
            <Route path="/vehicleloans" Component={VehicleLoan}/>
            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Registration}/>
            <Route path='/accountshome' Component={AccountsHome}/>
            <Route path='/ministatement' Component={MiniStatement}/>
            <Route path='/transfercredit' Component={Transfer}/>
            <Route path='/manageloans' Component={ActiveLoans}/>
            <Route path='/paymentplan' Component={RecurringPayment}/>
            <Route path='/estokentocredit' Component={Convert}/>
            <Route path='/applyforloan' Component={LoanApplication}/>
            <Route path='/createaccount' Component={AccountApplication}/>
          </Routes>
        {canDisplay ? null : <Footer/>}
        <Copyright/>
      </Router>
    </>
  );
}

export default App;
