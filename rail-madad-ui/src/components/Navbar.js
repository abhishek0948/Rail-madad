import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi'; 
import { toast } from 'sonner';
import axios from "axios";
import { useDispatch} from 'react-redux';
import { setLoading, setUser } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.get("http://localhost:8000/logout" ,{
        withCredentials: true,
      })

      if(response.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(response.data.message);
      }
    } catch(err) {
      console.log("Error in logging out");
    }
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/IndRailMadad.png" alt="Indian Railway Logo" className="h-8 w-8 my-auto" />
          <Link to="/" className="text-3xl font-bold ml-2 leading-none">Rail Madad</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {/* <Link to="/complaint-form" className="hover:text-blue-400">Complaint Form</Link>
          <Link to="/progress" className="hover:text-blue-400">See Progress of Complaint</Link> */}
          {/* <Link to="/" className="hover:text-blue-400">Home</Link> */}
          <button 
            className="hover:text-blue-400 relative group" 
            onClick={handleLogout}
          >
            <span>Log out</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-xl">
            <HiOutlineUser />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
