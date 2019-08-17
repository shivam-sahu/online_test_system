const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require('../config/config').get(process.env.NODE_ENV);

const saltRounds = 10;

const userSchema  = mongoose.Schema({
  
  allowed: Boolean,
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  person:{
    type:String,
    default:"user"
  },
  rollNo:{
    type:String,
    required:true
  },
  seletedAnswers: [
    {
      id: String,
      ans: String
    }
  ],
  subject:{
    type:String
  },
  totalRight: {
    type: String
  },
  totalWrong: {
    type: String
  },
  totalScore: {
    type: String
  },
  token:{
    type:String
  }

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


userSchema.methods.comparePassword = function(cadidatePassword, cb){
  bcrypt.compare(cadidatePassword, this.password, function (err, res) {
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



const User = mongoose.model("User", userSchema);

module.exports = {User}