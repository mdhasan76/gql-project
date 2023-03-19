const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlware 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send("Hello Graphql, You are running")
})


app.listen(port, () =>{
    console.log("Its running bro Chill!!")
})