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
// ? post Exam 
router.post("/postExam", passport.authenticate('jwt', {session:false}), (req, res)=>{
  const body  = {...req.body, owner:req.user._id,ownerKey:req.user.adminId};

  Exam.findOne({ name: body.name, owner: req.user._id})
  .then(exam=>{
    if(exam){
      return res.status(400).json({'msg':'Exam name already exists please choose a different one.'})
    }else{
      const newExam  = new Exam(body);
      newExam.save((err, doc) => {
        if (err) res.status(400).send(err);
        const examId = doc._id;
        const exams  = [...req.user.exams, examId];
        // ? update admin exams array
        Admin.findByIdAndUpdate(req.user._id, {exams:exams}, { new: true })
        .then(admin=>{
          res.status(200).json({
            msg: "Exam created"
          });
        })
        .catch(err => {throw err;});
      });
    }
  })
  .catch(err=>{throw err});
});

//* get
//? getExam 
router.get("/getExam", passport.authenticate('jwt', {session:false}), (req, res)=>{
  Exam.findOne({name:req.query.examName, owner:req.user._id})
  .then(exam=>{
    res.send(exam);
  })
  .catch(err=>{throw err;});
});


// * delete 

//? delete Exam
router.delete("/deleteExam", passport.authenticate('jwt', { session: false }),async (req, res)=>{
  
  const examId =await Exam.findOne({ name: req.query.examName, owner: req.user._id})
  .then(exam=> exam._id)
  .catch(err=>{throw err});
  if(examId){
    await Exam.findByIdAndDelete(  examId , (err, docs) => {
      if(err){
        console.log(err);
      }
    });
    const exams = req.user.exams;
    const index = exams.indexOf(examId);
    if (index > -1) {
      exams.splice(index, 1);
    }
    await Admin.findByIdAndUpdate(req.user._id, { exams: exams }, { new: true })
      .then(admin => { res.status(200).json({ "msg": "deleted exam"});})
      .catch(err => { throw err });
  } else {
    res.json({ "msg": "exam not found" });
  }
});

// ? update

router.put("/updateExam", passport.authenticate('jwt', { session: false }), async (req, res)=>{
  const {body:exam} = req;
  // console.log(req.body);
  Exam.findByIdAndUpdate(exam._id, exam, {new:true})
  .then(exam=>{
    if(exam) res.status(200).send(exam);
    else res.status(400).json({"msg":"update failed"})
  })
  .catch(err=>{throw err});
});

module.exports = router;