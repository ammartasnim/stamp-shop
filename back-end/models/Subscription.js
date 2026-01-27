const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  type: { type: Number, required: true, enum: [100, 300, 500] },
  fund: { type: Number, required: true  },
  products: [
    {
      category: { type: String, required: true },
      quantity: { type: Number, required: true, min: 0 }
    }
  ],
  frequency: { type: String, required: true, enum: ['issue', 'quarterly', 'semi-annual', 'annual'] },
  mode: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
