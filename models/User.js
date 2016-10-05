//user model
var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = mongoose.Schema({
    local: {
      name: String,
      email: String,
      password: String
    }
  })


//generater password in hash
userSchema.methods.generateHash = function(password) {
  //password => is what you wana encrypt
  //genSaltSync() => method od bcrypt, how you wana encrypt password
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password) {
  //here 'this' points to the current user
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema);

module.exports = User;
