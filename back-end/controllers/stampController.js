const Stamp = require('../models/Stamp');

exports.getAllStamps=async(req,res)=>{
    try{
        const userRole=req.user ? req.user.role : 'guest';
        const { category, filter, query, role }=req.query;
        let mainFilter={  };
        if(userRole !== 'admin'){
            mainFilter.isArchived=false;
        }
        if(category){
            mainFilter.category=category;
        }
        if(query){
            mainFilter.name={ $regex: query, $options: 'i' };
        }
        if(filter){
            mainFilter.description={ $regex: filter, $options: 'i' };
        }
        const stamps=await Stamp.find(mainFilter).sort({ createdAt: -1 });
        res.status(200).json(stamps);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// exports.getStampsByCategory = async (req, res) => {
//     try { 
//         const { category } = req.query;
//         if (!category){
//             return res.status(200).json([]);
//         }
//         const stamps=await Stamp.find({ category , isArchived: false });
//         res.status(200).json(stamps);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// }

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
        const { name, description, category, price, stock, issueDate, isArchived } = req.body;
        if(!req.file){
            return res.status(400).json({ error: 'Image file is required' });
        }
        const existingStamp = await Stamp.findOne({name: name});
        if (existingStamp){
            return res.status(409).json({ error: 'Stamp already exists' });
        }
        const stamp=await Stamp.create({name, description, image: req.file.filename, category, price:parseFloat(price), stock:parseInt(stock) || 0, issueDate:issueDate || null, isArchived: isArchived === 'true'

        });
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

exports.setArchiveStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const { archive } =req.query
        const stamp = await Stamp.findById(id);
        if(!stamp){
            return res.status(404).json({ error: 'Stamp not found' });
        }
        stamp.isArchived = archive === 'true';
        await stamp.save();
        res.status(200).json({ message: `Stamp ${stamp.isArchived ? 'archived' : 'unarchived'}`, stamp });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// exports.unarchiveStamp = async (req, res) => {
//     try{
//         const id = req.params.id;
//         const stamp = await Stamp.findById(id);
//         if(!stamp){
//             return res.status(404).json({ error: 'Stamp not found' });
//         }
//         stamp.isArchived = false;
//         await stamp.save();
//         res.status(200).json({ message: 'Stamp unarchived', stamp });
//     }catch(err){
//         res.status(500).json({ error: err.message });
//     }
// }

// exports.searchStamps=async(req,res)=>{
//     try{
//         const { query }=req.query;
//         if(!query){
//             return res.status(400).json({ error: 'Query parameter is required' });}
//         console.log('Search query:', query);
//         const stamps = await Stamp.find({
//             name: { $regex: query, $options: 'i' },
//             isArchived: false
//         })
//         res.status(200).json(stamps);
//     }catch(err){
//         res.status(500).json({ error: err.message });
//     }
// }

// exports.filterStamps=async(req,res)=>{
//     try{
//         const { filter }=req.query;
//         if(!filter){
//             return res.status(400).json({ error: 'Filter parameter is required' });
//         }
//         let stamps=await Stamp.find({
//             isArchived: false,
//             description: { $regex: filter, $options: 'i' }
//         })
//         res.status(200).json(stamps);
//     }catch(err){
//         res.status(500).json({ error: err.message });
//     }
// }

exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock, adjustment } = req.body;

        const stamp = await Stamp.findById(id);
        if (!stamp) {
            return res.status(404).json({ message: 'Stamp not found' });
        }

        if (stock !== undefined) {
            // Set absolute stock
            stamp.stock = parseInt(stock);
        } else if (adjustment !== undefined) {
            // Adjust current stock (e.g., -1 for a sale)
            stamp.stock += parseInt(adjustment);
        }

        // Prevent negative stock
        if (stamp.stock < 0) stamp.stock = 0;

        await stamp.save();
        res.status(200).json({ message: 'Stock updated successfully', stock: stamp.stock });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};