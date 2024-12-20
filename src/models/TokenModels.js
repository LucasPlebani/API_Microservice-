const { generateDeviceFingerprint } = require('../../utils/securityUtils');
const { user } = require('./UserModels');

async function generateTokenPayload(req) {
 
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  // Créez les propriétés du payload du token
  const tokenPayload = {
    userId: user._id.toString(),  
    role: "user", 
    issueAt: Date.now(),
    expiresIn: Date.now() + (900 * 1000),  
    nonce: 0,  
    proofOfWork: "",  
    scope: ["read", "write"],
    issuer: "authServer",  
    deviceFingerprint: generateDeviceFingerprint(req),  
  };

  return tokenPayload;
}

module.exports = generateTokenPayload;

