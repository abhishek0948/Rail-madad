const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dadytgfi7', // Replace with your Cloudinary cloud name
  api_key: '573481498646395',       // Replace with your Cloudinary API key
  api_secret: 'OGBsMrMzXxJvuA_VrVhVpeJB25M', // Replace with your Cloudinary API secret
});

module.exports = cloudinary;