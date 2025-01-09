import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white ${isOpen ? 'block' : 'hidden'}`}>
      <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="flex flex-col items-center mt-20">
        <Link to="/home" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/automated-categorization" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Automated Categorization</Link>
        <Link to="/data-extraction" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Data Extraction</Link>
        <Link to="/automated-response" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Automated Response</Link>
        <Link to="/predictive-maintenance" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Predictive Maintenance</Link>
        <Link to="/feedback-improvement" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Feedback & Improvement</Link>
        <Link to="/training-support" className="py-2 hover:underline" onClick={() => setIsOpen(false)}>Training & Support</Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
