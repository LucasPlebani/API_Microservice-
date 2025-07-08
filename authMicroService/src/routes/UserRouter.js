const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userControllers");
const authMiddleware = require("../../middleware/auth");

console.log("=== userRouter chargé ===");

// Routes publiques
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Exemple de route protégée accessible à tous les utilisateurs authentifiés
router.get("/profile", authMiddleware, (req, res) => {
  // Ici, req.user est disponible grâce au middleware d’authentification
  res.status(200).json({
    message: "Profil utilisateur récupéré",
    user: req.user,
  });
});

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
router.get(
  "/seller-data",
  authMiddleware,
  authorizeRole(["Vendeur"]),
  (req, res) => {
    res.status(200).json({
      message: "Données accessibles uniquement aux vendeurs",
    });
  }
);
module.exports = router;
