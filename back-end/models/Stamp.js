const mongoose = require('mongoose');

const stampSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isArchived: { type: Boolean, default: false }
}, {timestamps: true});

module.exports = mongoose.model('Stamp', stampSchema);

