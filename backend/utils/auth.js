const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.generateAdminToken = (userId, isAdmin) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateWardenToken = (userId, isWarden) => {
  return jwt.sign({ userId, isWarden }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateStudentToken = (userId, isStudent) => {
  return jwt.sign({ userId, isStudent }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
