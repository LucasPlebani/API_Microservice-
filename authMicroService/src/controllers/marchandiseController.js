const MarchandiseModel = require("../models/marchandiseModel");

let marchandiseModel;

exports.init = (collection) => {
  marchandiseModel = new MarchandiseModel(collection);
};

exports.getAllMarchandises = async (req, res) => {
  try {
    const marchandises = await marchandiseModel.getAll();
    return res.json(marchandises); 
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des marchandises" });
  }
};

exports.getMarchandise = async (req, res) => {
  try {
    const id = req.params.id;
    const marchandise = await marchandiseModel.getById(id);
    if (marchandise) {
      res.json(marchandise);
    } else {
      res.status(404).json({ message: "Marchandise non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la marchandise" });
  }
};

exports.createMarchandise = async (req, res) => {
  try {
    const newMarchandise = {
      nom: req.body.nom,
      prix: req.body.prix,
      volume: req.body.volume,
    };
    const createdMarchandise = await marchandiseModel.create(newMarchandise);
    res.status(201).json(createdMarchandise);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la marchandise" });
  }
};

exports.updateMarchandise = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {
      nom: req.body.nom,
      prix: req.body.prix,
      volume: req.body.volume,
    };
    const success = await marchandiseModel.updateById(id, updatedFields);
    if (!success) {
      res.status(404).json({ message: "Marchandise non trouvée" });
    } else {
      res.json({ message: "Marchandise mise à jour" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la marchandise" });
  }
};

exports.deleteMarchandise = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await marchandiseModel.deleteById(id);
    if (!success) {
      res.status(404).json({ message: "Marchandise non trouvée" });
    } else {
      res.status(200).json({ message: "Marchandise supprimée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la marchandise" });
  }
};
