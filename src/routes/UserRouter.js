const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/UserControllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;


router.post('/login', async (req, res) => {
  
 try {
   const user = await userCollection.findOne({ email: req.body.email });
   if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

   const result = await generateToken(req, user);
   res.status(200).json({ token: result });
} catch (error) {
   res.status(500).json({ error: error.message });
}
});