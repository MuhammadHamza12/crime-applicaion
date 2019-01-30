const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');


const tokenStatusCheck = express.Router();

function checkTokenStatus(req, res) {
  res.status(201).json({
    success: true,
  });
};



module.exports = {
  checkTokenStatus,
};