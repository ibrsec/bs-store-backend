"use strict";

const validateToken = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const {User} = require('../models/userModel')
;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Unauthorized - token is missing!");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized - token is missing!");
  }

  
  jwt.verify(token, process.env.ACCESSTOKEN_SECRETKEY, (err, decoded) => {
      if (err) {
          res.status(401);
          throw new Error("Unauthorized - invalid token!");
        }

        User.findOne({_id:decoded?.user?.id,email:decoded?.user?.email})
        .then(user=> {
            if(!user){
              res.status(401);
              throw new Error("Unauthorized - User not found! -> invalid token");
          }
          
        }).catch(err=>{

              res.status(401);
              throw new Error("Unauthorized - User not found! -> invalid token");


        })



        res.userDecoded = {
        user_id: decoded?.user.id,
        user_email: decoded?.user?.email,
        accessToken: token,
        };
  });
  next();
};

module.exports = validateToken;
