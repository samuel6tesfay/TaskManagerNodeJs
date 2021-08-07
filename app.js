require('dotenv').config()


const express = require('express');
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
const cookieParser = require('cookie-parser');

const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser());



app.use(authRoutes)
app.use(todoRoutes)

app.listen(3000,()=>console.log("server up and running 3000"));

