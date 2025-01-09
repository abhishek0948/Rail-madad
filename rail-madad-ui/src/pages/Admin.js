import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setComplaints, setTags } from "../redux/complaintsSlice";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Admin = () => {
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const extractDataByTag = (tag) => {
        const foundItem = info.find(item => item.tag === tag);

        if (foundItem && foundItem.data) {
            const sortedData = [...foundItem.data].sort((a, b) => a.priority_score - b.priority_score);
            dispatch(setComplaints(sortedData));
            dispatch(setTags(tag));
        }

        navigate('/admin/allComplaints');
    };

    const fetchData = async () => {
        try {
            const result = await axios.post("http://localhost:8000/info");
            const extractedData = result.data.map(item => ({
                tag: item.label,
                data: item.data
            }));
                setInfo(extractedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <nav className="w-64 bg-gray-800 text-white flex flex-col p-6">
                <div className="text-3xl font-bold mb-10">Rail Madad</div>
                <ul className="space-y-6">
                    <li>
                        <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/allComplaints" className="hover:text-blue-400">All Complaints</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-blue-400">Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Main Dashboard */}
            <div className="flex-1 p-6">
                <header className="mb-6">
                    <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Cards for quick info */}
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Total Complaints</h2>
                        <p className="mt-4 text-3xl">{info.reduce((acc, item) => acc + item.data.length, 0)}</p>
                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Pending Complaints</h2>
                        <p className="mt-4 text-3xl">
                            {info.reduce((acc, item) => acc + item.data.filter(complaint => complaint.status === 1).length, 0)}
                        </p>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Resolved Complaints</h2>
                        <p className="mt-4 text-3xl">
                            {info.reduce((acc, item) => acc + item.data.filter(complaint => complaint.status === 2).length, 0)}
                        </p>
                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Unresolved Complaints</h2>
                        <p className="mt-4 text-3xl">
                            {info.reduce((acc, item) => acc + item.data.filter(complaint => complaint.status === 0).length, 0)}
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-md bar-container">
                    <h2 className="text-2xl font-semibold mb-6">Complaints Overview</h2>

                    <Bar
                        data={{
                            labels: info.map((item) => item.tag),
                            datasets: [
                                {
                                    label: "Complaints",
                                    data: info.map((item) => item.data.length),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                        "rgba(0, 128, 0, 0.8)",
                                    ],
                                    borderRadius: 5,
                                    borderColor: 'rgba(0, 0, 0, 0.2)',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            onClick: (event, elements, chart) => {
                                if (elements.length > 0) {
                                    const element = elements[0];
                                    const index = element.index;
                                    const label = chart.data.labels[index];
                                    const value = chart.data.datasets[0].data[index];
                                    extractDataByTag(label);
                                }
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top', // positions the legend at the top
                                    labels: {
                                        color: 'black', // color for legend labels
                                        font: {
                                            size: 14, // font size for legend labels
                                        },
                                    },
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // background color for tooltips
                                    titleColor: 'white', // color for tooltip titles
                                    bodyColor: 'white', // color for tooltip body text
                                    borderColor: 'white', // border color for tooltip
                                    borderWidth: 1, // border width for tooltip
                                    titleFont: {
                                        size: 16, // font size for tooltip titles
                                        weight: 'bold', // font weight for tooltip titles
                                    },
                                    bodyFont: {
                                        size: 14, // font size for tooltip body
                                    },
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true, // start y-axis at 0
                                    grid: {
                                        color: 'rgba(200, 200, 200, 0.5)', // grid line color
                                        lineWidth: 1, // grid line width
                                    },
                                    ticks: {
                                        color: 'black', // color for y-axis ticks
                                        font: {
                                            size: 12, // font size for y-axis ticks
                                        },
                                    },
                                },
                                x: {
                                    grid: {
                                        display: false, // hide grid lines for x-axis
                                    },
                                    ticks: {
                                        color: 'black', // color for x-axis ticks
                                        font: {
                                            size: 12, // font size for x-axis ticks
                                        },
                                    },
                                },
                            },
                        }}
                    />

                </div>
            </div>
        </div>
    );
};

export default Admin;
