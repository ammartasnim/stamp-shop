const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customer: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        country : { type: String, required: true },
        city : { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Stamp', required: true },
        price: { type: Number, required: true, min: 0.1 },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ['Cash', 'E-dinar'], required: true },
    paid: { type: Boolean, default: false },
    status: { type: String, enum: ['Created', 'Pending', 'Paid', 'Delivered', 'Cancelled'], default: 'Created' }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);