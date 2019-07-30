const resMessage = require('./response-message');
const statusCode = require('./status-code');
const util = require('./format');

const authUtil = {
    isLoggedin: async(req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.EXPRIED_TOKEN));
        }
    },
};

module.exports = authUtil;