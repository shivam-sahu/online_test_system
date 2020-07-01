import {FETCH_QUESTIONS, INSERT_QUESTION} from './types';
import axios from 'axios';

export const fetchQuestions =()=>async dispatch=> {
	const {exams:[exam]} = await axios.get("http://localhost:4000/admin")
	.then(res=>res.data);
	console.log(exam);
	dispatch({
		type:FETCH_QUESTIONS,
		payload:exam
	});
};

export const insertQuestion = (object)=>async dispatch=>{
	// const exams = [object];
	const admin ={
		"exams":[object]
	}
	const response = await axios.put("http://localhost:4000/admin", admin)
	.then(res=>res.data)
	// console.log(response);
	const {exams:[exam]} = response;
	dispatch({
    type: FETCH_QUESTIONS,
    payload: exam,
  });
}