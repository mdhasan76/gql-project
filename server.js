const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = process.env.PORT || 5000;
const schema = require("./GraphQL/schema")
const resolver = require("./GraphQL/resolver");
const { buildSchema } = require("graphql");

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
    const userCollection = client.db("gQL-first").collection('user');

    // app.get("/h",async(req, res) =>{
    //     res.send({hello: "hello"})
    // })
    // app.get('/s', async (req, res) => {
    //     const query = {};
    //     const services = serviceCollection.find(query);
    //     const result = await services.toArray();
    //     res.send(result)
    // })

    const resolver = {
        hello: () =>{
            return 12
        },
        another1: () =>{
            return {a: 24, b: "b mean ball"}
        } ,
        another: () =>{
            return {address:"dhan mia bari",name: "hasan", age: "21", fndList: {name: "robin", address: "Akhandabari", innerFnd: {sIfnd: "Kawser", home: "brother of Hasan"}}}
        },
        serverData: async () =>{
            const result = await serviceCollection.find({}).toArray();
            return result
        },
        storUser: async (args) =>{
            // const result = await serviceCollection.insertOne(req.input)
            console.log(args)
            return {
                name: args.namdeo,
                age: args.age
            }
        }
        
    }
    const schema = buildSchema(`
    type Another{
        a: Int
        b: String
    }
    type sData{
        img: String
        _id: ID
    }
    type Query{
        hello: Int
        another1: Another
        another:user
        serverData: [sData]
        
    }
    type user{
        name: String
        age: Int
        fndList: fnd
        address: String
    }
    type User{
        name: String
        age: Int
    }
    type fnd{
        name: String
        address: String
        innerFnd: subInner
    }
    type subInner{
        sIfnd: String
        home: String
    }
    type Mutation{
        storUser(namdeo: String!, age:Int!): User
    }
`);

    app.use("/graphql", graphqlHTTP({
        schema,
        rootValue:resolver ,
        graphiql: true
    }))

}

run().catch(err => console.log(err));

app.listen(port, () =>{
    console.log("Its running bro Chill!!")
})