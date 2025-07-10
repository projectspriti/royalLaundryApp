const express = require('express');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());


const serviceRoutes = require('./routes/serviceRoute');
const clothTypeRoutes = require('./routes/clothTypeRoute');
const vendorRoutes = require('./routes/vendorRoute');
const pricingRoutes = require('./routes/pricingRoute');


app.use('/api/services', serviceRoutes);
app.use('/api/cloth-types', clothTypeRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/pricing', pricingRoutes);


app.get('/', (req, res) => {
  res.send('Laundry Service API is running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
