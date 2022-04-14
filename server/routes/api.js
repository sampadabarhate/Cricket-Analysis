const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const encrypt = require("bcrypt");
var multer = require("multer");
const User = require("../models/user");
const Details = require("../models/details").Details;
const Performance = require("../models/performance").Performance;
const db = "mongodb://localhost:27017/Cricket-Analysis";
const Bowling = require("../models/bowling").Bowling
const Stats = require("../models/stats").Stats
const Calendar = require("../models/calendar").Calendar;
const jwt = require("jsonwebtoken");
const secret = "strongsecretkey";

mongoose.connect(db, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to Mongodb........");
  }
});

//REGISTER
router.post("/register", (req, res) => {
  let userdata = req.body;
  const hashpassword = encrypt.hashSync(req.body.password, 10);
  req.body.password = hashpassword;

  let user = new User(userdata);
  console.log(user);
  User.findOne({ email: userdata.email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (!founduser) {
        user.save((error, registeredUser) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).send(registeredUser);
          }
        });
      } else {
        res.status(401).send("User Name already exist");
      }
    }
  });
});

//STATISTICS API

router.post("/stats", (req, res) => {
  let stats = req.body;
  let statsdetails = new Stats(stats);
  statsdetails.save((error, details) => {
    if (error) {
      console.log(error);
    }
    else{
      res.send(details)
    }
  });
});

router.get("/getstats", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request 1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized Request 2");
  }

  let payload = jwt.verify(token, secret);
  if (!payload) {
    return res.status(401).send("Unauthorized Request 3");
  }
  console.log(payload);
  let userid = payload.id;
  console.log(userid);
  User.findOne({ _id: userid }, (err, ifuser) => {
    if (err) {
      console.log(error);
    } else {
      console.log(ifuser);
      Stats.findOne({ Email: ifuser.email }, (err, founduser) => {
        if (err) {
          console.log(error);
        } 
      else{
            console.log(founduser);
            res.send(founduser);
          }
        
      });
    }
  });
});






//PERFORMANCE API
router.post("/performance",(req,res)=>
{
  let performancedetails = req.body;
  let performance = new Performance(performancedetails);
  performance.save((error,showPerformance)=>{
    if(error)
    {
      console.log(error)
    }
    else{
      res.send(showPerformance)
    }
  })
})

router.get("/getperformance", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request 1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized Request 2");
  }

  let payload = jwt.verify(token, secret);
  if (!payload) {
    return res.status(401).send("Unauthorized Request 3");
  }
  console.log(payload);
  let userid = payload.id;
  console.log(userid);
  User.findOne({ _id: userid }, (err, ifuser) => {
    if (err) {
      console.log(error);
    } else {
      console.log(ifuser);
      Performance.findOne({ Email: ifuser.email }, (err, founduser) => {
        if (err) {
          console.log(error);
        } 
      else{
            console.log(founduser);
            res.send(founduser);
          }
        
      });
    }
  });
});

//BOWLING DETAILS API
router.post("/bowling", (req, res) => {
  let bowling = req.body;
  let bowlingdetails = new Bowling(bowling);
  bowlingdetails.save((error, details) => {
    if (error) {
      console.log(error);
    }
    else{
      res.send(details)
    }
  });
});


router.get("/getbowling", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request 1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized Request 2");
  }

  let payload = jwt.verify(token, secret);
  if (!payload) {
    return res.status(401).send("Unauthorized Request 3");
  }
  console.log(payload);
  let userid = payload.id;
  console.log(userid);
  User.findOne({ _id: userid }, (err, ifuser) => {
    if (err) {
      console.log(error);
    } else {
      console.log(ifuser);
      Bowling.findOne({ Email: ifuser.email }, (err, founduser) => {
        if (err) {
          console.log(error);
        } 
      else{
            console.log(founduser);
            res.send(founduser);
          }
        
      });
    }
  });
});

//CALENDAR API

router.post("/calendar", (req, res) => {
  let calendar = req.body;
  let matches = new Calendar(calendar);
  matches.save((error, matchcalendar) => {
    if (error) {
      console.log(error);
    }
    else{
      res.send(matchcalendar)
    }
  });
});

router.get("/calendar", (req, res) => {
  var today = new Date();
  Calendar.find({Date:{$gt:today}}).sort('Date').limit(5)
    .exec(function (err, docs) {
      res.send(docs);
    });
});

//DETAILS API

router.post("/details", (req, res) => {
  let userdetails = req.body;
  console.log(userdetails);
  let details = new Details(userdetails);
  console.log(details);
  User.findOne({ email: userdetails.Email }, (err, founduser) => {
    if (err) {
      console.log(error);
    } else {
      if (founduser) {
        details.save((error, deatilsupdated) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).send(deatilsupdated);
          }
        });
      } else {
        res.status(401).send("Please register");
      }
    }
  });
});

router.get("/dashboard", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request 1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized Request 2");
  }
  try{
 let payload = jwt.verify(token, secret);
  if (!payload) {
    return res.status(401).send("Unauthorized Request 3");
  }
  console.log(payload);
  let userid = payload.id;

  console.log(userid);
  User.findOne({ _id: userid }, (err, ifuser) => {
    if (err) {
      console.log(error);
    } else {
      console.log(ifuser);
      Details.findOne({ Email: ifuser.email }, (err, founduser) => {
        if (err) {
          console.log(error);
        } else {
          if (founduser) {
            console.log(founduser);
            res.send(founduser);
          }
        }
      });
    }
  });}
catch(error)
{
  let data ={}
  data.error = "Token Expired"
  res.status(200).send(data)
}

});

//LOGIN API

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (!encrypt.compareSync(userData.password, user.password)) {
          res.status(401).send("Invalid Password");
        } else {
          let expiryTime = 10000
          const token = jwt.sign({ id: user.id }, secret,{
            expiresIn: '10s'
       });
          res.status(200).send({ token,expiryTime });
        }
      }
    }
  });
});

module.exports = router;
