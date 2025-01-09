// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner";
// import axios from "axios";

// const SignupPage = () => {
//   const [input, setInput] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     console.log("Clicked");
//     e.preventDefault();
//     if (!input.email || !input.password) {
//       toast.error("Please fill in both email and password");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/signup", input);
//       if (response.data.success) {
//         // dispatch(loginSuccess(response.data.user)); // Dispatch user data to Redux store
//         toast.success("Signup successful!");
//         navigate("/login"); // Navigate to dashboard or another page
//       } else {
//         toast.error(response.data.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred during signup. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex w-full max-w-3xl">
//         {/* Image Card */}
//         <div className="w-1/2">
//           <img src="/images/trainlogin.jpg" alt="Train" className="object-cover w-full h-full" />
//         </div>
//         {/* Signup Form Card */}
//         <div className="w-1/2 p-6 flex flex-col justify-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign Up</h1>
//           <form className="flex flex-col gap-4" >
//             <label htmlFor="email" className="text-lg font-semibold text-gray-700">Email</label>
//             <input type="email" name="email" placeholder="Enter your email" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler}/>
//             <label htmlFor="password" className="text-lg font-semibold text-gray-700">Password</label>
//             <input type="password" name="password" placeholder="Enter your password" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler}/>
//             <button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 w-full" onClick={submitHandler}>Sign Up</button>
//           </form>
//           <p className="text-gray-700 mt-4 text-center">Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname || !input.email || !input.phoneNumber || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);

    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:8000/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "An error occurred during signup");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <div className="landing-page">
      <img className="background-video" src="images/auth.jpg" alt='railImage'/>
      <div className="h-3/4 flex items-center justify-center w-1/4 z-10 ">
        
        <div className="content absolute left-10 max-w-2xl h-3/4  p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>
          <form className="flex text-start flex-col gap-2" onSubmit={submitHandler}>
            <label htmlFor="fullname" className="text-lg font-semibold text-white">Name</label>
            <input type="text" name="fullname" placeholder="Enter your name" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler} />
            <label htmlFor="email" className="text-lg font-semibold text-white">Email</label>
            <input type="email" name="email" placeholder="Enter your email" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler} />
            <label htmlFor="phoneNumber" className="text-lg font-semibold text-white">PhoneNumber</label>
            <input type="text" name="phoneNumber" placeholder="Enter your phone number" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler} />
            <label htmlFor="password" className="text-lg font-semibold text-white">Password</label>
            <input type="password" name="password" placeholder="Enter your password" className="p-3 border border-gray-300 rounded-md text-gray-800 w-full" onChange={changeEventHandler} />
            {
              loading ? (
                <Button className="w-full my-4  bg-blue-500 hover:bg-blue-700 text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-blue-500 hover:bg-blue-700 text-white">
                  Signup
                </Button>
              )
            }
          </form>
          <p className="text-white mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};



export default Signup;
