const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes=require('./routes/userRoute');
const stampRoutes=require('./routes/stampRoute');
const contactentryRoutes=require('./routes/contactentryRoute');
const subscriptionRoutes=require('./routes/subscriptionRoute');
const newsletterRoutes=require('./routes/newsletterRoute');
const cartRoutes=require('./routes/cartRoute');
const orderRoutes=require('./routes/orderRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log('MongoDB connection error:',err));

app.use('/api/users',userRoutes);
app.use('/api/stamps',stampRoutes);
app.use('/api/contactentries',contactentryRoutes);
app.use('/api/subscriptions',subscriptionRoutes);
app.use('/api/newsletters',newsletterRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

