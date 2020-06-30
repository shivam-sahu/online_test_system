  require('dotenv').config()

  const express = require("express");
  const mongoose = require("mongoose");
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  // const config = require("./config/config").get(process.env.NODE_ENV);
  const config = require('./config/config');
  const cors = require("cors");
  const passport =  require("passport");
  
  //? express js configurations
  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  //* mongoose configurations
  mongoose.Promise = global.Promise;
  mongoose.connect(config.DATABASE, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify:false,
    useCreateIndex:true
  })
    .then(() => console.log("connected to database..."))
    .catch(err => console.log(err));
  
//? passport js configurations
  app.use(passport.initialize());
  require('./config/passport')(passport);


  // const {Admin} = require("./models/admin");
  const {User} = require("./models/user");
  const {auth} = require("./middleware/auth");
  
  const Admin  = require("./routes/api/admin")
  app.use('/api/admin',Admin);


  //!testing purpose
  app.post("/api/demo",(req,res)=>{
    const value = req.body;
    // if(value === )
    res.send(value)
  });



  //*POST

  //?admin
  // app.post("/api/admin/register",(req,res)=>{
  //   const admin = new Admin(req.body);

  //   admin.save((err, doc)=>{
  //     if(err)  res.status(400).send(err);
  //     res.status(200).json({
  //       registered:true,
  //       msg:"Account created"
  //     })
  //   })
  // });

//   app.post("/api/admin/login",(req,res)=>{
//     Admin.findOne({ 'adminId': req.body.adminId},(err,admin)=>{
//       if(!admin) return res.json({isAuth:false, message:"admin not registered"});

//       admin.comparePassword(req.body.password,(err,isMatch)=>{
        
//         if (!isMatch) return res.json({
//           isAuth:false,
//           msg:"wrong password"
//         });
//       });

//       admin.generateTokens((err, admin)=>{
//         if(err) return res.status(400).send(err);

//         // res.cookie('auth', admin.token).json({
//         //   isAuth:true,
//         //   id:admin._id,
//         //   adminId:admin.adminId
//         // });
//         res.json({
//           success:true,
//           token:admin.token
//         })
//       });
//     });
//   });

//?user
  app.post("/api/user/register",(req, res)=>{

    const user = new User(req.body);

    user.save((err, doc)=>{
      if(err) res.status(400).send(err);

      res.status(200).json({
        registered:true,
        msg:"you have been registered for test."
      });
    });
  });

  //*Get

  //?admin

//   app.get("/api/admin/profile",passport.authenticate('jwt',{session:false}),(req,res)=>{
//     const errors = {};
//     res.json({success:true})

//     // Admin.findOne({admin:req.admin.adminId})
//     //   .then(admin=>{
//     //     if(!admin){
//     //       errors.noprofile = "No profile found for this Id"
//     //       return res.status(404).json(errors);
//     //     }
//     //     res.json({msg:"success"});
//     //   })
//     //   .catch(err=>res.status(404).json(err));
//   });

// app.get("/api/logout", auth, (req, res) => {
//   req.admin.deleteToken(req.token, (err, user) => {
//     if (err) return status(400).send(err);

//     res.sendStatus(200);

//   })
// });
  

  const port = process.env.PORT || 3001;
  app.listen(port,()=>{
    console.log("server is running!");
  });
