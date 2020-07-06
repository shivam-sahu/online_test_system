const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const config = require('../config/config').get(process.env.NODE_ENV);
const config = require('../config/config');

const saltRounds = 10;

const userSchema  = mongoose.Schema({
  
  allowed: Boolean,
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  person:{
    type:String,
    default:"user"
  },
  userId:{
    type:String,
    required:true,
    unique:true
  },
  givenExamResponse:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Response'
  }]
});

userSchema.pre("save", function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  }
  else next();
});


userSchema.methods.comparePassword = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function (err, res) {
    if(err) return cb(err);

    cb(null,res);
  });
};

userSchema.methods.generateTokens = function( callback){
  var user = this;
  var token  = jwt.sign(user._id.toHexString(),config.SECRET);

  user.token = token;
  user.save(function(err, user){
    if(err) return callback(err);

    callback(null,user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;
  jwt.verify(token, config.SECRET, function (err, decode) {
    user.findOne({ "_id": decode, "token": token }, function (err, user) {
      if (err) return callback(err);

      callback(null, user);
    });
  });
};

userSchema.methods.deleteToken = function (token, callback) {
  var user = this;

  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return callback(err);
    callback(null, user)
  })
}



const User = mongoose.model("User", userSchema);

module.exports = {User}