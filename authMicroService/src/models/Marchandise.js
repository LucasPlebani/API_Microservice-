class Marchandise {
  constructor(id, name, prix, volume) {
    this.id = id;
    this.name = name;
    this.prix = prix;
    this.volume = volume;
    
  }
}

let marchandises = [
  new Marchandise(0, "pomme", 1, 1),
  new Marchandise(1, "peche", 2, 1),
];
