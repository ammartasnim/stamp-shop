const Cart = require('../models/Cart');
const Stamp = require('../models/Stamp');

exports.getCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        if(!cart){
            return res.status(200).json({ items: [] });
        }
        if (cart.userId.toString() !== req.user.userId) {
        console.error('SECURITY: Cart userId mismatch!');
        return res.status(403).json({ error: 'Unauthorized' });
        }
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.addItem=async(req,res)=>{
    try{
        const { productId, quantity } = req.body;
        if (!productId || !quantity || quantity <= 0 ) {
             return res.status(400).json({ error: 'Invalid product or quantity' });}
        
        let cart=await Cart.findOne({ userId: req.user.userId });
        if(!cart){
            cart=new Cart({ userId: req.user.userId, items: [] });
        }
        const stamp = await Stamp.findById(productId);
        if (!stamp) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (stamp.stock <= 0) {
            return res.status(400).json({ error: 'Product out of stock' });
        }
        const price = stamp.price;

        const itemIndex=cart.items.findIndex(item=>item.productId.toString()==productId);
        if(itemIndex>-1){
            if(cart.items[itemIndex].quantity>=5){
                return res.status(400).json({ error: 'Maximum quantity for this item reached' });
            }
            cart.items[itemIndex].quantity+=quantity;
        }
        else{
            cart.items.push({ productId, quantity, price });
        }
        await cart.save();
        await cart.populate('items.productId');
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.updateQuantity=async(req,res)=>{
    try{
        const { productId, quantity: rawQuantity } = req.body;
        const quantity = Number(rawQuantity);
        if(quantity>5){
            return res.status(400).json({ error: 'Maximum quantity for this item is 5' });
        }
        if (!productId || typeof quantity!=='number' || quantity < 0) {
             return res.status(400).json({ error: 'Invalid product or quantity' });}
        const cart=await Cart.findOne({ userId: req.user.userId });
        if(!cart){
            return res.status(404).json({ error: 'Cart not found' });
        }
        const stamp = await Stamp.findById(productId);
        if (!stamp) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (stamp.stock <= 0) {
            return res.status(400).json({ error: 'Product out of stock' });
        }
        const itemIndex=cart.items.findIndex(item=>item.productId.toString()==productId);
        if(itemIndex>-1){
            if(quantity==0){
                cart.items=cart.items.filter(item=>item.productId.toString()!==productId);
            }
            else{
                cart.items[itemIndex].quantity=quantity;
            }
        }
        await cart.save();
        await cart.populate('items.productId');
        res.status(200).json({ items: cart.items });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.removeItem=async(req,res)=>{
    try{
        const { productId } = req.body;
        const cart=await Cart.findOne({ userId: req.user.userId });
        if(!cart){
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items=cart.items.filter(item=>item.productId.toString()!==productId);
        await cart.save();
        await cart.populate('items.productId');
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.clearCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({ userId: req.user.userId });
        if(!cart){
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items=[];
        await cart.save();
        await cart.populate('items.productId');
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}