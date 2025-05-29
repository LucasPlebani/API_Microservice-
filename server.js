const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./src/routes/UserRouter");

//const marchandiseRoutes = require("./src/routes/router");

require("dotenv").config();

const app = express();

// Connexion MongoDB
const uri = process.env.DB_URL;
const port = process.env.PORT || 3001;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware global pour parser JSON
app.use(express.json());
app.use(cors());

async function run() {
  try {
    await client.connect();
    const database = client.db("ExpressLucas");
    app.locals.db = database;
    console.log("Connexion réussie à MongoDB");

    //init marchandises
    //    marchandiseController.init(database.collection("marchandises"));
    //console.log("Connexion réussie à MongoDB et initialisation du modèle");
    //app.use('/api/marchandises', marchandiseRoutes); // Routes marchandises

    // Middleware pour injecter la collection "users" dans req
    app.use((req, res, next) => {
      req.userCollection = database.collection("users");
      next();
    });

    // Enregistrement des routes
    app.use("/api/auth", userRoutes); // Routes utilisateur

    // Route pour vérifier que le serveur tourne bien
    app.get("/api/healthcheck", async (req, res) => {
      try {
        res.status(200).json({ status: "ok" });
      } catch (error) {
        console.error("Healthcheck failed:", error);
        res.status(500).json({ status: "error" });
      }
    });

    // Lancement du serveur
    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  }
}

run().catch(console.dir);
