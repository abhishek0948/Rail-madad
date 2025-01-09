import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";
import "./Complaints.css"

const Complaints = ({ extractData, onclose, tag }) => {
    const handleChange = async() => {
        try{   

        } catch {
            console.log("Error in change");
        }
    } 

    console.log(extractData);
    return (
        <div className='main-container'>
            <div className='complaint-container rounded-lg'>

                <div className='head'>
                    <h1 className='header'> {tag} Complaints</h1>
                    <span className='close-icon' onClick={onclose}>
                        <IoCloseCircle />
                    </span>
                </div>

                <div className="overflow-x-auto pt-4 mt-4 ">
                    <table className="min-w-full bg-white border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Sr.No</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Priority Score</th>
                                <th className="border px-4 py-2">Created Date</th>
                                <th className='border px-4 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {extractData.map((item, idx) => (
                                <tr key={item._id}>
                                    <td className="border px-4 py-2">{idx + 1}</td>
                                    <td className="border px-4 py-2">
                                        {/* Wrap the description content */}
                                        <div className="break-words">
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{item.priority_score}</td>
                                    <td className="border px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className='border px-4 py-2'>
                                        <button className='bg-green-300 hover:bg-green-600' onClick={() => {
                                            setComplaint(item);
                                            handleChange();
                                        }}>
                                            Change
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Complaints