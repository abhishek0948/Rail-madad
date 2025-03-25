import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios" 
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
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  const videoRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(files[0]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: files[0], // Update the specific file field (image or video)
    }));
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
      setErrorMessage("Unable to access camera or microphone. Please check your permissions.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state
    setErrorMessage(''); // Clear any previous error messages

    const data = new FormData();
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image); // 'image' must match the field name in multer
    if (formData.video) data.append('video', formData.video);

    try {
      console.log("Printing Formdata\n",formData);
      const response = await axios.post('http://localhost:8000/imageComplaint', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // const result = await response.json();
      console.log(response);

      // Redirect to check progress section
      // navigate('/check-progress');
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("Failed to submit the complaint. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // console.log("Printing at end\n",formData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Complaint</h2>
        
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

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
              required
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

          {/* <div className="mb-4">
            <label htmlFor="video" className="block text-sm font-semibold text-gray-700 mb-2">Upload Video (optional)</label>
            <input
              type="file"
              name="video"
              id="video"
              accept="video/*"
              className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div> */}

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
