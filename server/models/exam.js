const mongoose = require("mongoose");
const examSchema  = mongoose.Schema({
		id: String,
		timeLimit: Date,
		start: Date,
		end: Date,
		questionsSet: [
			{
				id: String,
				question: String,
				options: [{
					id: String,
					val: String
				}],
				correctAnsId: String
			}
		],
		userGivenExam:[{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		}],
		owner:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Admin"
		}
	});

	const Exam = mongoose.model('Exam', examSchema);

	module.exports = {Exam};