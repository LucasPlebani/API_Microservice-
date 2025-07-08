const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/UserControllers");
const authMiddleware = require("../../middleware/auth");
const { getProfile } = require("../controllers/UserControllers");

console.log("=== UserRouter chargé ===");

// Routes publiques
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Affichage du profil
router.get("/profile", authMiddleware, userCtrl.getProfile);

// Mise à jour du profil
router.put("/profile", authMiddleware, userCtrl.updateProfile);

// Middleware pour vérifier le rôle
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé : rôle non autorisé" });
    }
    next();
  };
};

// Exemple de route protégée accessible uniquement aux professionnels (role "store")
router.get(
  "/store-data",
  authMiddleware,
  authorizeRole(["store"]),
  (req, res) => {
    res.status(200).json({
      message: "Données magasin accessibles uniquement au rôle store",
    });
  }
);


// Mot de passe oublié
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const usersCollection = req.userCollection;

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email introuvable" });

  const token = crypto.randomUUID();
  const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1h

  await usersCollection.updateOne(
    { email },
    {
      $set: {
        resetToken: token,
        resetTokenExpiration: expiration,
      },
    }
  );

  // Simulation de l’envoi de mail
  console.log(
    `Lien de réinitialisation : http://localhost:4200/reset-password?token=${token}`
  );
  res.json({
    message: "Un lien de réinitialisation vous a été envoyé par email.",
  });
});

// Changement du mot de passe
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await usersCollection.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: new Date() },
  });

  if (!user)
    return res.status(400).json({ message: "Token invalide ou expiré." });

  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(newPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
        salt: salt,
      },
      $unset: {
        resetToken: "",
        resetTokenExpiration: "",
      },
    }
  );

  res.json({ message: "Mot de passe réinitialisé avec succès." });
});

module.exports = router;
