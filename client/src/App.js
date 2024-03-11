import React, {userRef} from 'react';
import Login from './template/login';
import Register from './template/register';
import Home from './template/Home';
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

      </Routes>
    </Router>
  );
}

export default App;
