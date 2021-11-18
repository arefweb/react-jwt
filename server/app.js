const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secret = require("./config");
const cors = require("cors");
const auth = require("./auth");

app.use(cors());
app.options("*", cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res)=>{
  let options = {
    root: path.join(__dirname),
  }
  return res.sendFile("home.html", options);
})

app.get("/auth", auth, (req, res) => {
  
  return res.status(200).json({message: "success", isAuth: true})
});

app.get("/welcome", auth, (req, res) => {
  let options = {
    root: path.join(__dirname),
  };
  return res.sendFile("welcome.html", options);
});

app.post("/login", (req, res)=>{
  
  const { email, pass } = req.body;
  
  const content = fs.readFileSync("./users.json");
  let users = JSON.parse(content);
  let candid = users.users.find((item, i) => {
    return item.email == email;
  });

  if(candid && candid.password == pass){
    // creating JWT
    const token = jwt.sign(
      { user_id: candid.id, email: candid.email, name: candid.name, role: candid.role },
      secret,
      {
        expiresIn: "50m",
      }
    );

    // save candid token
    candid.token = token;

    return res.status(200).json(candid);
  } else {
    return res.status(401).json({message: "Wrong information!"});
  }

});


module.exports = app;
