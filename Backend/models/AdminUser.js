const mongoose = require("mongoose");

const adminuserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emp_id: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true});

const AdminUser = mongoose.model('AdminUser', adminuserSchema);
module.exports = AdminUser;