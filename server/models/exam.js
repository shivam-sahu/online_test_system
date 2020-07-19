const mongoose = require("mongoose");
const examSchema  = mongoose.Schema({
		id: String,
		name:{
			type:String,
			required:true
		},
		timeLimit: Date,
		start: Date,
		end: Date,
		questionsSet: [
			{
				id: String,
				questionText: String,
				options: [{
					id: String,
					value: String
				}],
				correctAnsId: String
			}
		],
		examResponses:[{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Response"
		}],
		owner:{
					type:mongoose.Schema.Types.ObjectId,
					ref:"Admin"
		},
		ownerKey: String
	});

	const Exam = mongoose.model('Exam', examSchema);

	module.exports = {Exam};