const cleaning = require('../models/complaint.js').cleaning;
const medical_assistance = require('../models/complaint.js').medical_assistance;
const women_safety = require('../models/complaint.js').women_safety;
const staff_behaviour = require('../models/complaint.js').staff_behaviour;
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data'); // Import FormData for multipart requests
const { default: uploadImage } = require('../helpers/cloudinary.js');
const multer = require('multer');
const cloudinary = require('../helpers/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Mapping tags to models
const tagToModel = {
    cleaning,
    medical_assistance,
    women_safety,
    staff_behaviour
};

// Configure multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'rail_madad', // Folder name in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    },
});

const upload = multer({ storage: storage });

exports.saveComplaint = async (req, res, next) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", {
            msg: req.body.message,
        });
        
        const userId = req.body.userId;
        const priority_score = response.data.complaint.priority_score;
        const tag = response.data.tag;
        const answer = response.data.answer;
        // console.log(`tag: ${tag}, answer: ${answer}`);
        
        if (tag !== "greetings" && tag !== "register_complaint" && tag !== "unknown" && tagToModel[tag]) {
            const ComplaintModel = tagToModel[tag]; 

            const complaint = new ComplaintModel({
                description: req.body.message,
                priority_score: priority_score,
                userId: userId,
                status: 0
            });
            
            complaint.save()
                .then(() => res.json({ answer: answer }))
                .catch(err => {
                    console.log("Error in saving to DB", err);
                    res.status(500).json({ error: "Failed to save complaint" });
                });
        } else {
            res.json({ answer: answer }); 
        }
    } catch (error) {
        console.error("Error in axios request:", error);
        res.status(500).json({ error: "Error communicating with the prediction service" });
    }
};

exports.getInfo = async (req, res, next) => {
    try {
        const cleaningData =await cleaning.find()
        const staffData = await staff_behaviour.find();
        const womensafetyData = await women_safety.find();
        const medicalData = await medical_assistance.find();
        
        // console.log("Printing CleaningData:",cleaningData);
        // console.log("Printing staffData:",staffData);
        // console.log("Printing medicalData:",medicalData);
        // console.log("Printing womensafetyData:",womensafetyData);

        const result = [
            {
                label:"cleaning",
                value:cleaningData.length,
                data:cleaningData
            },
            {
                label:"medical_assistance",
                value:medicalData.length,
                data:medicalData
            },
            {
                label:"staff_behaviour",
                value:staffData.length,
                data:staffData
            },
            {
                label:"women_safety",
                value:womensafetyData.length,
                data:womensafetyData
            }
        ]
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data" });
    }
};

// exports.imageComplaint = (req, res, next) => {
//     upload.single('image')(req, res, async (err) => {

//         try {
//             // Prepare FormData for sending to app.py
//             const formData = new FormData();// Add description
//             const image = fs.createReadStream("Printing Files\n",req.file,"\n");
//             formData.append('image', fs.createReadStream(req.file.path)); // Add image file
//             formData.append("upload_preset","rail_madad");

//             // Send the FormData to app.py
            // const response = await axios.post('http://127.0.0.1:5000/image', formData, {
            //     headers: {
            //         ...formData.getHeaders(), // Set appropriate headers for multipart/form-data
            //     },
            // });
            
            
//             console.log('Response from app.py:', response.data);
//             console.log("\n");

//             const uploadImageCloudinary = await uploadImage(formData);
//             console.log("Image uploaded to Cloudinary:", uploadImageCloudinary);
            
//             res.json(response.data);
//         } catch (error) {
//             console.error('Error sending data to app.py:', error);
//             res.status(500).json({ error: 'Error processing image complaint' });
//         }
//     });
// };


exports.imageComplaint = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
  
      console.log('Request Body:', req.body); // Contains other form fields
      console.log('Uploaded File:', req.file); // Contains file metadata from Cloudinary
      console.log('File Path:', req.file.path); // Cloudinary URL

      try {
        const response = await axios.post('http://127.0.0.1:5000/image', req.file.path, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        
        res.json({
          message: 'Image uploaded successfully',
          imageUrl: req.file.path, 
          publicId: req.file.filename,
        });
      } catch (error) {
        console.error('Error processing image complaint:', error);
        res.status(500).json({ error: 'Error processing image complaint' });
      }
    });
  };