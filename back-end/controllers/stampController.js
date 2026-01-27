const Stamp = require('../models/Stamp');

exports.getAllStamps=async(req,res)=>{
    try{
        const stamps=await Stamp.find();
        res.status(200).json(stamps);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getStampsByCategory = async (req, res) => {
    try { 
        const { category } = req.query;
        if (!category){
            return res.status(200).json([]);
        }
        const stamps=await Stamp.find({ category , isArchived: false });
        res.status(200).json(stamps);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.getStampById = async (req, res) => {
    try {
        const id=req.params.id;
        const stamp=await Stamp.findById(id);
        if(!stamp){
            return res.status(404).json({ error: 'Stamp not found' });
        }
        res.status(200).json(stamp);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.createStamp = async (req, res) => {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    try {
        const { name, category, price } = req.body;
        if(!req.file){
            return res.status(400).json({ error: 'Image file is required' });
        }
        const existingStamp = await Stamp.findOne({name: name});
        if (existingStamp){
            return res.status(409).json({ error: 'Stamp already exists' });
        }
        const stamp=await Stamp.create({name, image: req.file.filename, category, price});
        res.status(201).json({ message: 'Stamp created', stamp });
    } catch(err){
        res.status(400).json({ error: err.message });
    }
}

exports.deleteStamp = async (req, res) => {
    try {
        const id = req.params.id;
        await Stamp.findByIdAndDelete(id);
        res.status(200).json({ message: 'Stamp deleted' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.archiveStamp = async (req, res) => {
    try{
        const id = req.params.id;
        const stamp = await Stamp.findById(id);
        if(!stamp){
            return res.status(404).json({ error: 'Stamp not found' });
        }
        stamp.isArchived = true;
        await stamp.save();
        res.status(200).json({ message: 'Stamp archived', stamp });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.unarchiveStamp = async (req, res) => {
    try{
        const id = req.params.id;
        const stamp = await Stamp.findById(id);
        if(!stamp){
            return res.status(404).json({ error: 'Stamp not found' });
        }
        stamp.isArchived = false;
        await stamp.save();
        res.status(200).json({ message: 'Stamp unarchived', stamp });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.searchStamps=async(req,res)=>{
    try{
        const { query }=req.query;
        if(!query){
            return res.status(400).json({ error: 'Query parameter is required' });}
        console.log('Search query:', query);
        const stamps = await Stamp.find({
            name: { $regex: query, $options: 'i' },
            isArchived: false
        })
        res.status(200).json(stamps);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}