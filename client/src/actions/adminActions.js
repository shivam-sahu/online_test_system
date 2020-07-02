import { DELETE_EXAM, FETCH_QUESTIONS, INSERT_QUESTION} from './types';
import axios from '../utils/axios';

export const deleteExam = (examName) =>async dispatch=>{
	const response = await axios.delete("/api/admin/deleteExam", {params:{examName}})
	.then(res=>res.data)
	.catch(err=>{throw err});
	console.log(response);
	dispatch({
		type:DELETE_EXAM,
		payload:response
	})
}

export const fetchQuestions = (examName)=>async dispatch=> {
	await axios.get("/api/admin/getExam",{params:{
		examName
	}})
	.then(res=>{
		console.log(res);
		if(res.data!== "")
		dispatch({
			type: FETCH_QUESTIONS,
			payload: res.data
		});
	})
	.catch(err=>{console.log("error")});
	// console.log(exam);
	
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