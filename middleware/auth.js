// Route authentifier ( protection des routes via l'authentification des routes )
const { generateDeviceFingerprint } = require('../utils/securityUtils');
const { verifyToken, verifyNonce } = require('../utils/tokenUtils');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Vérification de la présence du token dans l'en-tête "Authorization"
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token Bearer

    if (!token) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    // 2. Vérification du token et récupération des données du token
    const tokenVerificationResult = await verifyToken(token, req); // Utilisation de verifyToken avec token et req
    if (!tokenVerificationResult.isValid) {
      return res.status(401).json({ message: 'Token invalide ou expiré', error: tokenVerificationResult.error });
    }

    // 3. Vérification de la preuve de travail (nonce)
    const tokenPayload = tokenVerificationResult.payload; // Récupérer les informations du token
    const isValidNonce = verifyNonce(
      { userId: tokenPayload.userId, role: tokenPayload.role, issueAt: tokenPayload.issueAt, expiresIn: tokenPayload.expiresIn, scope: tokenPayload.scope, issuer: tokenPayload.issuer, deviceFingerprint: tokenPayload.deviceFingerprint },
      tokenPayload.nonce,
      tokenPayload.proofOfWork
    );

    if (!isValidNonce) {
      return res.status(403).json({ message: 'Nonce ou preuve de travail invalide' });
    }

    // 4. Vérification de l'empreinte de l'appareil (device fingerprint)
    const requestFingerprint = generateDeviceFingerprint(req); // Empreinte de l'appareil de la requête
    if (requestFingerprint !== tokenPayload.deviceFingerprint) {
      return res.status(403).json({ message: 'Empreinte de l\'appareil non reconnue' });
    }

    // 5. Si tout est valide, ajouter les informations de l'utilisateur à `req`
    req.user = tokenPayload; // Les informations de l'utilisateur sont disponibles pour les autres middlewares/routes
    next(); // Passer au prochain middleware ou à la route

  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = authMiddleware;

