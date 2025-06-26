const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModels");

const userCtrl = require("../controllers/UserControllers");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// router.post("/signup", async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       salt,
//       role,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "Utilisateur créé avec succès" });
//   } catch (err) {
//     console.error("Erreur lors de l’inscription :", err);
//     res.status(500).json({ error: "Erreur serveur lors de l’inscription" });
//   }
// });

module.exports = router;
