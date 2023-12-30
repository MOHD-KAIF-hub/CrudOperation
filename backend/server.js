// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const userRoutes = require('./routes/UserRoute')
app.use('/api',userRoutes);

require('./connection');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
