// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import Home from './page/Home';
import Dashboard from './admin/dashboard';

function App() {
  return (
    <Router>
      <div>
     

        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/admin" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
