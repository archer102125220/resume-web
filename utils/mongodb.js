import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://archer1021252202015:${process.env.MONGO_DB_PASSWORD}@resume-web.ffpvjxq.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const MongoDBClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
// async function run() {
//   try {
//     // Connect the MongoDBClient to the server	(optional starting in v4.7)
//     await MongoDBClient.connect();
//     // Send a ping to confirm a successful connection
//     await MongoDBClient.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//   } finally {
//     // Ensures that the MongoDBClient will close when you finish/error
//     await MongoDBClient.close();
//   }
// }
// run().catch(console.dir);
