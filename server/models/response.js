const mongoose = require("mongoose");
const responseSchema = mongoose.Schema({
	userGivenExam:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	examGiven: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Exam"
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Admin",
	},
	ownerKey:String,
	examKey:String,
	userId:String,
	startTime:{
		type:Date
	},
	finishTime:{
		type:Date
	},
	response:[{
		index:String,
		givenAns:String
	}],
	score:Number
});

const Response = mongoose.model('Response', responseSchema);

module.exports = { Response };