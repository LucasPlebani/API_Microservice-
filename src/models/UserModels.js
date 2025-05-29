class UserModel {
  constructor(name, firstname, email, password, salt) {
    this.name = name;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.salt = salt;
  }
}

module.exports = UserModel;
