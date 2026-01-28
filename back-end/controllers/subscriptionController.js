const Subscription = require('../models/Subscription');
const User = require('../models/User');

exports.subscribe = async (req, res) => {
    try {
        const { type, frequency, mode, products, fund } = req.body;

        if (!type || !frequency || !mode) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if(!Array.isArray(products) || products.length==0){
            return res.status(400).json({ error: 'At least one category is required' });
        }
        const exists=await Subscription.findOne({userId:req.user.userId, active:true});
        if(exists){
            return res.status(409).json({ error: 'User already subscribed' });
        }
        const subscription = new Subscription({ type, frequency, mode, products, fund, userId: req.user.userId });
        await User.findByIdAndUpdate(req.user.userId, { isSubscribed: true });
        await subscription.save();
        res.status(201).json({ message: 'Subscription created', subscription });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.unsubscribe = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        if(req.user.role!=='admin' && subscription.userId.toString() !== req.user.userId){
            return res.status(403).json({ error: 'Unauthorized' });
        }
        subscription.active = false;
        await subscription.save();
        await User.findByIdAndUpdate(subscription.userId, { isSubscribed: false });
        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        await Subscription.findByIdAndDelete(subscriptionId);
        await User.findByIdAndUpdate(subscription.userId, { isSubscribed: false });
        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllSubscriptions = async (req, res) => {
    try {
        if(req.user.role!=='admin'){
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const subscriptions = await Subscription.find().populate('userId', 'firstname lastname email').sort({ createdAt: -1 });
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUserSubscription=async(req,res)=>{
    try{
        const subscription = await Subscription.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
        if(!subscription){
            return res.status(200).json({ "subscribed": false } );
        }
        res.status(200).json({ "subscribed": true, subscription: subscription });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}