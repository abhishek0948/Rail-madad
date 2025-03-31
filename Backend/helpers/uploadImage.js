import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/dadytgfi7/image/upload`

const uploadImage = async (formData) => {
    console.log("In the upload image function");
    const dataResponse = await axios.post(url,formData);
    console.log("Printing dataResponse\n",dataResponse.data);
    return dataResponse.data;
}

// const cloudinary = require('cloudinary');

// cloudinary.v2.config({
//   cloud_name: 'dadytgfi7',
//   api_key: '573481498646395',
//   api_secret: '<your_api_secret>',
//   secure: true,
// });

export default uploadImage;