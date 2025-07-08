const { generateDeviceFingerprint } = require("./securityUtils.js");
const { sha256 } = require("js-sha256");
const { ObjectId } = require("mongodb");

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
  if (!user) throw new Error("Utilisateur non trouvé");
  if (!user._id) throw new Error("ID utilisateur manquant");

  const db = req.app.locals.db;
  const tokensCollection = db.collection("tokens"); // Utiliser la collection tokens directement

  const userId = user._id.toString();
  const deviceFingerprint = generateDeviceFingerprint(req);
  const issueAt = Date.now();
  const expiresIn = issueAt + 15 * 60 * 1000; // 15 minutes

  const { nonce, proofOfWork } = generateNonce({ userId, deviceFingerprint });

  const role = user.role;

  const tokenPayload = {
    userId: userId,
    role,
    issueAt,
    expiresIn,
    nonce,
    proofOfWork,
    scope: ["read", "write"],
    issuer: "authServer",
    deviceFingerprint,
  };

  // Utiliser tokensCollection au lieu de tokenModel
  const result = await tokensCollection.insertOne(tokenPayload);
  return result.insertedId.toString();
}

// Vérification du token
async function verifyToken(tokenId, req) {
  const db = req.app.locals.db;
  const tokensCollection = db.collection("tokens");

  try {
    // Retrouver le token dans la base
    const tokenData = await tokensCollection.findOne({
      _id: new ObjectId(tokenId),
    });

    if (!tokenData) {
      return { isValid: false, error: "Token non trouvé" };
    }

    console.log("Token trouvé:", tokenData);
    console.log("Expiration:", new Date(tokenData.expiresIn));
    console.log("Maintenant:", new Date());

    if (Date.now() > tokenData.expiresIn) {
      await tokensCollection.deleteOne({ _id: tokenData._id }); // nettoyage
      return { isValid: false, error: "Token expiré" };
    }

    // Retourner les données utiles
    return {
      isValid: true,
      payload: tokenData,
    };
  } catch (err) {
    console.error("Erreur lors de la vérification du token:", err);
    return { isValid: false, error: "Erreur interne" };
  }
}

module.exports = { generateToken, verifyToken, generateNonce, verifyNonce };
