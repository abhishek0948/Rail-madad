import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintProgress = () => {
  const navigate = useNavigate();

  // Hardcoded complaint data for the prototype
  const complaints = [
    {
      id: '12345',
      category: 'Cleanliness',
      description: 'The coach was very dirty.',
      status: 'In Progress',
      priority: 'High',
      department: 'Cleaning Department',
      expectedCompletion: '2024-09-20',
      complaintType: 'Text', // Added complaint type
      progress: [
        { step: 'Complaint Registered', date: '2024-09-10' },
        { step: 'Assigned to Cleaning Department', date: '2024-09-11' },
        { step: 'In Progress', date: '2024-09-12' },
      ],
    },
    {
      id: '12346',
      category: 'Garbage Stack',
      description: 'Seat recliner is broken.',
      status: 'Resolved',
      priority: 'Medium',
      department: 'Maintenance Department',
      expectedCompletion: '2024-09-15',
      complaintType: 'Image', // Added complaint type
      progress: [
        { step: 'Complaint Registered', date: '2024-09-08' },
        { step: 'Assigned to Maintenance Department', date: '2024-09-09' },
        { step: 'Resolved', date: '2024-09-11' },
      ],
      image: 'images/broken-equipment.jpg',
    },
    {
      id: '12347',
      category: 'Staff Behavior',
      description: 'The staff was rude.',
      status: 'In Progress',
      priority: 'High',
      department: 'Customer Service',
      expectedCompletion: '2024-09-18',
      complaintType: 'Text', // Added complaint type
      progress: [
        { step: 'Complaint Registered', date: '2024-09-09' },
        { step: 'Under Review', date: '2024-09-10' },
        { step: 'In Progress', date: '2024-09-12' },
      ],
      image: 'images/staff-behavior.jpg',
    },
    {
      id: '12348',
      category: 'Delays',
      description: 'Train was delayed by 2 hours.',
      status: 'Resolved',
      priority: 'Low',
      department: 'Operations',
      expectedCompletion: '2024-09-14',
      complaintType: 'Video', // Added complaint type
      progress: [
        { step: 'Complaint Registered', date: '2024-09-07' },
        { step: 'Reviewed by Operations', date: '2024-09-08' },
        { step: 'Resolved', date: '2024-09-11' },
      ],
      video: 'videos/delay-video.mp4',
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto relative">
      <button
        className="absolute top-4 left-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={() => navigate('/home')}
      >
        Back to Home
      </button>
      <h1 className="text-2xl font-bold text-center mb-8">Complaint Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col"
          >
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">Complaint ID: {complaint.id}</h2>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Priority:</strong> {complaint.priority}</p>
              <p><strong>Department Handling:</strong> {complaint.department}</p>
              <p><strong>Expected Completion:</strong> {complaint.expectedCompletion}</p>
              <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
              <h3 className="text-lg font-semibold mt-4">Progress:</h3>
              <ul className="list-disc list-inside mt-2">
                {complaint.progress.map((step, index) => (
                  <li key={index}>{step.step} - {step.date}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              {complaint.image && (
                <img src={"/images/c1.png"} alt="Complaint" className="w-full h-32 object-cover rounded-md" />
              )}
              {complaint.video && (
                <video controls className="w-full h-32 object-cover rounded-md mt-2">
                  <source src={complaint.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintProgress;
