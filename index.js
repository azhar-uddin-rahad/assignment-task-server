const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
require("dotenv").config();
const express= require('express')
const app =express();
const cors=require('cors');
const port =5000;
app.use(cors());
app.use(express.json());

app.get('/',(req,res )=>{
    res.send('Hello World');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jmnkad8.mongodb.net/?retryWrites=true&w=majority`;
 console.log(uri);
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  async function run() {
    try {
      const bookingsCollection = client.db("user_info").collection("user_data");
      const SectorsCollection=client.db("user_info").collection("Sectors")

      app.post("/bookings", async (req, res) => {
        const bookings = req.body;
        console.log(bookings)
        const result = await bookingsCollection.insertOne(bookings);
        res.send(result);
      });

    app.get('/bookings',async(req,res)=>{
        const query={};
        const result= await bookingsCollection.find(query).toArray();
        res.send(result);
     }),
    app.get('/Sectors',async(req,res)=>{
        const query={};
        const result= await SectorsCollection.find(query).toArray();
        res.send(result);
     }),
     app.delete('/users/:id', async(req,res)=>{
        const id =req.params.id;
        console.log(`Try to delete this is ${id} `)
        const filter={_id: ObjectId(id)}
        const result= await bookingsCollection.deleteOne(filter);
        res.send(result);
    })
    app.put('/bookings/:id',async(req,res)=>{
      const id = req.params.id;
     const filter={_id: ObjectId(id)}
      //const result=async userCollection.
      const user=req.body;
      console.log(user)
      const option= {upsert: true}
      const updatedUser={
          $set: user

      }
      const updateDoc= await bookingsCollection.updateOne(filter,updatedUser,option);
      res.send(updateDoc)
  })
    } 

    

    finally {
    }
  }
  
  run().catch(console.dir);
  







app.listen(port , () =>{
    console.log(`Example app Listening on Port ${port}`);
})