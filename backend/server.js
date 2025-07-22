const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors())

const service = require('./routes/service');
const clothType = require('./routes/clothType');
const vendor = require('./routes/vendor');
const pricing = require('./routes/pricing');
const locations = require('./routes/locations')
const user = require('./routes/user')
const otp = require('./routes/otp')

app.use('/api/services', service);
app.use('/api/cloth-types', clothType);
app.use('/api/vendors', vendor);
app.use('/api/pricing', pricing);
app.use('/api/location', locations);
app.use('/api/user', user);
app.use('/api/otp', otp)


app.get('/', (req, res) => {
  res.send('Laundry Service API is running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
