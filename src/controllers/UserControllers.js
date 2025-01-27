const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModels');
const { generateToken } = require('../../utils/tokenUtils');

exports.signup = async (req, res, next) => {
    console.log('Requête reçue :', req.body);

    try { 
        // Génération salt | hash password | création user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new UserModel(req.body.name, req.body.email, hash, salt);

        //connection à la collection users 
        const db = req.app.locals.db;
        const usersCollection = db.collection("users");

        // Insertion de l'utilisateur dans la base de données
        const result = await usersCollection.insertOne({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password, 
            salt: newUser.salt
        });

        // Ajouter l'ID à newUser avant de générer le token
        newUser._id = result.insertedId;
        const token = await generateToken(req, newUser);

        console.log('Utilisateur créé avec succès !', result);
        res.status(201).json({ 
            message: 'Utilisateur créé !',
            token: token
        });

    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res, next) => {
    console.log("Tentative de connexion :", req.body);

    try {
        const usersCollection = req.app.locals.db.collection("users");

        // Rechercher l'utilisateur par email
        const user = await usersCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
        }

        // Générer un token
        const token = await generateToken(req, user);

        // Envoyer une réponse unique avec le token
        console.log("Connexion réussie pour l'utilisateur :", user.email);
        return res.status(200).json({
            message: "Connexion réussie !",
            token: token.insertedId,
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);

        // Envoyer une réponse en cas d'erreur
        return res.status(500).json({ error: error.message });
    }
};
