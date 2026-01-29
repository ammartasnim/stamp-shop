const mongoose = require('mongoose');

const cartScheme=new mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, unique:true },
    items:[{
        productId:{type:mongoose.Schema.Types.ObjectId, ref:'Stamp', required:true },
        price: { type: Number, required: true, min: 0.1 }, 
        quantity:{type:Number, required:true, default:1}
    }]
}, {timestamps:true});

module.exports = mongoose.model('Cart', cartScheme);