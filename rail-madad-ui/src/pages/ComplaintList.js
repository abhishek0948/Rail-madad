import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from backend
    axios.get('/api/complaints')
      .then(response => {
        setComplaints(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Complaints</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date Filed</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintList;
