const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    // verify token
    if (token) {   // if nothing comes, null --> falsy value
        jwt.verify(
            token,
            process.env.AUTH_SECRET,
            (error, decoded) => {
                if (error) {
                    return res.status(401).send({
                        isLoggedIn: false,
                        message: 'Failed to authenticate'
                    })
                }
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                next();
            }
        )
    } else {
        return res.status(401).send({message: 'Not logged in! Login or Signup to access this resource!'})
    }
}