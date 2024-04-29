import React, {userRef} from 'react';
import Login from './template/login';
import Register from './template/register';
import Home from './template/Home';
import InfoInput from './template/input-info';
import Dashboard from './template/Dashboard';
import ReportPurchases from './template/ReportPurchases';
import UserTransactions from './template/userTransactions';
import UserSettings from './template/UserSettings';
import EditBills from './template/EditBills';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


function App() {
  

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home /> } />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register /> } />
        <Route path="/InfoInput" element={<InfoInput /> } />
        <Route path="/InfoInput" element={<InfoInput /> } />
        <Route path="/Dashboard" element={<Dashboard /> } />
        <Route path="/ReportPurchases" element={<ReportPurchases /> } />
        <Route path="/UserTransactions" element={<UserTransactions /> } />
        <Route path="/UserSettings" element={<UserSettings /> } />
        <Route path="/EditBills" element={<EditBills /> } />
      </Routes>
    </Router>
  );
}

export default App;
