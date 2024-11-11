const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser")
require("dotenv").config();

const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use('/api', router)

mongoose.connect('mongodb+srv://authentication:Gunnu%4012%40@cluster0.cc75e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Mongo Db connected")
})

app.listen(port, ()=> console.log(`app is listening on port ${port}`));