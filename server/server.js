  const express = require("express");
  const mongoose = require("mongoose");
  const bodyParser = require('body-parser');
  const config = require("./config/config").get(process.env.NODE_ENV);
  const cors = require("cors");

  const app = express();

  mongoose.Promise = global.Promise;
  mongoose.connect(config.DATABASE);
  app.use(bodyParser.json());
  app.use(cors());


  app.get('/api/users',(req, res)=>{
    res.send(`
    <html>
      <body>
       yo dudes!
      </body>
    </html>
    `)
  });

  const port = process.env.PORT || 3001;
  app.listen(port,()=>{
    console.log("server is running!");
  });