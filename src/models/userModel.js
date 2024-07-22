"use strict";

const mongoose = require("mongoose");
const passwordEncrypter = require("../helpers/passwordEncrypter");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      requried: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type:String,
        trim:true,
        required:true,
        set: (password)=> {
            if(validatePassword(password)){
                return passwordEncrypter(password);
            }else{
                throw new Error('Password must be between 8 and 16 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character - [.?!@#$%&*]')
            }
        }

    },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.?!@#$%&*])[A-Za-z\d.?!@#$%&*]{8,16}$/;
    return regex.test(password);
}