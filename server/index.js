const express = require('express')
const router = express.Router()
const cors = require('cors');
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler');
const { tryCatch } = require('./utils/tryCatch');
require('./config/dbConfig')
require('dotenv').config();
const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static('public'))
app.use(morgan('default'))

const adminRouter = require('./router/adminRoute')



//generic routes
app.use('/admin', adminRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
})