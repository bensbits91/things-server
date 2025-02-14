// This file contains utility functions for authentication, such as token verification and password hashing.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const signToken = userId => {
   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
};

const verifyToken = async token => {
   const verify = promisify(jwt.verify);
   return await verify(token, process.env.JWT_SECRET);
};

const hashPassword = async password => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
   return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
   signToken,
   verifyToken,
   hashPassword,
   comparePassword
};
