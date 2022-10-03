const jwt = require('jsonwebtoken')
const authVerify = (req, res, next)=> {
    if(!req.headers.authorization) {
        return res.status(401).send({message: "Unauthorized User, Token Required"})
    } else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).send({message: "Access Forbidden"})
            }
            if(decoded.role === 'admin') {
                next()
            } else if (decoded.role === 'user') {
                return res.status(403).send({message: "Access Forbidden"})
            } 
        });
    }
}

module.exports = authVerify