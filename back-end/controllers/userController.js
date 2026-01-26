const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try{
        console.log(req.body);
            const {username, password, confirmpassword, ...rest } = req.body;
            const lowercaseuser = username.toLowerCase()
            const existingUser = await User.findOne({username: lowercaseuser});
            if(existingUser){
                return  res.status(409).json({message:'Username already exists'});};

            if(password !== confirmpassword){
                return res.status(400).json({message:'Passwords do not match'});
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const user=await User.create({...rest, username:lowercaseuser, password:hashedPassword});
            res.status(201).json({ message: 'User created', userId: user._id });
        } catch(err){
            res.status(400).json({error:err.message,
                details:err.errors
            });
        }
}

exports.login = async (req, res) => {
    try{
        const {username, password, remember=false}=req.body;
        const lowercaseUsername = username.toLowerCase();
        const user = await User.findOne({ username: lowercaseUsername });
        if(!user){
            return res.status(400).json({message:'Invalid username or password'});
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid username or password'});
        }

        const token=jwt.sign(
            {userId:user._id, username:user.username, role:user.role, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:remember?'7d':'1d'}
        );

        res.json({message:'Login successful', token});
    } catch (err){res.status(500).json({ error: err.message }); }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users=await User.find();
        res.json(users);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}