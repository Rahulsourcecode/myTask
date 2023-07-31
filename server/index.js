const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const cors = require('cors');
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler');
const { tryCatch } = require('./utils/tryCatch');
require('./config/dbConfig')
require('dotenv').config();
const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public')) 
app.use(morgan('default'))

const generalRouter = require('./router/generalroute')
const adminRouter = require('./router/adminRoute')


//generic routes
app.use('/api/general', generalRouter)
app.use('/api/admin', adminRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
})