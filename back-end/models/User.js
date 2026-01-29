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
    username: { type: String, unique: true, lowercase: true, sparse: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'guest', 'admin'], default: 'user' },
    isSubscribed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);