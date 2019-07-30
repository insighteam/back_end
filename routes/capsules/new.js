var express = require('express');
var router = express.Router();
const util = require('../../utils/format');
const statusCode = require('../../utils/status-code');
const resMessage = require('../../utils/response-message');
const authUtil = require("../../utils/auth-util");

function validateForm(form) {
    if(!form.text && !form.image) {
        return '내용이 존재하지 않습니다.';
    } 

    return null;
}

router.post('/', authUtil.isLoggedin, async(req, res) => {
    var err = validateForm(req.body);
    if(err) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, err));
    }
});


module.exports = router;