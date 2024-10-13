const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const executeRoute = require('./routes/execute');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/execute', executeRoute);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});