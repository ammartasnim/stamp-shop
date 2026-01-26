const ContactEntry = require('../models/ContactEntry');

exports.submit = async (req, res) =>{
    try{
        const { fullName, email, subject, message } = req.body;
        const contactEntry=await ContactEntry.create({ fullName, email, subject, message });
        res.status(201).json({ message: 'Contact form submitted', contactEntry });
    } catch(err){
        res.status(400).json({ error: err.message });
}}

exports.deleteEntry = async (req, res) => {
    try{
        const id = req.params.id;
        await ContactEntry.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact form entry deleted' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getAllEntries = async (req, res) => {
    try{
        const entries = await ContactEntry.find();
        res.status(200).json(entries);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}