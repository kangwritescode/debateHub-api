const HttpError = require('../models/http-error')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    console.log('hellooo');
    
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization
        if (!token) {
            throw new Error('auth failed')
        }
        
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = {userId: decodedToken.userId}
        
        next();
    }
    catch (err) {
        const error = new HttpError('Authentication failed!', 401)
        return next(error)
    }

}