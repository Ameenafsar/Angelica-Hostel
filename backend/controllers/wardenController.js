const {generateWardenToken, verifyToken} = require('../utils/auth');
const {validationResult} = require('express-validator');
const {Warden, User, Hostel} = require('../models');
const bcrypt = require('bcryptjs');

const registerWarden = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {name, email, father_name, contact, address, dob, aadhar_card, hostel, password} = req.body;

        try {
            let warden = await Warden.findOne({email});

            if (warden) {
                return res.status(400).json({success, errors: [{msg: 'Warden already exists'}]});
            }

            let shostel = await Hostel.findOne({name: hostel});

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let user = new User({
                email,
                password: hashedPassword,
                isWarden: true
            });

            await user.save();

            warden = new Warden({
                name,
                email,
                father_name,
                contact,
                address,
                dob,
                aadhar_card,
                user: user.id,
                hostel: shostel.id
            });

            await warden.save();

            const token = generateWardenToken(user.id, user.isWarden);

            success = true;
            res.json({success, token, warden});

        } catch (error) {
            res.status(500).send('Server error');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const updateWarden = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {name, email, father_name, contact, address, dob, aadhar_card} = req.body;

        try {
            let warden = await Warden.findOne({email});

            if (!warden) {
                return res.status(400).json({success, errors: [{msg: 'Warden does not exists'}]});
            }

            warden.name = name;
            warden.email = email;
            warden.father_name = father_name;
            warden.contact = contact;
            warden.address = address;
            warden.dob = dob;
            warden.aadhar_card = aadhar_card;

            await warden.save();

            success = true;
            res.json({success, warden});

        } catch (error) {
            res.status(500).send('Server error');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const getHostel = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {id} = req.body

        let warden = await Warden.findById(id);
        
        if (!warden) {
            return res.status(400).json({success, errors: [{msg: 'Warden does not exists'}]});
        }

        let hostel = await Hostel.findById(warden.hostel);
        success = true;
        res.json({success, hostel});
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const getWarden = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    try {
        const {isWarden} = req.body;
        if (!isWarden) {
            return res.status(401).json({success, errors: [{msg: 'Not an Warden, authorization denied'}]});
        }
        const {token} = req.body;
        if (!token) {
            return res.status(401).json({success, errors: [{msg: 'No token, authorization denied'}]});
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
        }

        let warden = await Warden.findOne({user:decoded.userId}).select('-password');

        if (!warden) {
            return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
        }

        success = true;
        res.json({success, warden});
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const deleteWarden = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {email} = req.body

        let warden = await Warden.findOne({email});

        if (!warden) {
            return res.status(400).json({success, errors: [{msg: 'Warden does not exists'}]});
        }

        const user = await User.findById(warden.user);

        await User.deleteOne(user);

        await Warden.deleteOne(warden);

        success = true;
        res.json({success, msg: 'Warden deleted'});
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerWarden,
    updateWarden,
    getWarden,
    getHostel,
    deleteWarden
}
