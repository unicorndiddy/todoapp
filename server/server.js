require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const connectMongoDB = require("./config/db");
// const todo = require("./models/todo");
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const { authenticate } = require("./middlewares/authMiddleware")


const app = express();
app.use(express.json())

//org level/large group connection --> mongodb://url:port/?username={}?password={}/dbname
/* mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error(`Error connecting to DB ${err.message}`)) */


// connect database
connectMongoDB();

// CORS Policy
app.use(cors({
    origin: [
        'http://localhost:3000'
    ],
    credentials: true
}))

// Routes
app.use('/api/todo', authenticate, todoRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Todo app server is listening on port ${PORT}`);
})