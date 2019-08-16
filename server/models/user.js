const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
  
  allowed: Boolean,
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  person:"user",
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
  }

});

const user = mongoose.model("user", userSchema);

module.exports = {user};