const jwt = require('jsonwebtoken');
const commonMessages = require("../constants/commonMessages.js");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        
        next();
    } catch (error) {
        res.status(401).json({ message: commonMessages.notAuthenticated })
    }
}

module.exports = auth;