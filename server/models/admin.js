const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({

  adminId:{
    type:String,
    required:true
  },
  pasword:{
    type:String,
    required:true,
    minlength:8
  },
  allowedUsers:[
    {
      rollNo:String
    }
  ],
  subject:{
    type:String,
    required:true
  },
  questionsSet:[
    {
      id:String,
      question:String,
      options:[{
        id:String,
        val:String
      }]
    }
  ]

});

const admin = mongoose.model('admin', adminSchema);

module.exports = {admin};