const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./src/routes/userRouter");
const marchandiseRoutes = require("./src/routes/router");
const marchandiseController = require("./src/controllers/marchandiseController");
require("dotenv").config();

const app = express();

const uri = process.env.DB_URL;
const port = process.env.PORT || 3000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware global
app.use(express.json());
app.use(cors());

async function run() {
  try {
    await client.connect();
    const database = client.db("ExpressLucas");
    app.locals.db = database;
    console.log("✅ Connexion réussie à MongoDB");

    // Initialisation du contrôleur de marchandises
    marchandiseController.init(database.collection("marchandises"));

    // Routes marchandise
    app.use("/api/marchandises", marchandiseRoutes);

    // Injection collection utilisateurs
    app.use((req, res, next) => {
      req.userCollection = database.collection("users");
      next();
    });

    // Routes utilisateurs
    app.use("/api/auth", userRoutes);

    // Healthcheck
    app.get("/api/healthcheck", async (req, res) => {
      res.status(200).json({ status: "ok" });
    });

    app.listen(port, () => {
      console.log(`🚀 API en cours sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
  }
}

run().catch(console.dir);
