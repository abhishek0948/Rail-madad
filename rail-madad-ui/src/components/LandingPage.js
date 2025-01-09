import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">

      <img className="background-video" src='images/trainimage.jpg' alt='railImage'/>

      <div className="content">
        <h1 className="title">Rail Madad</h1>
        <p className="quote">"Your journey matters, we are here to help!"</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Signup</Link>
          <Link to="/admin-login" className="btn btn-secondary">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
