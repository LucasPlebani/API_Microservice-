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

module.exports = router;
