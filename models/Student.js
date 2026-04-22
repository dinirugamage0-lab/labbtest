const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    faculty: { type: String, required: true },
    year: { type: Number, required: true },
    dietaryPreferences: { type: [String], default: [] },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;