const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require("../../config/config")

const { User } = require('../../models/user');

// * api -> /api/user/
//!test
router.get('/test', (req, res) => {
	res.json({
		msg: "wo this works."
	});
});
router.get('/auth', passport.authenticate('jwt', { session: false }), (req, res)=>{
	// console.log()
	res.json({
		msg:"auth route this works!"
	})
});

//*post
// ? register user
router.post("/register", (req, res) => {
	User.findOne({ email: req.body.email, userId: req.body.userId })
		.then(user => {
			if (user) {
				return res.status(400).json({ email: "Already registered" });
			} else {
				const newUser = new User(req.body);
				newUser.save((err, doc) => {
					if (err) res.status(400).send(err);
					else{
						res.status(200).json({
							registered: true,
							msg: "Account created"
						});	
					}
				});
			}
		})
		.catch(err => { throw err; });

});

//? login user
router.post("/login", (req, res) => {
	const userId = req.body.userId;

	User.findOne({ userId })
		.then(user => {
			if (!user) {
				return res.json({ isAuth: false, message: "user not registered" });
			}

			user.comparePassword(req.body.password, (err, isMatch) => {

				if (!isMatch) return res.json({
					isAuth: false,
					msg: "wrong password"
				});
				const payload = { userId: user.userId };
				jwt.sign(payload, config.SECRET, (err, token) => {
					res.json({
						isAuth: true,
						token: "Bearer " + token
					});
				});
			});
		});
});

module.exports = router;