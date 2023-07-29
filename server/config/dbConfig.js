const mongoose = require('mongoose');
require('dotenv').config();
//db configuration uri
const URI = process.env.dbURL

// Connect to the MongoDB database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Exported the mongoose object to use in other parts of the application 
module.exports = { mongoose };
