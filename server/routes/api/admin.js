const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt  = require("jsonwebtoken");
const keys  = require("../../config/keys")

const {Admin} = require('../../models/admin');


//!test
router.get('/test',(req,res)=>{
  res.json({
    msg:"wo this works."
  })
})

//*post
router.post("/register", (req, res) => {

  Admin.findOne({adminId:req.body.adminId})
    .then(admin=>{
      if(admin){
        return res.status(400).json({adminId:"Already registered"});
      }else{
        const newAdmin = new Admin(req.body);

        newAdmin.save((err, doc) => {
          if (err) res.status(400).send(err);
          res.status(200).json({
            registered: true,
            msg: "Account created"
          })
        })
      }
    })
  
});

router.post("/login", (req, res) => {
  const adminId =  req.body.adminId;
  
  Admin.findOne({ adminId })
    .then(admin=>{
      if(!admin){
        return res.json({ isAuth: false, message: "admin not registered" });
      }
    // })
  // , (err, admin) => {
  //   if (!admin) return res.json({ isAuth: false, message: "admin not registered" });

    admin.comparePassword(req.body.password, (err, isMatch) => {

      if (!isMatch) return res.json({
        isAuth: false,
        msg: "wrong password"
      });
      const payload = { adminId: admin.adminId };
      jwt.sign(payload, keys.SECRET, (err, token) => {
        res.json({
          isAuth: true,
          token: "Bearer " + token
        });
      });
    });

    // admin.generateTokens((err, admin) => {
    //   if (err) return res.status(400).send(err);

    //   // res.cookie('auth', admin.token).json({
    //   //   isAuth:true,
    //   //   id:admin._id,
    //   //   adminId:admin.adminId
    //   // });
    //   res.json({
    //     success: true,
    //     token: admin.token
    //   })
    // });
  });
});

router.post("/postquestion",passport.authenticate('jwt',{session:false}),(req,res)=>{
  // const questionsToPost = {};
  // const questionSet = req.user.questionsToPost;
  const questionSet = req.body;
  res.json({questionSet});
});

//?get

router.get("/profile", passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    // res.json({success:true})
    console.log(req.user);
    Admin.findOne({adminId:req.user.adminId})
      .then(admin=>{
        if(!admin){
          errors.noprofile = "No profile found for this Id"
          return res.status(404).json(errors);
        }
        res.json(admin.questionsSet);
      })
      .catch(err=>res.status(404).json(err));
  });






module.exports = router;