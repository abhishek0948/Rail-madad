const nodemailer = require("nodemailer");
const User = require("../models/User.js");

const cleaning = require('../models/complaint.js').cleaning;
const medical_assistance = require('../models/complaint.js').medical_assistance;
const women_safety = require('../models/complaint.js').women_safety;
const staff_behaviour = require('../models/complaint.js').staff_behaviour;

const tagToModel = {
    cleaning,
    medical_assistance,
    women_safety,
    staff_behaviour
};

exports.tosolved = async (req, res, next) => {
    try {
        const complaintId = req.body._id;
        const tag = req.body.tag;

        const ComplaintModel = tagToModel[tag];

        const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
            complaintId,
            { status: 2 },
            { new: true }
        );

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'railmadad21@gmail.com',
                pass: 'lifn tdcb ypct ubvr'
            }
        });

        const user = await User.findById(req.body.userId);

        if (!updatedComplaint || !user) {
            return res.status(404).json({
                message: "Complaint not found",
                success: false,
                error: true
            });
        }

        const text2 = `
        Dear ${user.fullname},
        
        We hope you are doing well.
        
        We are writing to inform you that your complaint "<b>${req.body.description}</b>" regarding "<b>${tag}</b>" has been successfully resolved. Our team has taken the necessary actions, and we trust that the issue has been satisfactorily addressed.
        
        If you have any further concerns or if the issue persists, please do not hesitate to reach out to us. We are always here to assist you.
        
        Thank you for bringing this to our attention and for your continued trust in our services.`;

        const info = transporter.sendMail({
            from: {
                name: "RailMadad",
                address: "railmadad21@gmail.com"
            },
            to: user.email,
            subject: `Your Complaint has been Solved`,
            text: text2,
            html:  text2.replace(/\n/g, '<br>')
        });

        res.json({
            message: "Complaint status updated to solved",
            complaint: updatedComplaint,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in changing status",
            success: false,
            error: true
        });
    }
};

exports.topending = async (req, res, next) => {
    try {
        const complaintId = req.body._id;
        const tag = req.body.tag;

        const ComplaintModel = tagToModel[tag];

        const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
            complaintId,
            { status: 1 },
            { new: true }
        );

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'railmadad21@gmail.com',
                pass: 'lifn tdcb ypct ubvr'
            }
        });

        const user = await User.findById(req.body.userId);

        if (!updatedComplaint || !user) {
            return res.status(404).json({
                message: "Complaint not found",
                success: false,
                error: true
            });
        }

        const text2 = `
        Dear ${user.fullname},
        
        We hope you are doing well.
        
        We are writing to inform you that your complaint "<b>${req.body.description}</b>" regarding "<b>${tag}</b>" will be solved soon. Our team will take the necessary actions.
        
        If you have any further concerns or if the issue persists, please do not hesitate to reach out to us. We are always here to assist you.
        
        Thank you for bringing this to our attention and for your continued trust in our services.`;

        const info = transporter.sendMail({
            from: {
                name: "RailMadad",
                address: "railmadad21@gmail.com"
            },
            to: user.email,
            subject: `Your Complaint has been taken for resolution`,
            text: text2,
            html:  text2.replace(/\n/g, '<br>')
        });

        res.json({
            message: "Complaint status updated to pending",
            complaint: updatedComplaint,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in changing status",
            success: false,
            error: true
        });
    }
};