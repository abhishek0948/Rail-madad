import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'sonner';
import { addToPendingAndRemoveFromUnsolved, addToSolvedAndRemoveFromUnsolved } from '../redux/separateSlice';
import { updateComplaintStatus } from '../redux/complaintsSlice';

const Unsolved = () => {
    const unsolved = useSelector((store) => store.separate?.unsolved);
    const tag = useSelector((store) => store.complaints.tag);

    const dispatch = useDispatch();

    const handleSolved  = async (mainComplaint) => {
        try{ 
            const data = {...mainComplaint,tag:tag};
            const response = await axios.post("http://localhost:8000/admin/solved",data,{
                withCredentials: true,
            })
            
            if(response.data.success) {
                dispatch(addToSolvedAndRemoveFromUnsolved(mainComplaint));
                dispatch(updateComplaintStatus({
                    complaintId: mainComplaint._id,
                    newStatus: 2 
                }));    
                toast.success("Updated");
            }

            if(response.data.error) {
                toast.error("Error in updating the status");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleTaken = async (mainComplaint) => {
        try{ 
            const data = {...mainComplaint,tag:tag};
            const response = await axios.post("http://localhost:8000/admin/pending",data,{
                withCredentials: true,
            })
            
            if(response.data.success) {
                dispatch(addToPendingAndRemoveFromUnsolved(mainComplaint));
                dispatch(updateComplaintStatus({
                    complaintId: mainComplaint._id,
                    newStatus: 1 
                }));    
                toast.success("Updated");
            }

            if(response.data.error) {
                toast.error("Error in updating the status");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

    }, [unsolved]); 

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">Rail Madad</Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">unsolved Complaints</h1>
                    </div>
                    <div className="text-xl space-x-4">
                        <Link to={'/'} className="hover:text-blue-400">
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="p-6 bg-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white text-sm uppercase tracking-wider">
                                <th className="border px-6 py-3">Sr. No</th>
                                <th className="border px-6 py-3">Description</th>
                                <th className="border px-6 py-3">Priority Score</th>
                                <th className="border px-6 py-3">Created Date</th>
                                <th className="border px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {unsolved.map((item, idx) => (
                                item.status === 0 ? (  // Use a ternary operator for conditional rendering
                                    <tr key={item._id} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-300">
                                        <td className="border px-6 py-4 text-gray-800">{idx + 1}</td>
                                        <td className="border px-6 py-4 text-gray-600">
                                            <div className="break-words">
                                                {item.description}
                                            </div>
                                        </td>
                                        <td className="border px-6 py-4 text-gray-800 font-semibold">{item.priority_score}</td>
                                        <td className="border px-6 py-4 text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="border py-4">
                                            <div className='flex justify-center gap-5'>
                                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300" onClick={() => {
                                                    handleTaken(item);
                                                }}>
                                                    Taken for Work
                                                </button>
                                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300" onClick={()=> {
                                                    handleSolved(item);
                                                }}>
                                                    solved
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null 
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Unsolved;
