import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Solved = () => {
    const solved = useSelector((store) => store.separate?.solved);

    useEffect(() => {
        console.log("Printing solved",solved);
    }, [solved]); 

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">Rail Madad</Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">solved Complaints</h1>
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
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {solved.map((item, idx) => (
                                item.status === 2 ? (  // Use a ternary operator for conditional rendering
                                    <tr key={item._id} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-300">
                                        <td className="border px-6 py-4 text-gray-800">{idx + 1}</td>
                                        <td className="border px-6 py-4 text-gray-600">
                                            <div className="break-words">
                                                {item.description}
                                            </div>
                                        </td>
                                        <td className="border px-6 py-4 text-gray-800 font-semibold">{item.priority_score}</td>
                                        <td className="border px-6 py-4 text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ) : null // If the condition fails, return null (do nothing)
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Solved;