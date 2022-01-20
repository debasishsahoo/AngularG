const UserModel = require("../models/userModel");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Encode_Key = `${process.env.SECRET_KEY}`;
dotenv.config();

const UserCTRL = {
  signup: async (req, res, next) => {
    const { name, email, password, mobile } = req.body;
    try {
      const oldUser = await UserModel.findOne({ email });
      if (oldUser) {
        return res.status(400).json({ message: "Email already in Exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log(hashedPassword);
      const result = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        mobile,
      });
      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
        },
        Encode_Key,
        { expiresIn: "1h" }
      );
      res.status(201).json({
        message: "Sucessfully Register",
        result: result,
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const oldUser = await UserModel.findOne({ email });
      if (!oldUser) {
        return res.status(400).json({ message: "User dose not Exist" });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid Password" });
      }
      const token = jwt.sign(
        {
          email: oldUser.email,
          id: oldUser._id,
        },
        Encode_Key,
        { expiresIn: 3600 }
      );
      res.status(201).json({
        message: "Sucessfully login",
        userdata: oldUser,
        token: token,
        expiresIn: 3600,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  },
  userDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const SingleUser = await UserModel.findById(id);
      res.status(200).json({
        message: `User of this ${id} found`,
        User: SingleUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
};

module.exports = UserCTRL;
