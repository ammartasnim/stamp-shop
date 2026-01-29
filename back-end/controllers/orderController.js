const Order = require('../models/Order');
const Stamp = require('../models/Stamp');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

exports.createOrder=async(req,res)=>{
    try{
        const { customer, items: guestItems, paymentMethod } = req.body;
        let userId=null;
        let isGuest=true;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
                isGuest=false;
            } catch (err) {
            console.log('Invalid token:', err.message);
            }
        }
        if (!isGuest && userId) {
      // 2️⃣ Logged-in user: fetch their info
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

     const fieldsToUpdate = ['firstname','lastname','email','phone','country','city','address','postcode'];
      fieldsToUpdate.forEach(field => {
        if (customer && customer[field]) existingUser[field] = customer[field];
      });
      await existingUser.save();
    } else {
            if (!customer) {
                return res.status(400).json({ message: 'Customer information is required for guest checkout' });
            }
            const guestUser = new User({
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            postcode: customer.postcode,
            city: customer.city,
            country: customer.country,
            role: 'guest'
      });
      await guestUser.save();
      userId = guestUser._id;
     }
    
    let items;
    if(!isGuest){
        const cart=await Cart.findOne({ userId }).populate('items.productId');
        if(!cart || cart.items.length==0){
            return res.status(400).json({message:'Cart is empty'});
        }
        items=cart.items.map(item=>({
            product: item.productId._id,
            price:item.price,
            quantity:item.quantity
        }));
    }else{
        if(!guestItems || guestItems.length==0){
            return res.status(400).json({message:'Order must contain at least one item'});
        }
        items=guestItems;
    }

      let totalPrice=0;
        const orderItems=[];

        for(const item of items){
            const productId=item.productId || item.product;
            const stamp=await Stamp.findById(productId);
            if(!stamp){
                return res.status(404).json({message:`Product with id ${productId} not found`});
            }
            if(stamp.stock<item.quantity){
                return res.status(400).json({message:`Insufficient stock for product ${stamp.name}`});
            }
            stamp.stock-=item.quantity;
            await stamp.save();
            const itemPrice = item.price || stamp.price;
            totalPrice+=itemPrice*item.quantity;
            orderItems.push({
                product: stamp._id,
                price: itemPrice,
                quantity: item.quantity
            });
        }

        const order= new Order({
            user:userId, items: orderItems, totalPrice, paymentMethod, status: paymentMethod=="E-dinar" ? 'Pending':'Created'
        });
        await order.save();
        if(!isGuest){
            await Cart.findOneAndUpdate({ userId }, { items: [] });
        }
        res.status(201).json(order);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.cancelOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order.user){
            return res.status(403).json({ message: 'Guest orders cannot be cancelled. Please contact support.' });
        }
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        if(order.status=='Delivered'){
            return res.status(400).json({message:'Delivered orders cannot be cancelled'});
        }
        if (order.status === 'Cancelled') {
            return res.status(400).json({ message: 'Order already cancelled' });
        }
        for(const item of order.items){
            const stamp=await Stamp.findById(item.product);
            if(stamp){
                stamp.stock+=item.quantity;
                await stamp.save();
            }
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
        const orders=await Order.find({user:req.user.userId}).sort({createdAt:-1});
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
        const orders=await Order.find().populate('user').populate('items.product').sort({createdAt:-1});
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