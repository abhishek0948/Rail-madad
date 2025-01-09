import { Doughnut } from "react-chartjs-2";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setPending, setSolved, setUnsolved } from "../redux/separateSlice";

const ComplaintPage = () => {
    const data = useSelector((store) => store.complaints);
    const pendingComplaints = useSelector((store) => store.separate.pending);
    const solvedComplaints = useSelector((store) => store.separate.solved);
    const unsolvedComplaints = useSelector((store) => store.separate.unsolved);

    const complaints = data.complaints;
    const tag = data.tag;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function separateComplaints() {
        const pending = complaints.filter(complaint => complaint.status === 1);
        const solved = complaints.filter(complaint => complaint.status === 2);
        const unsolved = complaints.filter(complaint => complaint.status === 0);

        console.log("Pending",pending);
        console.log("solved",solved);
        console.log("unsolved",unsolved);

        dispatch(setPending(pending));
        dispatch(setSolved(solved));
        dispatch(setUnsolved(unsolved));
    }

    useEffect(() => {
        separateComplaints();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">Rail Madad</Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">{tag} Complaints</h1>
                    </div>
                    <div className="text-xl space-x-4">
                        <Link to={'/'} className="hover:text-blue-400">
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">Complaint Statistics</h2>
                    <div className="flex justify-center">
                        <div className="w-64 h-64">
                            <Doughnut
                                data={{
                                    labels: ['Solved', 'Pending', 'Unsolved'],
                                    datasets: [{
                                        label: 'Complaints Status',
                                        data: [solvedComplaints.length, pendingComplaints.length, unsolvedComplaints.length],
                                        backgroundColor: [
                                            'rgb(34, 197, 94)', // Green for Solved
                                            'rgb(251, 146, 60)', // Orange for Pending
                                            'rgb(239, 68, 68)' // Red for Unsolved
                                        ],
                                        hoverOffset: 4,
                                    }]
                                }}
                                options={{
                                    onClick: (event, elements, chart) => {
                                        if (elements.length > 0) {
                                            const element = elements[0];
                                            const index = element.index;
                                            const label = chart.data.labels[index];
                                            if (label === "Solved") {
                                                navigate("/admin/allComplaints/solved");
                                            }
                                            if (label === "Unsolved") {
                                                navigate("/admin/allComplaints/unsolved");
                                            }
                                            if (label === "Pending") {
                                                navigate("/admin/allComplaints/pending");
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                font: {
                                                    size: 14,
                                                    weight: 'bold',
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-green-700">Solved Complaints</h3>
                            <p className="text-2xl font-bold text-green-700">{solvedComplaints.length}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-orange-700">Pending Complaints</h3>
                            <p className="text-2xl font-bold text-orange-700">{pendingComplaints.length}</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-red-700">Unsolved Complaints</h3>
                            <p className="text-2xl font-bold text-red-700">{unsolvedComplaints.length}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ComplaintPage;
