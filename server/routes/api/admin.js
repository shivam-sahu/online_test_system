const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt  = require("jsonwebtoken");
const config  = require("../../config/config")

const {Admin} = require('../../models/admin');
const {Exam} = require('../../models/exam');
// * api -> /api/admin/
//!test
router.get('/test',(req,res)=>{
  res.json({
    msg:"wo this works."
  });
});

//*post
//? @register
router.post("/register", (req, res) => {
  // console.log(req.body.email);
  Admin.findOne({ email: req.body.email, adminId: req.body.adminId})
    .then(admin=>{
      if(admin){
        return res.status(400).json({ email:"Already registered"});
      }else{
        const newAdmin = new Admin(req.body);
        newAdmin.save((err, doc) => {
          if (err) res.status(400).send(err);
          res.status(200).json({
            registered: true,
            msg: "Account created"
          });
        });
      }
    })
    .catch(err=>{throw err;});
  
});

// ? @login
router.post("/login", (req, res) => {
  const adminId =  req.body.adminId;
  
  Admin.findOne({ adminId })
    .then(admin=>{
      if(!admin){
        return res.json({ isAuth: false, message: "admin not registered" });
      }

    admin.comparePassword(req.body.password, (err, isMatch) => {

      if (!isMatch) return res.json({
        isAuth: false,
        msg: "wrong password"
      });
      const payload = { adminId: admin.adminId };
      jwt.sign(payload, config.SECRET, (err, token) => {
        res.json({
          isAuth: true,
          token: "Bearer " + token
        });
      });
    });
  });
});

// router.post("/postQuestion",passport.authenticate('jwt',{session:false}),(req,res)=>{
//   // const questionsToPost = {};
//   // const questionSet = req.user.questionsToPost;
//   const questionSet = req.body;
//   res.json({questionSet});
// });

router.post("/postExam", passport.authenticate('jwt', {session:false}), (req, res)=>{
  const body  = {...req.body, owner:req.user._id};

  Exam.findOne({name:body.name, owner:req.user._id})
  .then(exam=>{
    if(exam){
      return res.status(400).json({'msg':'Exam name already exists please choose a different one.'})
    }else{
      const newExam  = new Exam(body);
      newExam.save((err, doc) => {
        if (err) res.status(400).send(err);
        res.status(200).json({
          msg: "Exam created"
        });
      });
    }
  })
  .catch(err=>{throw err});
});

//* get

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