const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sendGridRTransporter = require("nodemailer-sendgrid-transport");

require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport(
  sendGridRTransporter({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

app.post("/sendemail", function(req, res) {
  const { name, email, message } = req.body;

  if(!name){
    return res.status(400).json({error : "Must add all fields"});
  }

  if(!email){
    return res.status(400).json({error : "Must add all fields"});
  }
  if(!message){
    return res.status(400).json({error : "Must add all fields"});
  }
  

  transporter.sendMail({
    to: "afek.david@gmail.com",
    from: "afek.david@gmail.com",
    html: "<h5>DetailsInformation: </h5> <ul><li> <p>Name: ${name}</p> </li><li> <p> E-mail: ${email}</p> </li><li> <p>message: ${message}</p> </li> </ul> ",
  })

  res.json({ success:"success" });
});

app.listen(PORT,(req,res)=> {
    console.log("server");
});
