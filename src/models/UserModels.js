class UserModel {
  constructor(name, surname, email, password, salt) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.salt = salt;
  }
}

module.exports = UserModel;

