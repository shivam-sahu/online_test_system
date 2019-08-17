  const express = require("express");
  const mongoose = require("mongoose");
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const config = require("./config/config").get(process.env.NODE_ENV);
  const cors = require("cors");
  

  const app = express();

  mongoose.Promise = global.Promise;
  mongoose.connect(config.DATABASE, { useNewUrlParser: true});
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({extended:false}));
  app.use(cors());

  const {Admin} = require("./models/admin");
  const {User} = require("./models/user");
  const {auth} = require("./middleware/auth");


  //*POST

  //admin
  app.post("/api/admin/register",(req,res)=>{
    const admin = new Admin(req.body);

    admin.save((err, doc)=>{
      if(err)  res.status(400).send(err);
      res.status(200).json({
        posted:true,
        msg:"questions posted!"
      })
    })
  });

  app.post("/api/admin/login",(req,res)=>{
    Admin.findOne({ 'adminId': req.body.adminId},(err,admin)=>{
      if(!admin) return res.json({isAuth:false, message:"admin not registered"});

      admin.comparePassword(req.body.password,(err,isMatch)=>{
        
        if (!isMatch) return res.json({
          isAuth:false,
          msg:"wrong password"
        });
      });

      admin.generateTokens((err, admin)=>{
        if(err) return res.status(400).send(err);

        res.cookie('auth', admin.token).json({
          isAuth:true,
          id:admin._id,
          adminId:admin.adminId
        });
      });
    });
  });

  app.get("/api/logout",auth, (req,res)=>{
    req.admin.deleteToken(req.token,(err, user)=>{
        if(err) return status(400).send(err);

        res.sendStatus(200);

    })
  });


//user
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

  

  const port = process.env.PORT || 3001;
  app.listen(port,()=>{
    console.log("server is running!");
  });