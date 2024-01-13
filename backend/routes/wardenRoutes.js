const express = require('express');
const { check } = require('express-validator');
const { registerWarden, updateWarden, getWarden, getHostel, deleteWarden } = require('../controllers/wardenController');
const router = express.Router();

// @route  POST api/warden/register-warden
// @desc   Register warden
// @access Public
router.post('/register-warden', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Enter a valid contact number').isLength(11),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar_card', 'AADHAR is required').isLength(12),
    check('password', 'Password is required').isLength(8)
], registerWarden);

// @route  POST api/warden/update-warden
// @desc   Update warden
// @access Public
router.post('/update-warden', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('contact', 'Enter a valid contact number').isLength(11),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar_card', 'AADHAR is required').isLength(12),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('password', 'Password is required').isLength(8)
], updateWarden);

// @route  POST api/warden/get-warden
// @desc   Get warden by email
// @access Public
router.post('/get-warden', [
    check('isWarden', 'isWarden is required').notEmpty(),
    check('token', 'Token is required').notEmpty(),
], getWarden);

// @route  POST api/warden/get-hostel
// @desc   Get hostel by name
// @access Public
router.post('/get-hostel', [
    check('id', 'Id is required').notEmpty(),
], getHostel);

// @route  POST api/warden/delete-warden
// @desc   Delete warden
// @access Public
router.post('/delete-warden', [
    check('email', 'Please include a valid email').isEmail()
], deleteWarden);

module.exports = router;