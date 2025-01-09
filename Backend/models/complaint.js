const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  priority_score: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const cleaning = mongoose.model('Cleaning-complaint',complaintSchema);
const staff_behaviour = mongoose.model('Staff_behaviour-complaint',complaintSchema);
const women_safety = mongoose.model('Women_safety-complaint',complaintSchema);
const medical_assistance = mongoose.model('Medical_assistance-complaint',complaintSchema);

module.exports = {
  cleaning : cleaning,
  staff_behaviour : staff_behaviour,
  women_safety : women_safety,
  medical_assistance : medical_assistance,
} 