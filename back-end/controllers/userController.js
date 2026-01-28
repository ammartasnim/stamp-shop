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

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.changePassword = async (req, res) => {
    try{
        const userId = req.user.userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if(newPassword !== confirmPassword){
            return res.status(400).json({ message: 'New passwords do not match' });
        }
        if(currentPassword === newPassword){
            return res.status(400).json({ message: 'New password must be different from current password' });
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        const salt=await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
