class UserModel {
  constructor({
    type,
    lastName,
    firstName,
    companyName,
    siren,
    email,
    password,
    salt,
    role = "user", // rôle par défaut
  }) {
    this.type = type;
    this.lastName = lastName;
    this.firstName = firstName;
    this.companyName = companyName;
    this.siren = siren;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.role = role;
  }
}

module.exports = UserModel;
