const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlware 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send("Hello Graphql, You are running")
})

const uri = "mongodb+srv://Practice-gQL:cKrPm0nkc7QEtyDP@cluster0.mj4ed9j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    
    const serviceCollection = client.db("gQL-first").collection('product');

    app.get("/h",async(req, res) =>{
        res.send({hello: "hello"})
    })
    app.get('/s', async (req, res) => {
        const query = {};
        const services = serviceCollection.find(query);
        const result = await services.toArray();
        res.send(result)
    })

}

run().catch(err => console.log(err));

app.listen(port, () =>{
    console.log("Its running bro Chill!!")
})