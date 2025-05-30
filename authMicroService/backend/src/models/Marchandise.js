class Marchandise {
  constructor(id, nom, prix, volume) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.volume = volume;
  }
}

let marchandises = [
  new Marchandise(0, "pomme", 1, 1),
  new Marchandise(1, "peche", 2, 1),
];
