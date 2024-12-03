class UserModel {
    constructor(name, email, password, salt) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.salt = salt;
    }
  }
  
  module.exports = UserModel;