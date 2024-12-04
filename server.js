const express = require("express");
const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./src/routes/UserRouter");
//const authRoutes = require("./src/utils/token.utils");

// Connexion MongoDB
const uri = "mongodb+srv://lucasplebani:hN1e4bZKgSJ3JQih@cluster0.ghtaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());

async function run() {
  try {
    await client.connect();
    const database = client.db("ExpressLucas");
    app.locals.db = database;
    const userCollection = database.collection("users"); 
    console.log("Connexion réussie à MongoDB");

    // Middleware pour ajouter la collection à chaque requête
    app.use((req, res, next) => {
      req.userCollection = userCollection;
      next();
    });

    app.use("/", userRoutes);
    //app.use("/", authRoutes);
  
    
    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);



