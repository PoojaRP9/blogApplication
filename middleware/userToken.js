const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies['token'];

        console.log("token generate")
        if (token) {
            // If token is missing, redirect to login page
            const tokenVerify = jwt.verify(token, "Nodejs_secret_key");
            req.user = await User.findById(tokenVerify._id);
            // return res.redirect('/');
        }

        next();
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}

module.exports = verifyToken;