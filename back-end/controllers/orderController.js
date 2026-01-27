const Order = require('../models/Order');
const Stamp = require('../models/Stamp');

exports.createOrder=async(req,res)=>{
    try{
        const { customer, items, paymentMethod } = req.body;
        if(!items || items.length==0){
            return res.status(400).json({message:'Order must contain at least one item'});
        }
        let totalPrice=0;
        const orderItems=[];
        for(const item of items){
            const stamp=await Stamp.findById(item.product);
            if(!stamp){
                return res.status(404).json({message:`Product with id ${item.product} not found`});
            }
            totalPrice+=stamp.price*item.quantity;
            orderItems.push({
                product: stamp._id,
                price: stamp.price,
                quantity: item.quantity
            });
        }
        const order= new Order({
            user:req.user?.id, customer, items: orderItems, totalPrice, paymentMethod, status: paymentMethod=="E-dinar" ? 'Pending':'Created'
        });
        await order.save();
        res.status(201).json(order);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.cancelOrder=async(req,res)=>{
    try{
        if(!order.user){
            return res.status(403).json({ message: 'Guest orders cannot be cancelled online. Please contact support.' });
        }
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        if(order.status=='Delivered'){
            return res.status(400).json({message:'Delivered orders cannot be cancelled'});
        }
        order.status='Cancelled';
        await order.save();
        res.status(200).json({message:'Order cancelled successfully', order});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user.id}).sort({createdAt:-1});
        res.json(orders);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getOrderById=async(req,res)=>{
    try{
        if (order.user && order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find().sort({createdAt:-1});
        res.json(orders);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.updateOrderStatus=async(req,res)=>{
    try{
        const { status }=req.body;
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        order.status=status;
        if(status=='Paid'){order.paid=true;}
        await order.save();
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}