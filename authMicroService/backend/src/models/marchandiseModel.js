const { ObjectId } = require("mongodb");

class MarchandiseModel {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(newMarchandise) {
    const result = await this.collection.insertOne(newMarchandise);
    return { _id: result.insertedId, ...newMarchandise };
  }

  async updateById(id, updatedFields) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );
    return result.matchedCount > 0;
  }

  async deleteById(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = MarchandiseModel;
