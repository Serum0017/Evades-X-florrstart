// username: joeinfinity
// password: 8e780ytftVNvHlse // used to bemEF$%vMxjFQY349
// remove this before the final game lmao
// ip 50.35.78.229/32

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://joeinfinity:8e780ytftVNvHlse@ex-cluster.oawyznp.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = run;