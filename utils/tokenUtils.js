const tokenPayload = {
    userId: user._id.toString(),
    role:"user",
    issueAt: Date.now(),
    expiresIn: Date.nom()+(900*1000),
    nonce: 0,
    proofOfWork: "",
    scope: ["read", "write"],
    issuer: "authServer",
    deviceFingerprint: generateDeviceFingerprint(req)
    
    };
    
    const { nonce, proofOfWork } = generateNonce(tokenPayload) ;
    tokenPayload.nonce = nonce;
    tokenPayload.proofOfWork = proofOfWork;
    
    
    //crypto

    const crypto = ('require');

        function generateDeviceFingerprint(req) {
            const userAgent = req.headers['user-agent'] || '';
            const ip = req.ip || '';
            const timezone = req.headers ['timezone'] || '';
            const fingerPrintData = `${userAgent}-${ip}-${timezone}`;
            return crypto.createHash('sha256').update(fingerPrintData).digest('hex');
        }
        module.exports = {
            generateDeviceFingerprint
        };
//function generateNonce 

    function generateNonce(infos, difficulty = 3){
        let nonce = 0;
        const targetPrefix = "0".repeat(difficulty);

        while(true){
            const dataToHash = `${JSON.stringify(infos)}${nonce}`;
            const hash = sha256(dataToHash);

            if (hash.starsWith(targetPrefix)) {
                return { nonce, proofOfWork: hash }
            }
            nonce++;
        }
    }

    //tokenUtils.js
    const { ObjectId } = require('mongodb');
    const sha256 = require('js-sha256');
    const { generateDeviceFingerprint } = require ('');
    
    function generateNonce(infos, difficulty = 3){ };
    
        function verifyNonce(infos, nonce, proofOfWork, difficulty = 3) {   
    };
    
    async function generateToken(req, user, tokenModel) {
        let deviceFingerprint = generateDeviceFingerprint(req);
        tokenPlayload.userId = user._id;
        let deviceAndToken = deviceFingerprint + tokenPlayload.userId;
      
        return { deviceFingerprint };
      }
    
    async function verifyToken(tokenId, req){

    };
    module.exports = { generateNonce, generateToken, verifyToken };