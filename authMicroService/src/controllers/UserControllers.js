const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModels");
const { generateToken } = require("../../utils/tokenUtils");

exports.signup = async (req, res, next) => {
  try {
    const { type, lastName, firstName, companyName, siren, email, password } =
      req.body;

    // Validations pour l'inscription

    // si pas de type, pas d'email ou pas de mot de passe
    if (!type || !email || !password) {
      return res
        .status(400)
        .json({ message: "Type, email et mot de passe requis" });
    }

    // si un particulier n'a pas de nom ou prénom
    if (type === "particulier" && (!lastName || !firstName)) {
      return res
        .status(400)
        .json({ message: "Nom et prénom requis pour un particulier" });
    }

    // si un professionnel n'a pas de raison sociale ou de SIREN
    if (type === "professionnel" && (!companyName || !siren)) {
      return res.status(400).json({
        message: "Raison sociale et SIREN requis pour un professionnel",
      });
    }

    // Validation du format SIREN (9 chiffres)
    if (type === "professionnel" && !/^\d{9}$/.test(siren)) {
      return res
        .status(400)
        .json({ message: "Le SIREN doit contenir exactement 9 chiffres" });
    }

    // Validation du format email avec un @
    if (!email.includes("@")) {
      return res.status(400).json({ message: "L'email doit contenir un '@'" });
    }

    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      type,
      lastName,
      firstName,
      companyName,
      siren,
      email,
      password: hashedPassword,
      salt,
      role: "user",
    });
    // Vérification de l'insertion
    console.log(
      "Nouvel utilisateur :" +
        newUser.name +
        " " +
        newUser.surname +
        " " +
        newUser.email +
        " " +
        newUser.password +
        " " +
        newUser.salt
    );

    const result = await usersCollection.insertOne(newUser);

    newUser._id = result.insertedId;
    const token = await generateToken(req, newUser);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  console.log("Tentative de connexion :", req.body);

  try {
    const usersCollection = req.app.locals.db.collection("users");
    const user = await usersCollection.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Login et/ou mot de passe incorrect" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Login et/ou mot de passe incorrect" });
    }

    const token = await generateToken(req, user);

    console.log("Connexion réussie pour l'utilisateur :", user.email);
    return res.status(200).json({
      message: "Connexion réussie !",
      token: token.insertedId,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res.status(500).json({ error: error.message });
  }
};
