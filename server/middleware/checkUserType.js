const passport = require('passport');

const checkUserType = (req, res, next) => {
	const userType = req.originalUrl.split('/')[2];
	require('../config/passport')(userType, passport);
	next();
}

module.exports = {checkUserType};