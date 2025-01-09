import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './pages/HomePage';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintProgress from './pages/ComplaintProgress'; // Import ComplaintProgress
import Admin from './pages/Admin';
import AdminLogin from './components/AdminLogin';
import ComplaintPage from './pages/ComplaintPage';
import Solved from './components/Solved';
import Unsolved from './components/Unsolved';
import Pending from './components/Pending';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/admin' element={<Admin />}/>
        <Route path="/complaint-form" element={<ComplaintForm />} />
        <Route path="/check-progress" element={<ComplaintProgress />} /> 
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin/allComplaints' element={<ComplaintPage/>} />
        <Route path='/admin/allComplaints/solved' element={<Solved/>} />
        <Route path='/admin/allComplaints/unsolved' element={<Unsolved/>} />
        <Route path='/admin/allComplaints/pending' element={<Pending/>} />
      </Routes>
    </Router>
  );
}

export default App;
