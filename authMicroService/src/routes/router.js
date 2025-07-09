const express = require("express");
const authMiddleware = require('../../middleware/auth');
const router = express.Router();
const marchandiseController = require("../controllers/marchandiseController");


router.get('/', marchandiseController.getAllMarchandises);
router.get('/:id', marchandiseController.getMarchandise); 
router.get("/store/:storeId", marchandiseController.getMarchandisesByStore);
router.post('/', authMiddleware, marchandiseController.createMarchandise);
router.put('/:id', authMiddleware, marchandiseController.updateMarchandise);
router.delete('/:id', authMiddleware, marchandiseController.deleteMarchandise);

module.exports = router;
