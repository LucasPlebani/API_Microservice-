const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./src/routes/UserRouter");
const marchandiseRoutes = require("./src/routes/router");

const app = express();
const port = 3000;

// Connexion MongoDB
const uri = "mongodb+srv://lucasplebani:hN1e4bZKgSJ3JQih@cluster0.ghtaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware global pour parser JSON
app.use(express.json());

async function run() {
  try {
    await client.connect();
    const database = client.db("ExpressLucas");
    app.locals.db = database;
    console.log("Connexion réussie à MongoDB");

    //init marchandises
    marchandiseController.init(database.collection("marchandises"));
console.log("Connexion réussie à MongoDB et initialisation du modèle");
app.use('/api/marchandises', marchandiseRoutes); // Routes marchandises

    // Middleware pour injecter la collection "users" dans req
    app.use((req, res, next) => {
      req.userCollection = database.collection("users");
      next();
    });

    // Enregistrement des routes
    app.use('/api/auth', userRoutes); // Routes utilisateur

    // Lancement du serveur
    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  }
}

run().catch(console.dir);




