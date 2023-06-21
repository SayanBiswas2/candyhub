import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb'


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

const connectDb = handler => async(req,res)=>{
    const uri = process.env.NEXT_PUBLIC_MONGO_URL;
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(uri)
    
    return handler(req,res)
}
export default connectDb;





// import { MongoClient, ServerApiVersion } from 'mongodb'
// const uri = process.env.NEXT_PUBLIC_MONGO_URL;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectDb = run => async(req,res) =>{
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const database = client.db("candyhub")
//     const User = database.collection('users');

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     let user = await User.find({})
//     console.log("user from db",user.toArray())
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
//   return run(req,res).catch(console.dir);
// }

// export default connectDb;
