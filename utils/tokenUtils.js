const { generateDeviceFingerprint } = require('../utils/securityUtils');
const { sha256 } = require('js-sha256');
const { ObjectId } = require('mongodb');

// Fonction de génération du nonce et de la preuve de travail
function generateNonce(infos, difficulty = 3) {
    let nonce = 0;
    const targetPrefix = "0".repeat(difficulty);
    
    while (true) {
        const dataToHash = `${JSON.stringify(infos)}${nonce}`;
        const hash = sha256(dataToHash);
        if (hash.startsWith(targetPrefix)) {
            return { nonce, proofOfWork: hash };
        }
        nonce++;
    }
}

// Fonction de vérification du nonce et de la preuve de travail
function verifyNonce(infos, nonce, proofOfWork, difficulty = 3) {
    const targetPrefix = "0".repeat(difficulty);
    const dataToHash = `${JSON.stringify(infos)}${nonce}`;
    const expectedHash = sha256(dataToHash);
    return expectedHash === proofOfWork && expectedHash.startsWith(targetPrefix);
}

// Fonction pour générer un token
async function generateToken(req, user) {
    if (!user) throw new Error('Utilisateur non trouvé');
    if (!user._id) throw new Error('ID utilisateur manquant');

    const db = req.app.locals.db;
    const tokensCollection = db.collection("tokens");  // Utiliser la collection tokens directement

    // Convertir l'ID en string s'il ne l'est pas déjà
    const userId = typeof user._id === 'string' ? user._id : user._id.toString();

    const deviceFingerprint = generateDeviceFingerprint(req);
    const issueAt = Date.now();
    const expiresIn = issueAt + 900 * 1000; // 15 minutes de validité

    const { nonce, proofOfWork } = generateNonce({ userId: userId, deviceFingerprint });

    const tokenPayload = {
        userId: userId,
        role: "user",
        issueAt,
        expiresIn,
        nonce,
        proofOfWork,
        scope: ["read", "write"],
        issuer: "authServer",
        deviceFingerprint
    };

    // Utiliser tokensCollection au lieu de tokenModel
    const result = await tokensCollection.insertOne(tokenPayload);
    return result;
}

// Vérification du token
async function verifyToken(tokenId, req) {
    try {
        const db = req.app.locals.db;
        const tokensCollection = db.collection("tokens");
        
        const tokenData = await tokensCollection.findOne({ _id: new ObjectId(tokenId) });
        if (!tokenData) return { isValid: false, error: "Token introuvable" };

        const token = tokenData;
        if (Date.now() > token.expiresIn) return { isValid: false, error: "Token expiré" };

        const isValidNonce = verifyNonce(
            { userId: token.userId, role: token.role, issueAt: token.issueAt, expiresIn: token.expiresIn, scope: token.scope, issuer: token.issuer, deviceFingerprint: token.deviceFingerprint },
            token.nonce,
            token.proofOfWork
        );

        if (!isValidNonce) return { isValid: false, error: "Nonce ou preuve de travail invalide" };

        const requestFingerprint = generateDeviceFingerprint(req);
        if (requestFingerprint !== token.deviceFingerprint) return { isValid: false, error: "Empreinte de l'appareil non reconnue" };

        return { isValid: true, payload: token };
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return { isValid: false, error: "Erreur serveur" };
    }
}


module.exports = { generateToken, verifyToken, generateNonce, verifyNonce };
