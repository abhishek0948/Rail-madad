import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    image: null,
    video: null,
  });
  const [stream, setStream] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  
  const videoRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleStartStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      setCameraPermission(true);
      setAudioPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera or microphone", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('description', formData.description);
    data.append('image', formData.image);
    data.append('video', formData.video);

    // Send the data to the backend
    fetch('/api/complaints', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // Redirect to check progress section
        navigate('/check-progress'); // Use navigate instead of window.location.href
      })
      .catch(error => {
        console.error(error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Complaint</h2>
        
        <div className="mb-4">
          <button
            type="button"
            onClick={handleStartStream}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Capture here
          </button>
        </div>

        {cameraPermission && audioPermission && (
          <div className="mb-4">
            <video ref={videoRef} className="w-full h-64 border border-gray-300 rounded-lg" />
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Complaint Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Upload Image (optional)</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="video" className="block text-sm font-semibold text-gray-700 mb-2">Upload Video (optional)</label>
            <input
              type="file"
              name="video"
              id="video"
              accept="video/*"
              className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
