const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "First Day Cover", "Luxury Edition"
  stock: { type: Number, default: 0 },
  price: { type: Number }, // optional: maybe some variants cost more
});

const stampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  issueDate: { type: Date },
  isArchived: { type: Boolean, default: false },
  variants: [variantSchema], // 💥 new
}, { timestamps: true });

module.exports = mongoose.model('Stamp', stampSchema);
