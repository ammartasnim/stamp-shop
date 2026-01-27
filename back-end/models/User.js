const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    corporate: String,
    address: { type: String },
    postcode: String,
    city: { type: String },
    country: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    fax: String,
    username: { type: String, unique: true, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);