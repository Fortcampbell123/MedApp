import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import './App.css';

function App() {
  console.log('App component loaded');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Additional routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;