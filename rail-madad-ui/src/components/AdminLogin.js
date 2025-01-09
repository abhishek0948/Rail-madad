import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const AdminLogin = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const checkLogin = (e) => {
    const email = e.target.email;
    const password = e.target.password;

    // if(!(email.includes("@railindia.org"))) {
    //   return ;
    // }  
    navigate('/admin')
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if(!input.email.includes("@railindia.org")) {
        toast.error("Invalid Admin email");
        return ;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:8000/admin-login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/admin");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user, navigate]);

  return (
    <div className="landing-page">
      <img className="background-video" src="images/auth.jpg" alt='railImage'/>

      <div className="flex items-center justify-center w-1/4 bg-gray-100 z-10">
        <div className="absolute left-10 w-full rounded-lg shadow-lg overflow-hidden flex max-w-2xl">
          <div className="content h-full w-full p-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
            <form className="text-start flex flex-col gap-4" onSubmit={checkLogin}>
              <label htmlFor="email" className="text-lg font-semibold text-white">Email</label>
              <input type="email" name="email" value={input.email} placeholder="Enter your email" className="p-3 border rounded-md text-black w-full" onChange={changeEventHandler} required />
              <label htmlFor="password" className="text-lg font-semibold text-white">Password</label>
              <input type="password" name="password" value={input.password} placeholder="Enter your password" className="p-3 border border-gray-300 rounded-md text-black w-full" onChange={changeEventHandler} required />
              {loading ? (
                <Button className="w-full my-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700">
                  Login
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AdminLogin;

