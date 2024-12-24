const User = require('../models/user.model');
const Role = require('../models/role.model');
const decodeToken = require('../utils/decode');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { firstname, lastname, email, countryCode, mobile, password } = req.body;
    const role = await Role.findOne({ name: 'customer' });
    try {
        // Check if the email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if the mobile number already exists
        user = await User.findOne({ mobile });
        if (user) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }

        // Create a new user instance
        user = new User({
            firstname,
            lastname,
            email,
            countryCode,
            mobile,
            password,
            role
        });

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Return success response
        res.status(201).json({ message: 'Registration successfull' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentialsa' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentialsb' });
        }

        // Create payload for access token
        const payload = {
            user: {
                id: user.id
            }
        };

        // Generate access token (valid for 1 hour)
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Generate refresh token (valid for 7 days)
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Store refresh token in an HttpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return the access token in the response body
        res.json({ accessToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is missing' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        // Create new access token
        const payload = {
            user: {
                id: decoded.user.id
            }
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return new access token
        res.json({ accessToken });
    });
};

exports.getUserInfo = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = decodeToken(token);
        const userId = decoded.user.id

        const user = await User.findById(userId).select('-password -createdAt -updatedAt').populate('role', 'name');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userObj = user.toObject();
        delete userObj.__v;
        delete userObj._id;  

        if (userObj.role) {
            userObj.role = userObj.role.name;
        }

        res.json(userObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


