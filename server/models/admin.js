const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

// const config = require('../config/config').get(process.env.NODE_ENV);
const config = require('../config/config');

const saltRounds  = 10;

const adminSchema = mongoose.Schema({

  adminId:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  person:{
    type:String,
    default:"admin"
  },
  allowedAdmins:[
    {
      rollNo:String
    }
  ],
  subject:{
    type:String,
    required:true
  },
  exams: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Exam"
  }],
  token:{
    type:String
  }
});

adminSchema.pre("save", function(next){
  const admin = this;

  if(admin.isModified("password")) {
    bcrypt.hash(admin.password,saltRounds,function(err, hash){
      if(err) return next(err);

      admin.password = hash;
      next();
    });
  }
  else next();
});

adminSchema.methods.comparePassword = function (cadidatePassword, cb) {
  bcrypt.compare(cadidatePassword, this.password, function (err, res) {
    if (err) return cb(err);

    cb(null, res);
  });
};

adminSchema.methods.generateTokens = function (callback) {
  var admin = this;
  var token = jwt.sign(admin._id.toHexString(), config.SECRET);
  admin.token = token;
  admin.save(function (err, admin) {
    if (err) return callback(err);
    callback(null, admin);
  });
};

adminSchema.statics.findByToken = function (token, callback) {
  var admin  = this;

  jwt.verify(token, config.SECRET,function(err, decode){
    admin.findOne( {"_id":decode,"token":token},function(err, admin){
      if(err) return callback(err);

        callback(null, admin);
    });
  });
};

adminSchema.methods.deleteToken = function(token,callback){
  var admin = this;

  admin.update({$unset:{token:1}}, (err, admin)=>{
    if(err) return callback(err);
    callback(null, admin)
  })
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Admin};