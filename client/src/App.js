import React, {userRef} from 'react';
import Login from './pages/Login';
import ReportPurchases from './pages/ReportPurchases';
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
        <Route path="/" element={<Login /> } />
        <Route path="/ReportPurchases" element={<ReportPurchases /> } />

      </Routes>
    </Router>
  );
}

export default App;
