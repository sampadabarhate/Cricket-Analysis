const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const encrypt = require("bcrypt")
const User = require("../models/user");
const Details = require("../models/details").Details
const db = "mongodb://localhost:27017/Cricket-Analysis";
const Calendar = require("../models/calendar").Calendar
const jwt = require('jsonwebtoken')
const secret = "strongsecretkey"

mongoose.connect(db, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to Mongodb........");
  }
});

// function verifyToken(req,res,next){
//   
//   next()


// }

router.post("/register", (req, res) => {
  let userdata = req.body;
  const hashpassword = encrypt.hashSync(req.body.password,10)  
  req.body.password =hashpassword
  
  let user = new User(userdata);
  console.log(user)
  User.findOne({ name: userdata.name }, (err, founduser) => {
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



router.post("/calendar", (req, res) => {
  let calendar = req.body;
  
  let matches = new Calendar(calendar);
  console.log(matches)
 
        matches.save((error, matchcalendar) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).send(matchcalendar);
          }
        });
      
    });
  



router.post("/details", (req, res) => {
  let userdetails = req.body;
  console.log(userdetails)
  let details = new Details(userdetails);
  console.log(details)
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


router.get("/dashboard",(req,res)=>
{
if(!req.headers.authorization) {
  return res.status(401).send("Unauthorized Request 1")
}
let token = req.headers.authorization.split(' ')[1]
if(token == 'null')
{
  return res.status(401).send('Unauthorized Request 2')
}
let payload =jwt.verify(token,secret)
if(!payload)
{
  return res.status(401).send('Unauthorized Request 3')
}
console.log(payload)
let userid = payload.id;
console.log(userid)
  User.findOne({_id: userid }, (err, ifuser) => {
    if (err) {
      console.log(error);
    }
    else{
     console.log(ifuser)
      Details.findOne({ Email:ifuser.email }, (err, founduser) => {
        if (err) {
          console.log(error);
        } else {
          if (founduser) {
            console.log(founduser)
            res.send(founduser)
              }
         }
       })
      }
    })
  })

        


router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (!encrypt.compareSync(userData.password,user.password )) {
          res.status(401).send("Invalid Password");
        } else {
          const token = jwt.sign({'id':user.id},secret);
          res.status(200).send({token})
        }
      }
    }
  });
});




module.exports = router;
