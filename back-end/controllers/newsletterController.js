const Newsletter = require('../models/Newsletter');

exports.join=async(req,res)=>{
    try{
        const{ email }=req.body;
        if(!email){
            return res.status(400).json({ error: 'Email is required' });
        }
        const exists=await Newsletter.findOne({ email });
        if(exists){
            return res.status(409).json({ error: 'Email already subscribed' });
        }
        const newsletter=await Newsletter.create({ email });
        res.status(201).json({ message: 'Subscribed to newsletter', newsletter });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.isSubscribed=async(req,res)=>{
    try{
        const email=req.user.email;
        const exists=await Newsletter.findOne({ email });
        return res.status(200).json({ subscribed: !!exists });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}